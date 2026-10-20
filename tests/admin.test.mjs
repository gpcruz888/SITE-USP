import { test, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'
import { openDatabase } from '../server/database.mjs'
import { createHandler } from '../server/app.mjs'
import { passwordHash, hash, token } from '../server/security.mjs'

let db,server,base,cookie,csrf,processId,interestId,applicationId,directory
const origin='http://127.0.0.1:5199'
const pass='Teste de acesso exclusivo 2026'
const person={nome:'Pessoa Teste',email:'pessoa@example.invalid',whatsapp:'11999990000',turmaId:'gestcorp-2027',consentimento:true}
const timestamp=new Date().toISOString()
async function request(path,{method='GET',data,auth=true,headers={}}={}) {
 const response=await fetch(base+path,{method,headers:{Origin:origin,...(data?{'Content-Type':'application/json'}:{}),...(auth&&cookie?{Cookie:cookie,'X-CSRF-Token':csrf}:{}),...headers},...(data?{body:JSON.stringify(data)}:{})})
 const content=response.headers.get('content-type')||''
 return {status:response.status,headers:response.headers,data:content.includes('application/json')?await response.json():await response.text()}
}
before(async()=>{
 directory=await mkdtemp(join(tmpdir(),'gestcorp-test-'))
 db=await openDatabase({url:null,path:join(directory,'pg')})
 await db.query('INSERT INTO admins(id,email,name,password_hash,created_at) VALUES($1,$2,$3,$4,$5)',[randomUUID(),'admin@example.invalid','Equipe QA',await passwordHash(pass),timestamp])
 server=createServer(createHandler({database:db,appUrl:origin}));await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve)});base=`http://127.0.0.1:${server.address().port}`
})
after(async()=>{await new Promise(r=>server.close(r));await db.close();await rm(directory,{recursive:true,force:true})})

