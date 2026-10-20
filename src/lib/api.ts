export type AdminUser = { id: string; name: string; email: string }
export type Process = { id: string; name: string; description: string; starts_at: string; ends_at: string; status: string; application_count: number; created_at: string }
export type Interest = { id: string; name: string; email: string; phone: string; cohort: string; status: string; notes: string; source: string; consent_at: string; consent_text: string; created_at: string; updated_at: string }
export type Application = { id: string; interest_id: string; process_id: string; name: string; email: string; phone: string; cohort: string; process_name: string; status: string; notes: string; created_at: string; updated_at: string }
export type History = { action: string; actor: string; created_at: string }
export type Detail = {item: Interest | Application | Process; history: History[]; applications: Application[]}
export type Page<T> = {items:T[];total:number;page:number;size:number}
export type Dashboard = { counts: {total:number;new_interests:number;in_progress:number;active_processes:number}; evolution:{day:string;total:number}[];recent:Interest[];distribution:{status:string;total:number}[] }
export class ApiError extends Error { status: number; constructor(message:string,status:number) {super(message);this.status=status} }
let csrf=''
let onUnauthorized: (()=>void)|undefined
export function setAuth(token:string,callback?:()=>void) {csrf=token;onUnauthorized=callback}
export async function api<T>(path:string,options:RequestInit={}):Promise<T> {
  const response=await fetch('/api'+path,{...options,credentials:'same-origin',headers:{...(options.body?{'Content-Type':'application/json'}:{}),...(csrf?{'X-CSRF-Token':csrf}:{}),...options.headers}})
  const result=await response.json().catch(()=>({error:'O servidor não respondeu. Tente novamente.'}))
  if(!response.ok) {if(response.status===401 && !path.startsWith('/auth/login')) onUnauthorized?.();throw new ApiError(result.error || 'Não foi possível concluir a ação.',response.status)}
  return result as T
}
export const mutate=<T,>(path:string,method:string,body?:unknown)=>api<T>(path,{method,...(body!==undefined?{body:JSON.stringify(body)}:{})})
export async function downloadCsv(kind:string,query:string) {
  const response=await fetch(`/api/admin/${kind}/export?${query}`,{credentials:'same-origin'})
  if(!response.ok) {const data=await response.json();if(response.status===401)onUnauthorized?.();throw new Error(data.error)}
  const url=URL.createObjectURL(await response.blob()),link=document.createElement('a')
  link.href=url;link.download=`gestcorp-${kind}-${new Date().toISOString().slice(0,10)}.csv`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000)
}
