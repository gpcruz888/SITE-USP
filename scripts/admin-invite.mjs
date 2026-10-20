import { createInterface } from 'node:readline/promises'
import { randomUUID } from 'node:crypto'
import { getDatabase } from '../server/database.mjs'
import { token, hash } from '../server/security.mjs'
import { email } from '../server/validation.mjs'
const recovering=process.argv.includes('--recover')
const mail=email(process.argv.slice(2).find(arg=>arg!=='--recover') || process.env.ADMIN_EMAIL || 'gabriel@feitojunto.com')
const db=await getDatabase(),id=randomUUID(),secret=token(),timestamp=new Date().toISOString()
const current=(await db.query('SELECT * FROM admins WHERE email=$1',[mail])).rows[0]
if(current?.password_hash && !recovering) {console.error('Administrador já ativado. Use a alteração de senha no painel.');await db.close();process.exit(1)}
if(recovering) {
  if(!current) { console.error('Administrador não encontrado.');await db.close();process.exit(1) }
  const rl=createInterface({input:process.stdin,output:process.stdout})
  const answer=await rl.question(`Para revogar todas as sessões e recriar o acesso, digite ${mail}: `)
  rl.close()
  if(answer.trim()!==mail) {console.error('Recuperação cancelada.');await db.close();process.exit(1)}
}
await db.batch([
 ...(recovering ? [['UPDATE admins SET password_hash=NULL WHERE email=$1',[mail]],['DELETE FROM sessions WHERE admin_id=(SELECT id FROM admins WHERE email=$1)',[mail]]] : []),
 ['INSERT INTO admins(id,email,name,created_at) VALUES($1,$2,$3,$4) ON CONFLICT(email) DO NOTHING',[id,mail,mail.split('@')[0],timestamp]],
 ['DELETE FROM activation_tokens WHERE admin_id=(SELECT id FROM admins WHERE email=$1)',[mail]],
 ['INSERT INTO activation_tokens(token_hash,admin_id,expires_at) SELECT $1,id,$2 FROM admins WHERE email=$3',[hash(secret),Date.now()+30*60000,mail]],
])
console.log(`Ativação de ${mail} (válida por 30 minutos, uso único):\n${process.env.APP_URL || 'http://127.0.0.1:5199'}/admin/ativar#token=${secret}\nAbra este link em particular para criar sua senha. Não compartilhe nem versione o link.`)
await db.close()
