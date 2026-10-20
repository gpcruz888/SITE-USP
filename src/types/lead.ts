/** Contrato de captação pública integrado ao painel administrativo. */

export interface LeadPayload {
  nome: string
  email: string
  whatsapp: string
  turmaId: string
  consentimento: boolean
  origem: 'home' | 'turma-2027'
  createdAt: string
}

export type LeadSubmitStatus =
  | 'idle'
  | 'loading'
  | 'error'
  | 'success'
