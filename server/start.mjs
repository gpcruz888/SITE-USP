import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, extname } from 'node:path'
import handler from './app.mjs'
import { getDatabase } from './database.mjs'
import { securityHeaders } from './security.mjs'

const port=Number(process.env.API_PORT || process.env.PORT || 4173)
const root=resolve('dist')
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.webp':'image/webp','.ico':'image/x-icon'}
await getDatabase()
const server=createServer(async(req,res)=> {
  if(req.url?.startsWith('/api/')) return handler(req,res)
  securityHeaders(res,process.env.NODE_ENV==='production')
  if(!['GET','HEAD'].includes(req.method)) {res.writeHead(405);res.end();return}
  try {
    const path=decodeURIComponent(new URL(req.url,'http://local').pathname)
    let file=resolve(root,'.'+path)
    if(!file.startsWith(root+'/') && file!==root) {res.writeHead(403);res.end();return}
    try { if(!(await stat(file)).isFile()) file=resolve(root,'index.html') } catch { if(extname(path)) {res.writeHead(404);res.end();return};file=resolve(root,'index.html') }
    res.setHeader('Content-Type',mime[extname(file)] || 'application/octet-stream')
    if(file.includes('/assets/')) res.setHeader('Cache-Control','public,max-age=31536000,immutable')
    res.statusCode=200;res.end(req.method==='HEAD'?undefined:await readFile(file))
  } catch {res.writeHead(404);res.end('Página não encontrada.')}
})
server.listen(port,'127.0.0.1',()=>console.log(`Gestcorp: http://127.0.0.1:${port}`))
const stop=()=>server.close(async()=>{await (await getDatabase()).close();process.exit(0)})
process.on('SIGTERM',stop);process.on('SIGINT',stop)
