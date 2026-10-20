import { readFile } from 'node:fs/promises'
const config=JSON.parse(await readFile('vercel.json','utf8'))
const api=await import('../api/index.js')
if(typeof api.default!=='function')throw new Error('Função Vercel inválida')
if(!config.rewrites.some(r=>r.source==='/api/:path*'))throw new Error('API sem encaminhamento')
if(!config.rewrites.some(r=>r.source==='/admin/:path*'))throw new Error('Rotas administrativas ausentes')
console.log('Função Vercel e rotas válidas. Banco e credenciais de hospedagem devem ser configurados antes de publicar.')
