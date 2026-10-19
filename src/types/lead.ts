/** Tipos preparados para integração futura com o painel administrativo. */

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
  | 'integration_pending'
  | 'error'
  | 'success'
