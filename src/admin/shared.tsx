import { useEffect, useRef, type ReactNode } from 'react'
import { X, AlertCircle, CheckCircle2, LoaderCircle, Inbox, ArrowUpRight } from 'lucide-react'
export const labels:Record<string,string>={novo:'Novo',contatado:'Contatado',qualificado:'Qualificado',arquivado:'Arquivado',preparacao:'Em preparação',ativo:'Ativo',encerrado:'Encerrado',recebida:'Recebida',em_analise:'Em análise',aprovada:'Aprovada',lista_espera:'Lista de espera',reprovada:'Não aprovada',cancelada:'Cancelada'}
export const statusOptions:Record<string,string[]>={interests:['novo','contatado','qualificado','arquivado'],applications:['recebida','em_analise','aprovada','lista_espera','reprovada','cancelada'],processes:['preparacao','ativo','encerrado']}
export function formatDate(value:string,time=false) { return new Intl.DateTimeFormat('pt-BR',{dateStyle:'short',...(time?{timeStyle:'short' as const}:{})}).format(new Date(value.length===10?value+'T12:00:00':value)) }
export function Badge({status}:{status:string}) {return <span className={`a-badge a-status-${status}`}><i aria-hidden="true"/>{labels[status]||status}</span>}
export function StatusSelect({kind,value,onChange}:{kind:string;value:string;onChange:(value:string)=>void}) {return <select value={value} onChange={e=>onChange(e.target.value)} required>{statusOptions[kind].map(s=><option value={s} key={s}>{labels[s]}</option>)}</select>}
export function Notice({children,error=false}:{children:ReactNode;error?:boolean}) {return <div role={error?'alert':'status'} className={`a-notice ${error?'a-notice-error':''}`}>{error?<AlertCircle size={18}/>:<CheckCircle2 size={18}/>}<span>{children}</span></div>}
export function Loading() {return <div className="a-loading" role="status"><LoaderCircle className="a-spin" size={22}/> Carregando dados…</div>}
export function Empty({title,description,action}:{title:string;description:string;action?:ReactNode}) {return <div className="a-empty"><Inbox size={32} strokeWidth={1.4}/><h3>{title}</h3><p>{description}</p>{action}</div>}
export function Modal({title,onClose,children,wide=false}:{title:string;onClose:()=>void;children:ReactNode;wide?:boolean}) {
 const ref=useRef<HTMLDivElement>(null)
 useEffect(()=>{const previous=document.activeElement as HTMLElement;const overflow=document.body.style.overflow;document.body.style.overflow='hidden';ref.current?.focus();return()=>{document.body.style.overflow=overflow;previous?.focus()}},[])
 return <div className="a-overlay" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={title} className={`a-drawer ${wide?'a-drawer-wide':''}`} onKeyDown={e=>{
 if(e.key==='Escape'){e.stopPropagation();onClose()}
 if(e.key==='Tab'){const nodes=ref.current?.querySelectorAll<HTMLElement>('button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),a[href]');if(!nodes?.length)return;const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&(document.activeElement===first||document.activeElement===ref.current)){e.preventDefault();last.focus()}else if(!e.shiftKey&&(document.activeElement===last||document.activeElement===ref.current)){e.preventDefault();first.focus()}}
 }}><div className="a-drawer-heading"><h2>{title}</h2><button type="button" className="a-icon-btn" aria-label="Fechar painel" onClick={onClose}><X size={21}/></button></div>{children}</div></div>
}
export function PersonName({name,email,onClick}:{name:string;email:string;onClick:()=>void}) {return <button className="a-person" onClick={onClick}><span className="a-avatar" aria-hidden="true">{name.split(' ').slice(0,2).map(s=>s[0]).join('')}</span><span><strong>{name}</strong><small>{email}</small></span><ArrowUpRight className="a-person-arrow" size={15}/></button>}