test('rotas privadas, exportações e sessão recusam visitante',async()=>{
 for(const path of ['/api/admin/dashboard','/api/admin/interests','/api/admin/processes','/api/admin/applications/export','/api/auth/session'])assert.equal((await request(path,{auth:false})).status,401)
})
test('login rejeita credenciais inválidas e origem externa',async()=>{
 assert.equal((await request('/api/auth/login',{method:'POST',auth:false,data:{email:'admin@example.invalid',password:'incorreta'}})).status,401)
 assert.equal((await request('/api/auth/login',{method:'POST',auth:false,headers:{Origin:'https://externo.invalid'},data:{email:'admin@example.invalid',password:pass}})).status,403)
 const r=await request('/api/auth/login',{method:'POST',auth:false,data:{email:'admin@example.invalid',password:pass}})
 assert.equal(r.status,200);assert.match(r.headers.get('set-cookie'),/HttpOnly; SameSite=Strict/)
 cookie=r.headers.get('set-cookie').split(';')[0];csrf=r.data.csrf
 const stored=(await db.query('SELECT * FROM sessions')).rows[0]
 assert.notEqual(stored.token_hash,cookie.split('=')[1]);assert.equal(stored.token_hash,hash(cookie.split('=')[1]))
 assert.equal(r.headers.get('cache-control'),'no-store')
})
test('dashboard vazio é real; criação e modificação exigem CSRF',async()=>{
 const r=await request('/api/admin/dashboard');assert.equal(r.status,200);assert.deepEqual(r.data.counts,{total:0,new_interests:0,in_progress:0,active_processes:0})
 assert.equal((await request('/api/admin/processes',{method:'POST',headers:{'X-CSRF-Token':''},data:{}})).status,403)
})
test('processos validam datas, status e persistem em PostgreSQL',async()=>{
 const data={name:'Seleção Teste',description:'Descrição do processo de QA.',starts_at:'2020-01-01',ends_at:'2099-12-31',status:'ativo'}
 assert.equal((await request('/api/admin/processes',{method:'POST',data:{...data,ends_at:'2019-01-01'}})).status,400)
 assert.equal((await request('/api/admin/processes',{method:'POST',data:{...data,status:'invalido'}})).status,400)
 assert.equal((await request('/api/admin/processes',{method:'POST',data:{...data,starts_at:'2026-99-99'}})).status,400)
 const r=await request('/api/admin/processes',{method:'POST',data});assert.equal(r.status,201);processId=r.data.id
 assert.equal((await request('/api/public/processes',{auth:false})).data.items.length,1)
 assert.equal((await request('/api/admin/processes')).data.items[0].application_count,0)
})
test('formulário público valida no backend e registra consentimento',async()=>{
 for(const data of [{...person,consentimento:false},{...person,email:'x'},{...person,whatsapp:'123'},{...person,nome:'AB'}])assert.equal((await request('/api/public/interests',{method:'POST',auth:false,data})).status,400)
 const r=await request('/api/public/interests',{method:'POST',auth:false,data:person});assert.equal(r.status,201);assert.equal(r.data.items,undefined)
 const rows=(await request('/api/admin/interests')).data;assert.equal(rows.total,1);interestId=rows.items[0].id
 assert.ok(rows.items[0].consent_at);assert.match(rows.items[0].consent_text,/Autorizo/)
})
test('reenvio público não sobrescreve os dados da pessoa',async()=>{
 const r=await request('/api/public/interests',{method:'POST',auth:false,data:{...person,nome:'Nome Alterado',whatsapp:'21988889999'}});assert.equal(r.status,201)
 const details=(await request('/api/admin/interests/'+interestId)).data
 assert.equal(details.item.name,person.nome);assert.equal(details.history.length,1)
})
test('inscrição pública é associada ao processo e duplicatas não são criadas',async()=>{
 for(let i=0;i<2;i++)assert.equal((await request('/api/public/applications',{method:'POST',auth:false,data:{...person,process_id:processId}})).status,201)
 const rows=(await request('/api/admin/applications')).data;assert.equal(rows.total,1);applicationId=rows.items[0].id;assert.equal(rows.items[0].process_name,'Seleção Teste')
 assert.equal((await request('/api/admin/processes')).data.items[0].application_count,1)
 const dashboard=(await request('/api/admin/dashboard')).data;assert.equal(dashboard.counts.total,1);assert.equal(dashboard.counts.in_progress,1);assert.equal(dashboard.evolution.length,1)
})
test('edição de interessado e inscrição mantém histórico',async()=>{
 const lead=(await request('/api/admin/interests/'+interestId)).data.item
 assert.equal((await request('/api/admin/interests/'+interestId,{method:'PATCH',data:{...lead,name:'Pessoa Atualizada',status:'qualificado',notes:'Contato realizado.'}})).status,200)
 assert.equal((await request('/api/admin/applications/'+applicationId,{method:'PATCH',data:{status:'em_analise',notes:'Análise dos dados.'}})).status,200)
 const detail=(await request('/api/admin/interests/'+interestId)).data
 assert.equal(detail.item.name,'Pessoa Atualizada');assert.equal(detail.item.status,'qualificado');assert.equal(detail.history.length,2);assert.equal(detail.applications.length,1)
 assert.equal((await request('/api/admin/applications/'+applicationId)).data.item.notes,'Análise dos dados.')
})
test('busca, filtros de status, processo, datas e paginação',async()=>{
 for(const query of ['q=Atualizada','q=pessoa%40example.invalid','q=1199999','status=qualificado','process='+processId,'from=2020-01-01&to=2099-12-31'])assert.equal((await request('/api/admin/interests?'+query)).data.total,1,query)
 assert.equal((await request('/api/admin/interests?q=inexistente')).data.total,0)
 assert.equal((await request('/api/admin/interests?q=%27%20OR%201%3D1--')).data.total,0)
 assert.equal((await request('/api/admin/interests?page=2&size=1')).data.items.length,0)
 assert.equal((await request('/api/admin/interests?size=9999')).status,400)
 assert.equal((await request('/api/admin/interests?status=errado')).status,400)
 assert.equal((await request('/api/admin/applications?status=em_analise&process='+processId)).data.total,1)
})
test('CSV exporta os filtros e neutraliza fórmulas em planilhas',async()=>{
 const r=await request('/api/admin/interests',{method:'POST',data:{name:'=HYPERLINK(123)',email:'formula@example.invalid',phone:'11911112222',cohort:'gestcorp-2027',consentimento:true}});assert.equal(r.status,201)
 const exported=await request('/api/admin/interests/export?q=formula')
 assert.equal(exported.status,200);assert.match(exported.headers.get('content-type'),/text\/csv/);assert.match(exported.data,/"'=HYPERLINK/);assert.doesNotMatch(exported.data,/Pessoa Atualizada/)
 assert.equal((await request('/api/admin/applications/export')).status,200)
})
test('processos encerrados ou fora do período rejeitam inscrição; exclusão preserva vínculos',async()=>{
 const p=(await request('/api/admin/processes/'+processId)).data.item
 assert.equal((await request('/api/admin/processes/'+processId,{method:'DELETE'})).status,409)
 assert.equal((await request('/api/admin/processes/'+processId,{method:'PATCH',data:{...p,status:'encerrado'}})).status,200)
 assert.equal((await request('/api/public/applications',{method:'POST',auth:false,data:{...person,process_id:processId}})).status,409)
 assert.equal((await request('/api/public/processes',{auth:false})).data.items.length,0)
})
test('convite de ativação é de uso único, hash no banco e valida senha',async()=>{
 const id=randomUUID(),secret=token()
 await db.batch([['INSERT INTO admins(id,email,name,created_at) VALUES($1,$2,$3,$4)',[id,'convite@example.invalid','Novo Admin',timestamp]],['INSERT INTO activation_tokens(token_hash,admin_id,expires_at) VALUES($1,$2,$3)',[hash(secret),id,Date.now()+60000]]])
 assert.equal((await request('/api/auth/activate',{method:'POST',auth:false,data:{token:secret,password:'curta'}})).status,400)
 assert.equal((await request('/api/auth/activate',{method:'POST',auth:false,data:{token:secret,password:pass}})).status,200)
 assert.equal((await request('/api/auth/activate',{method:'POST',auth:false,data:{token:secret,password:pass}})).status,400)
 assert.match((await db.query('SELECT password_hash FROM admins WHERE id=$1',[id])).rows[0].password_hash,/^scrypt\$/)
})
test('exclusão de interessado remove inscrições e histórico relacionado',async()=>{
 assert.equal((await request('/api/admin/interests/'+interestId,{method:'DELETE'})).status,200)
 assert.equal((await request('/api/admin/interests/'+interestId)).status,404)
 assert.equal((await request('/api/admin/applications/'+applicationId)).status,404)
 assert.equal((await db.query('SELECT * FROM history WHERE entity_id=$1 OR entity_id=$2',[interestId,applicationId])).rows.length,0)
 assert.equal((await request('/api/admin/processes/'+processId,{method:'DELETE'})).status,200)
})
test('logout revoga a sessão no banco e expiração é aplicada',async()=>{
 assert.equal((await request('/api/auth/session')).status,200)
 assert.equal((await request('/api/auth/logout',{method:'POST',data:{}})).status,200)
 assert.equal((await request('/api/admin/interests')).status,401)
 const r=await request('/api/auth/login',{method:'POST',auth:false,data:{email:'admin@example.invalid',password:pass}});cookie=r.headers.get('set-cookie').split(';')[0];csrf=r.data.csrf
 await db.query('UPDATE sessions SET expires_at=1')
 assert.equal((await request('/api/admin/dashboard')).status,401)
})
test('troca de senha exige senha atual e revoga todas as sessões',async()=>{
 const r=await request('/api/auth/login',{method:'POST',auth:false,data:{email:'convite@example.invalid',password:pass}})
 cookie=r.headers.get('set-cookie').split(';')[0];csrf=r.data.csrf
 assert.equal((await request('/api/auth/password',{method:'POST',data:{current:'incorreta',password:' Nova frase exclusiva de acesso '}})).status,400)
 assert.equal((await request('/api/auth/password',{method:'POST',data:{current:pass,password:' Nova frase exclusiva de acesso '}})).status,200)
 assert.equal((await request('/api/admin/dashboard')).status,401)
 assert.equal((await request('/api/auth/login',{method:'POST',auth:false,data:{email:'convite@example.invalid',password:pass}})).status,401)
 assert.equal((await request('/api/auth/login',{method:'POST',auth:false,data:{email:'convite@example.invalid',password:' Nova frase exclusiva de acesso '}})).status,200)
})
test('produção utiliza cookie Secure e prefixo de host; limite absoluto não é renovado',async()=>{
 const prodServer=createServer(createHandler({database:db,appUrl:'https://gestcorp.example.invalid',production:true}))
 await new Promise((resolve,reject)=>{prodServer.once('error',reject);prodServer.listen(0,'127.0.0.1',resolve)})
 try {
  const r=await fetch(`http://127.0.0.1:${prodServer.address().port}/api/auth/login`,{method:'POST',headers:{Origin:'https://gestcorp.example.invalid','Content-Type':'application/json'},body:JSON.stringify({email:'admin@example.invalid',password:pass})})
  assert.equal(r.status,200);assert.match(r.headers.get('set-cookie'),/^__Host-gestcorp_session=/);assert.match(r.headers.get('set-cookie'),/; Secure/)
  assert.match(r.headers.get('content-security-policy'),/frame-ancestors 'none'/)
  const prodCookie=r.headers.get('set-cookie').split(';')[0]
  await db.query('UPDATE sessions SET absolute_expiry=1')
  const denied=await fetch(`http://127.0.0.1:${prodServer.address().port}/api/auth/session`,{headers:{Cookie:prodCookie}})
  assert.equal(denied.status,401)
 }finally{await new Promise(resolve=>prodServer.close(resolve))}
})
test('limite persistente bloqueia tentativas repetidas de login',async()=>{
 for(let i=0;i<8;i++) await request('/api/auth/login',{method:'POST',auth:false,data:{email:'ausente@example.invalid',password:'senha incorreta'}})
 assert.equal((await request('/api/auth/login',{method:'POST',auth:false,data:{email:'ausente@example.invalid',password:'senha incorreta'}})).status,429)
})

test('banco local sobrevive ao encerramento e à reabertura',async()=>{
 const count=(await db.query('SELECT COUNT(*)::int AS total FROM interests')).rows[0].total
 await db.close();db=await openDatabase({url:null,path:join(directory,'pg')})
 assert.equal((await db.query('SELECT COUNT(*)::int AS total FROM interests')).rows[0].total,count)
 assert.equal((await db.query('SELECT COUNT(*)::int AS total FROM admins')).rows[0].total,2)
})

