export class HttpError extends Error {
  constructor(status, message, fields) { super(message); this.status=status; this.fields=fields }
}
export const requireValue=(condition,message,status=400)=> { if(!condition) throw new HttpError(status,message) }
export function text(value, label, min=0, max=200) {
  requireValue(typeof value==='string',`${label}: valor inválido.`)
  const v=value.trim()
  requireValue(v.length>=min && v.length<=max && !/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(v),`${label}: use entre ${min} e ${max} caracteres.`)
  return v
}
export function email(value) {
  const v=text(value,'E-mail',3,254).toLowerCase()
  requireValue(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),'Informe um e-mail válido.')
  return v
}
export function choice(value, choices, label='Status') { requireValue(choices.includes(value),`${label} inválido.`); return value }
export const statuses={ interests:['novo','contatado','qualificado','arquivado'],processes:['preparacao','ativo','encerrado'],applications:['recebida','em_analise','aprovada','lista_espera','reprovada','cancelada'] }
export function person(body, publicForm=false) {
  const name=text(body.name ?? body.nome,'Nome',3,150), mail=email(body.email), phone=text(body.phone ?? body.whatsapp,'WhatsApp',10,24)
  requireValue(/^[+\d\s()-]+$/.test(phone) && phone.replace(/\D/g,'').length>=10 && phone.replace(/\D/g,'').length<=15,'Informe um WhatsApp válido com DDD.')
  const cohort=text(body.cohort ?? body.turmaId ?? 'gestcorp-2027','Turma',1,100)
  if(publicForm) requireValue(body.consentimento===true,'Autorize o tratamento dos dados para continuar.')
  return {name,email:mail,phone,cohort}
}
export function processValues(body) {
  const name=text(body.name,'Nome do processo',3,150),description=text(body.description ?? '','Descrição',0,5000)
  const starts_at=date(body.starts_at),ends_at=date(body.ends_at)
  requireValue(starts_at<=ends_at,'A data final deve ser igual ou posterior à inicial.')
  return {name,description,starts_at,ends_at,status:choice(body.status,statuses.processes)}
}
export function date(value) {
  requireValue(typeof value==='string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value+'T12:00:00Z')) && new Date(value+'T12:00:00Z').toISOString().slice(0,10)===value,'Informe uma data válida.')
  return value
}
export function password(value) {
  requireValue(typeof value==='string' && value.length>=12 && value.length<=128,'Use uma senha com 12 a 128 caracteres.')
  return value
}
export function pagination(params) {
  const page=Number(params.get('page')||1),size=Number(params.get('size')||10)
  requireValue(Number.isInteger(page)&&page>=1&&page<=100000&&Number.isInteger(size)&&size>=1&&size<=50,'Paginação inválida.')
  return {page,size}
}

export function loginPassword(value) {
  requireValue(typeof value==='string' && value.length>=1 && value.length<=128,'Informe sua senha.')
  return value
}
