export type TurmaStatus = 'em_breve' | 'inscricoes_abertas' | 'encerrada'

export interface Turma {
  id: string
  nome: string
  ano: number
  dataInicio: string
  dataInicioLabel: string
  modalidade: string
  local: string
  duracao: string
  vagas: number
  publicoElegivel: string
  diasHorarios: string
  cargaHoraria: string | null
  investimento: string | null
  investimentoParcelas: string | null
  periodoInscricao: string | null
  status: TurmaStatus
  ativa: boolean
}

export const turmas: Turma[] = [
  {
    id: 'gestcorp-2027',
    nome: 'Gestcorp 2027',
    ano: 2027,
    dataInicio: '2027-03-15',
    dataInicioLabel: '15 de março de 2027',
    modalidade: 'presencial',
    local: 'ECA-USP, Cidade Universitária, São Paulo',
    duracao: 'aproximadamente dois anos',
    vagas: 50,
    publicoElegivel: 'pessoas com graduação concluída',
    diasHorarios:
      'segundas e quartas-feiras, das 19h às 22h30, sujeitos à confirmação do calendário',
    cargaHoraria: null, // [após confirmação do registro oficial]
    investimento: 'R$ 23.280',
    investimentoParcelas: '24x de R$ 970',
    periodoInscricao: null, // [somente o período oficialmente autorizado]
    status: 'em_breve',
    ativa: true,
  },
]

export function getTurmaAtiva(): Turma {
  const ativa = turmas.find((t) => t.ativa)
  if (!ativa) {
    throw new Error('Nenhuma turma ativa configurada.')
  }
  return ativa
}

export function formatPending(value: string | null, pendingLabel: string): string {
  return value ?? pendingLabel
}
