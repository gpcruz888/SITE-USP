import { randomUUID } from 'node:crypto'
import { getDatabase } from './database.mjs'
import { hash, token, passwordHash, verifyPassword, equal, securityHeaders } from './security.mjs'
import { HttpError, requireValue, text, email, person, processValues, statuses, choice, date, password, loginPassword, pagination } from './validation.mjs'
import { crmPayload, submitCrm } from './crm.mjs'

const CONSENT='Li e estou ciente da Política de Privacidade do Gestcorp ECA-USP.'
function consentRecord(body) {
  const parts=[CONSENT]
  if(body.comunicacoes===true) parts.push('Aceito receber do Gestcorp ECA-USP informações sobre turmas, eventos e Masterclasses por e-mail e WhatsApp.')
  if(body.imagem===true) parts.push('Autorizo o uso da minha imagem em fotos e vídeos do evento, para divulgação institucional do Gestcorp ECA-USP.')
  return parts.join(' ')
}
const now = () => new Date().toISOString()
const history = (type,id,action,actor='Formulário público') => ['INSERT INTO history(id,entity_type,entity_id,action,actor,created_at) VALUES($1,$2,$3,$4,$5,$6)',[randomUUID(),type,id,action,actor,now()]]
const json = (res,status,value) => { res.statusCode=status; res.setHeader('Content-Type','application/json; charset=utf-8'); res.end(JSON.stringify(value)) }
const one = async(db,sql,args=[]) => (await db.query(sql,args)).rows[0]
const publicDate = () => new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())

async function body(req) {
  requireValue((req.headers['content-type'] || '').split(';')[0]==='application/json','Envie os dados em JSON.',415)
  requireValue(Number(req.headers['content-length']||0)<=32768,'Requisição muito grande.',413)
  let data=req.body
  if(data===undefined) {
    const chunks=[]; let length=0
    for await (const chunk of req) { length+=chunk.length; requireValue(length<=32768,'Requisição muito grande.',413); chunks.push(chunk) }
    try { data=JSON.parse(Buffer.concat(chunks).toString()) } catch { throw new HttpError(400,'JSON inválido.') }
  } else if(typeof data==='string') { try { data=JSON.parse(data) } catch { throw new HttpError(400,'JSON inválido.') } }
  requireValue(data && !Array.isArray(data) && typeof data==='object' && Buffer.byteLength(JSON.stringify(data))<=32768,'Dados inválidos.')
  return data
}
async function limit(db,key,max,ms) {
  const timestamp=Date.now()
  const row=await one(db,`INSERT INTO rate_limits(key,count,resets_at) VALUES($1,1,$2) ON CONFLICT(key) DO UPDATE SET count=CASE WHEN rate_limits.resets_at<$3 THEN 1 ELSE rate_limits.count+1 END,resets_at=CASE WHEN rate_limits.resets_at<$3 THEN $2 ELSE rate_limits.resets_at END RETURNING count`,[key,timestamp+ms,timestamp])
  requireValue(row.count<=max,'Muitas tentativas. Aguarde alguns minutos e tente novamente.',429)
}
function filters(kind,params) {
  const clauses=[],args=[]
  const add=(sql,value)=> { args.push(value); clauses.push(sql.replace('?',`$${args.length}`)) }
  const prefix=kind==='applications'?'a':'i'
  if(params.get('q')) add(`POSITION(? IN lower(concat_ws(' ',i.name,i.email,i.phone,i.cohort))) > 0`,text(params.get('q'),'Busca',0,150).toLowerCase())
  if(params.get('status')) add(`${prefix}.status=?`,choice(params.get('status'),statuses[kind]))
  if(params.get('process')) {
    if(kind==='applications') add('a.process_id=?',text(params.get('process'),'Processo',1,100))
    else add('EXISTS(SELECT 1 FROM applications ap WHERE ap.interest_id=i.id AND ap.process_id=?)',text(params.get('process'),'Processo',1,100))
  }
  if(params.get('from')) add(`${prefix}.created_at>=?`,date(params.get('from'))+'T00:00:00.000Z')
  if(params.get('to')) add(`${prefix}.created_at<=?`,date(params.get('to'))+'T23:59:59.999Z')
  return {where:clauses.length?' WHERE '+clauses.join(' AND '):'',args}
}
const leadSelect='SELECT i.* FROM interests i'
const appFrom=' FROM applications a JOIN interests i ON i.id=a.interest_id JOIN processes p ON p.id=a.process_id'
const appSelect='SELECT a.*,i.name,i.email,i.phone,i.cohort,p.name AS process_name'+appFrom
function csv(rows,kind) {
  const columns=kind==='interests'?['name','email','phone','cohort','status','created_at']:['name','email','phone','process_name','status','created_at']
  const labels=kind==='interests'?['Nome','E-mail','WhatsApp','Turma','Status','Data de cadastro']:['Nome','E-mail','WhatsApp','Processo seletivo','Status','Data de inscrição']
  const escape=v=>'"'+String(v??'').replace(/^[\s]*[=+\-@\t\r]/,"'$&").replaceAll('"','""')+'"'
  return '\uFEFF'+[labels,...rows.map(row=>columns.map(k=>row[k]))].map(row=>row.map(escape).join(';')).join('\r\n')
}

