import { randomBytes, createHash, scrypt as rawScrypt, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
const scrypt = promisify(rawScrypt)
export const hash = value => createHash('sha256').update(value).digest('hex')
export const token = () => randomBytes(32).toString('base64url')
export async function passwordHash(password) {
  const salt = randomBytes(16).toString('hex')
  const key = await scrypt(password,salt,64, { N:32768, r:8, p:1, maxmem:64*1024*1024 })
  return `scrypt$${salt}$${key.toString('hex')}`
}
export async function verifyPassword(password, stored) {
  const [,salt,expected] = (stored || '').split('$')
  const actual = await scrypt(password, salt || 'gestcorp-invalid-account',64, {N:32768,r:8,p:1,maxmem:64*1024*1024})
  const buffer = Buffer.from(expected || '00'.repeat(64),'hex')
  return buffer.length===actual.length && timingSafeEqual(actual,buffer) && !!stored
}
export function equal(a,b) {
  if (typeof a!=='string' || typeof b!=='string') return false
  const aa=Buffer.from(a), bb=Buffer.from(b)
  return aa.length===bb.length && timingSafeEqual(aa,bb)
}
export function securityHeaders(res, production) {
  res.setHeader('X-Content-Type-Options','nosniff')
  res.setHeader('X-Frame-Options','DENY')
  res.setHeader('Referrer-Policy','strict-origin-when-cross-origin')
  res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=()')
  res.setHeader('Cache-Control','no-store')
  if (production) {
    res.setHeader('Strict-Transport-Security','max-age=31536000; includeSubDomains')
    res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self' https://forms.maisalunoscrm.com.br; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://www.maisalunoscrm.app.br https://forms.maisalunoscrm.com.br; frame-src https://forms.maisalunoscrm.com.br; frame-ancestors 'none'; form-action 'self' https://forms.maisalunoscrm.com.br; base-uri 'self'; object-src 'none'")
  }
}
