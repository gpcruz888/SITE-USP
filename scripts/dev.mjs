import { spawn } from 'node:child_process'
const port=process.env.PORT || '5199'
const env={...process.env,API_PORT:'5200',APP_URL:process.env.APP_URL || `http://127.0.0.1:${port}`}
const api=spawn(process.execPath,['--env-file-if-exists=.env','--watch','--watch-path=server','server/start.mjs'],{stdio:'inherit',env})
const vite=spawn(process.execPath,['node_modules/vite/bin/vite.js','--port',port],{stdio:'inherit',env})
let closing=false
function stop(code=0) { if(closing)return; closing=true;api.kill();vite.kill();setTimeout(()=>process.exit(code),200).unref() }
api.on('exit',code=>stop(code || 0));vite.on('exit',code=>stop(code || 0))
process.on('SIGINT',()=>stop());process.on('SIGTERM',()=>stop())