export function createHandler({ database, appUrl=process.env.APP_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://127.0.0.1:5199'), production=process.env.NODE_ENV==='production' || !!process.env.VERCEL, crm=submitCrm }={}) {
  const cookieName=production?'__Host-gestcorp_session':'gestcorp_session'
  const cookie=(value,max=28800)=>`${cookieName}=${value}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${max}${production?'; Secure':''}`
  return async function handler(req,res) {
    securityHeaders(res,production)
    try {
      const url=new URL(req.url,'http://internal'), path=url.searchParams.has('route')?'/api/'+url.searchParams.get('route'):url.pathname
      const method=req.method
      if(path==='/api/health') return json(res,200,{ok:true})
      const db=database || await getDatabase()
      if(!['GET','HEAD'].includes(method)) {
        const origin=req.headers.origin
        requireValue(origin===new URL(appUrl).origin,'Origem da requisição não autorizada.',403)
      }
      const ip=process.env.VERCEL ? String(req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown') : String(req.socket?.remoteAddress || 'unknown')
      if(path.startsWith('/api/public/')) {
        if(method==='GET' && path==='/api/public/processes') {
          const rows=(await db.query(`SELECT id,name,description,starts_at,ends_at FROM processes WHERE status='ativo' AND starts_at<=$1 AND ends_at>=$1 ORDER BY starts_at`,[publicDate()])).rows
          return json(res,200,{items:rows})
        }
        if(method==='POST' && ['/api/public/interests','/api/public/applications'].includes(path)) {
          await limit(db,'public:'+hash(ip),20,60*60*1000)
          const input=await body(req), values=person(input,true)
          requireValue(!input.website,'Dados inválidos.')
          const isApplication=path.endsWith('/applications')
          let process
          if(isApplication) {
            process=await one(db,"SELECT * FROM processes WHERE id=$1 AND status='ativo' AND starts_at<=$2 AND ends_at>=$2",[text(input.process_id,'Processo',1,100),publicDate()])
            requireValue(process,'Este processo não está recebendo inscrições.',409)
          }
          const existing=await one(db,'SELECT id FROM interests WHERE email=$1',[values.email])
          const id=existing?.id || randomUUID(), timestamp=now(), commands=[]
          if(!existing) {
            commands.push(['INSERT INTO interests(id,name,email,phone,cohort,consent_at,consent_text,source,created_at,updated_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$6,$6) ON CONFLICT(email) DO NOTHING',[id,values.name,values.email,values.phone,values.cohort,timestamp,consentRecord(input),isApplication?'inscricao':'home']])
            commands.push(['INSERT INTO history(id,entity_type,entity_id,action,actor,created_at) SELECT $1,\'interests\',id,\'Interesse cadastrado; consentimento registrado.\',\'Formulário público\',$2 FROM interests WHERE id=$3',[randomUUID(),timestamp,id]])
          }
          if(process) {
            const appId=randomUUID()
            commands.push([`INSERT INTO applications(id,interest_id,process_id,created_at,updated_at) SELECT $1,id,$2,$3,$3 FROM interests WHERE email=$4 ON CONFLICT(interest_id,process_id) DO NOTHING`,[appId,process.id,timestamp,values.email]])
            commands.push(['INSERT INTO history(id,entity_type,entity_id,action,actor,created_at) SELECT $1,\'applications\',id,\'Inscrição recebida pelo site.\',\'Formulário público\',$2 FROM applications WHERE id=$3',[randomUUID(),timestamp,appId]])
          }
          if(commands.length) await db.batch(commands)
          const source=isApplication?'inscricao':'home'
          const forwarded=await crm(crmPayload(input,values,source))
          if(!forwarded.skipped) {
            const [sql,args]=history('interests',id,forwarded.ok?'Lead enviado ao CRM Mais Alunos.':'Falha ao enviar o lead ao CRM Mais Alunos.')
            await db.query(sql,args)
          }
          return json(res,201,{message:isApplication?'Solicitação recebida. A equipe acompanhará sua inscrição.':'Interesse recebido. A equipe entrará em contato.'})
        }
        throw new HttpError(404,'Recurso não encontrado.')
      }
      if(path==='/api/auth/login' && method==='POST') {
        const input=await body(req), mail=email(input.email), pass=loginPassword(input.password)
        await limit(db,'login-ip:'+hash(ip),25,15*60*1000)
        await limit(db,'login-account:'+hash(mail),8,15*60*1000)
        const admin=await one(db,'SELECT * FROM admins WHERE email=$1',[mail])
        requireValue(await verifyPassword(pass,admin?.password_hash),'E-mail ou senha incorretos.',401)
        await db.query('DELETE FROM rate_limits WHERE key=$1',['login-account:'+hash(mail)])
        const sessionToken=token(),csrf=token(),timestamp=Date.now()
        await db.batch([
          ['DELETE FROM sessions WHERE expires_at<$1 OR absolute_expiry<$1',[timestamp]],
          ['DELETE FROM rate_limits WHERE resets_at<$1',[timestamp]],
          ['INSERT INTO sessions(token_hash,admin_id,csrf,expires_at,absolute_expiry) VALUES($1,$2,$3,$4,$5)',[hash(sessionToken),admin.id,csrf,timestamp+8*3600000,timestamp+24*3600000]],
        ])
        res.setHeader('Set-Cookie',cookie(sessionToken))
        return json(res,200,{user:{id:admin.id,name:admin.name,email:admin.email},csrf})
      }
      if(path==='/api/auth/activate' && method==='POST') {
        await limit(db,'activate:'+hash(ip),10,15*60000)
        const input=await body(req),key=hash(text(input.token,'Convite',20,100)),pass=password(input.password)
        const invitation=await one(db,'SELECT * FROM activation_tokens WHERE token_hash=$1 AND expires_at>$2',[key,Date.now()])
        requireValue(invitation,'O link expirou ou já foi utilizado. Solicite um novo convite.',400)
        const stored=await passwordHash(pass)
        const result=await db.batch([
          ['DELETE FROM activation_tokens WHERE token_hash=$1 AND expires_at>$2 RETURNING admin_id',[key,Date.now()]],
          // Lock and consume in one transaction. Concurrent requests can never replace an activated password.
          ['UPDATE admins SET password_hash=$1 WHERE id=$2 AND password_hash IS NULL AND NOT EXISTS(SELECT 1 FROM activation_tokens WHERE token_hash=$3) RETURNING id',[stored,invitation.admin_id,key]],
        ])
        requireValue(result[0].rows.length===1 && result[1].rows.length===1,'Link já utilizado.',400)
        return json(res,200,{message:'Acesso ativado. Entre com seu e-mail e sua senha.'})
      }
      const rawCookie=String(req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith(cookieName+'='))?.slice(cookieName.length+1)
      const session=rawCookie ? await one(db,`SELECT s.*,a.email,a.name FROM sessions s JOIN admins a ON a.id=s.admin_id WHERE s.token_hash=$1 AND s.expires_at>$2 AND s.absolute_expiry>$2`,[hash(rawCookie),Date.now()]) : null
      requireValue(session,'Sua sessão expirou. Entre novamente.',401)
      if(!['GET','HEAD'].includes(method)) requireValue(equal(req.headers['x-csrf-token'],session.csrf),'Atualize a página antes de continuar.',403)
      if(path==='/api/auth/session' && method==='GET') {
        const expiry=Math.min(Date.now()+8*3600000,Number(session.absolute_expiry))
        await db.query('UPDATE sessions SET expires_at=$1 WHERE token_hash=$2',[expiry,session.token_hash])
        res.setHeader('Set-Cookie',cookie(rawCookie,Math.max(0,Math.floor((expiry-Date.now())/1000))))
        return json(res,200,{user:{id:session.admin_id,name:session.name,email:session.email},csrf:session.csrf})
      }
      if(path==='/api/auth/logout' && method==='POST') {
        await db.query('DELETE FROM sessions WHERE token_hash=$1',[session.token_hash]); res.setHeader('Set-Cookie',cookie('',0)); return json(res,200,{ok:true})
      }
      if(path==='/api/auth/password' && method==='POST') {
        const input=await body(req)
        await limit(db,'password:'+session.admin_id,8,15*60000)
        const admin=await one(db,'SELECT password_hash FROM admins WHERE id=$1',[session.admin_id])
        requireValue(await verifyPassword(loginPassword(input.current),admin.password_hash),'Senha atual incorreta.',400)
        await db.batch([['UPDATE admins SET password_hash=$1 WHERE id=$2',[await passwordHash(password(input.password)),session.admin_id]],['DELETE FROM sessions WHERE admin_id=$1',[session.admin_id]]])
        res.setHeader('Set-Cookie',cookie('',0)); return json(res,200,{ok:true})
      }
      requireValue(path.startsWith('/api/admin/'),'Recurso não encontrado.',404)
      if(path==='/api/admin/dashboard' && method==='GET') {
        const counts=await one(db,`SELECT (SELECT COUNT(*)::int FROM interests) AS total,(SELECT COUNT(*)::int FROM interests WHERE status='novo') AS new_interests,(SELECT COUNT(*)::int FROM applications WHERE status IN ('recebida','em_analise','lista_espera')) AS in_progress,(SELECT COUNT(*)::int FROM processes WHERE status='ativo') AS active_processes`)
        const evolution=(await db.query('SELECT substr(created_at,1,10) AS day,COUNT(*)::int AS total FROM interests WHERE created_at>=$1 GROUP BY substr(created_at,1,10) ORDER BY day',[new Date(Date.now()-29*86400000).toISOString().slice(0,10)])).rows
        const recent=(await db.query('SELECT * FROM interests ORDER BY created_at DESC,id LIMIT 5')).rows
        const distribution=(await db.query('SELECT status,COUNT(*)::int AS total FROM applications GROUP BY status')).rows
        return json(res,200,{counts,evolution,recent,distribution})
      }
      const collection=path.match(/^\/api\/admin\/(interests|applications)(\/export)?$/)
      if(collection && method==='GET') {
        const kind=collection[1],{where,args}=filters(kind,url.searchParams),select=kind==='interests'?leadSelect:appSelect,from=kind==='interests'?' FROM interests i':appFrom,prefix=kind==='interests'?'i':'a'
        if(collection[2]) {
          await limit(db,'export:'+session.admin_id,20,60*60000)
          const total=await one(db,'SELECT COUNT(*)::int AS total'+from+where,args)
          requireValue(total.total<=10000,'Refine os filtros para exportar até 10.000 registros.',422)
          const rows=(await db.query(select+where+` ORDER BY ${prefix}.created_at DESC,${prefix}.id`,args)).rows
          res.statusCode=200;res.setHeader('Content-Type','text/csv; charset=utf-8');res.setHeader('Content-Disposition',`attachment; filename="gestcorp-${kind}.csv"`);res.end(csv(rows,kind));return
        }
        const {page,size}=pagination(url.searchParams)
        const total=await one(db,'SELECT COUNT(*)::int AS total'+from+where,args)
        const items=(await db.query(select+where+` ORDER BY ${prefix}.created_at DESC,${prefix}.id LIMIT $${args.length+1} OFFSET $${args.length+2}`,[...args,size,(page-1)*size])).rows
        return json(res,200,{items,total:total.total,page,size})
      }
      if(path==='/api/admin/processes' && method==='GET') {
        const items=(await db.query(`SELECT p.*,COUNT(a.id)::int AS application_count FROM processes p LEFT JOIN applications a ON a.process_id=p.id GROUP BY p.id ORDER BY p.created_at DESC,p.id`)).rows
        return json(res,200,{items})
      }
      if(path==='/api/admin/processes' && method==='POST') {
        const v=processValues(await body(req)),id=randomUUID(),timestamp=now()
        await db.batch([['INSERT INTO processes(id,name,description,starts_at,ends_at,status,created_at,updated_at) VALUES($1,$2,$3,$4,$5,$6,$7,$7)',[id,v.name,v.description,v.starts_at,v.ends_at,v.status,timestamp]],history('processes',id,'Processo criado.',session.email)])
        return json(res,201,{id})
      }
      if(path==='/api/admin/interests' && method==='POST') {
        const input=await body(req),v=person(input)
        requireValue(input.consentimento===true,'Confirme que possui autorização da pessoa para o cadastro.')
        const id=randomUUID(),timestamp=now()
        await db.batch([['INSERT INTO interests(id,name,email,phone,cohort,consent_at,consent_text,source,created_at,updated_at) VALUES($1,$2,$3,$4,$5,$6,$7,\'admin\',$6,$6)',[id,v.name,v.email,v.phone,v.cohort,timestamp,'Autorização confirmada pelo administrador.']],history('interests',id,'Cadastro manual com autorização confirmada.',session.email)])
        return json(res,201,{id})
      }
      if(path==='/api/admin/applications' && method==='POST') {
        const input=await body(req),interestId=text(input.interest_id,'Interessado',1,100),processId=text(input.process_id,'Processo',1,100)
        requireValue(await one(db,'SELECT id FROM interests WHERE id=$1',[interestId]),'Interessado não encontrado.',404)
        const process=await one(db,'SELECT * FROM processes WHERE id=$1',[processId])
        requireValue(process && process.status!=='encerrado','Selecione um processo em preparação ou ativo.',409)
        const id=randomUUID(),timestamp=now()
        await db.batch([['INSERT INTO applications(id,interest_id,process_id,created_at,updated_at) VALUES($1,$2,$3,$4,$4)',[id,interestId,processId,timestamp]],history('applications',id,'Inscrição registrada pela equipe.',session.email),history('interests',interestId,'Associado ao processo '+process.name+'.',session.email)])
        return json(res,201,{id})
      }
      const detail=path.match(/^\/api\/admin\/(interests|applications|processes)\/([a-zA-Z0-9-]+)$/)
      if(detail) {
        const [,kind,id]=detail
        const item=await one(db,`SELECT * FROM ${kind} WHERE id=$1`,[id])
        requireValue(item,'Registro não encontrado.',404)
        if(method==='GET') {
          const full=kind==='applications'?await one(db,appSelect+' WHERE a.id=$1',[id]):item
          const log=(await db.query('SELECT action,actor,created_at FROM history WHERE entity_type=$1 AND entity_id=$2 ORDER BY created_at DESC,id',[kind,id])).rows
          const related=kind==='interests'?(await db.query(appSelect+' WHERE a.interest_id=$1 ORDER BY a.created_at DESC',[id])).rows:[]
          return json(res,200,{item:full,history:log,applications:related})
        }
        if(method==='PATCH') {
          const input=await body(req),timestamp=now();let sql,args
          if(kind==='interests') {
            const v=person(input),status=choice(input.status,statuses.interests),notes=text(input.notes??'','Anotações',0,5000)
            sql='UPDATE interests SET name=$1,email=$2,phone=$3,cohort=$4,status=$5,notes=$6,updated_at=$7 WHERE id=$8';args=[v.name,v.email,v.phone,v.cohort,status,notes,timestamp,id]
          } else if(kind==='applications') {
            sql='UPDATE applications SET status=$1,notes=$2,updated_at=$3 WHERE id=$4';args=[choice(input.status,statuses.applications),text(input.notes??'','Anotações',0,5000),timestamp,id]
          } else {
            const v=processValues(input)
            sql='UPDATE processes SET name=$1,description=$2,starts_at=$3,ends_at=$4,status=$5,updated_at=$6 WHERE id=$7';args=[v.name,v.description,v.starts_at,v.ends_at,v.status,timestamp,id]
          }
          const changed=Object.keys(input).filter(key=>key in item && String(input[key])!==String(item[key]))
          const fieldNames={name:'nome',email:'e-mail',phone:'WhatsApp',cohort:'turma',status:'status',notes:'anotações',description:'descrição',starts_at:'início das inscrições',ends_at:'fim das inscrições'}
          const statusNames={novo:'Novo',contatado:'Contatado',qualificado:'Qualificado',arquivado:'Arquivado',recebida:'Recebida',em_analise:'Em análise',aprovada:'Aprovada',lista_espera:'Lista de espera',reprovada:'Não aprovada',cancelada:'Cancelada',preparacao:'Em preparação',ativo:'Ativo',encerrado:'Encerrado'}
          const action=changed.length?'Atualizado: '+changed.map(key=>fieldNames[key]||key).join(', ')+'.':'Registro revisado.'
          await db.batch([[sql,args],history(kind,id,action+(input.status && input.status!==item.status?' Status: '+statusNames[input.status]+'.':''),session.email)])
          return json(res,200,{ok:true})
        }
        if(method==='DELETE') {
          if(kind==='processes') requireValue(!(await one(db,'SELECT id FROM applications WHERE process_id=$1 LIMIT 1',[id])),'Este processo possui inscrições. Encerre-o para preservar os registros.',409)
          const commands=[]
          if(kind==='interests') commands.push(['DELETE FROM history WHERE entity_type=\'applications\' AND entity_id IN (SELECT id FROM applications WHERE interest_id=$1)',[id]])
          commands.push([`DELETE FROM ${kind} WHERE id=$1`,[id]],['DELETE FROM history WHERE entity_type=$1 AND entity_id=$2',[kind,id]])
          await db.batch(commands)
          return json(res,200,{ok:true})
        }
      }
      throw new HttpError(404,'Recurso não encontrado.')
    } catch(error) {
      if(error instanceof HttpError) return json(res,error.status,{error:error.message,fields:error.fields})
      if(error.code==='23505') return json(res,409,{error:'Já existe um cadastro com este e-mail ou uma inscrição neste processo.'})
      if(error.code==='23503') return json(res,409,{error:'O registro está associado a outros dados. Atualize a página e tente novamente.'})
      // Never include SQL, submitted personal data or connection strings in responses or logs.
      console.error('API failure:',error.code || error.name || 'unknown')
      return json(res,503,{error:'O serviço está temporariamente indisponível. Tente novamente em instantes.'})
    }
  }
}
export default createHandler()
