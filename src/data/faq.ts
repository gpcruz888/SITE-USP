export interface FaqItem {
  id: string
  pergunta: string
  resposta: string
}

export const faqItems: FaqItem[] = [
  {
    id: 'o-que-significa',
    pergunta: 'O que significa Gestcorp?',
    resposta:
      'Gestcorp é o nome curto da Especialização em Gestão Estratégica em Comunicação Organizacional e Relações Públicas da ECA-USP, oferecida desde 1999.',
  },
  {
    id: 'pos-usp',
    pergunta: 'O Gestcorp é uma pós-graduação da USP?',
    resposta:
      'Sim. A turma presencial de 2027 está registrada como especialização lato sensu da Escola de Comunicações e Artes da USP, em Gestão Estratégica em Comunicação Organizacional e Relações Públicas.',
  },
  {
    id: 'mba',
    pergunta: 'O Gestcorp é um MBA?',
    resposta:
      'Não. A edição presencial de 2027 está registrada no sistema oficial da USP como especialização lato sensu.',
  },
  {
    id: 'presencial',
    pergunta: 'As aulas são presenciais?',
    resposta:
      'Sim. As aulas acontecem na ECA-USP, na Cidade Universitária, em São Paulo, às segundas e quartas-feiras, das 19h às 22h30, sujeitas à confirmação do calendário.',
  },
  {
    id: 'formacao',
    pergunta: 'Preciso ser formado em Comunicação?',
    resposta:
      'Não. O programa prevê a participação de profissionais graduados em diferentes áreas do conhecimento que tenham interesse na Comunicação Organizacional e nas Relações Públicas.',
  },
  {
    id: 'rotina',
    pergunta: 'Como é a rotina do curso?',
    resposta:
      'Além dos encontros presenciais, a formação envolve leituras, discussões e atividades acadêmicas, organizadas em quatro módulos ao longo de aproximadamente dois anos.',
  },
  {
    id: 'tcc',
    pergunta: 'O curso tem trabalho de conclusão?',
    resposta:
      'Sim. A formação inclui uma monografia, desenvolvida no último módulo com acompanhamento acadêmico e fundamentação metodológica.',
  },
  {
    id: 'prova',
    pergunta: 'Há prova de seleção?',
    resposta:
      'O registro oficial da turma 2027 estabelece análise de currículo e documentação. As condições atualizadas do processo seletivo são informadas pela Secretaria.',
  },
  {
    id: 'bolsas',
    pergunta: 'Existem bolsas?',
    resposta:
      'Sim. O registro da edição prevê cinco bolsas integrais, com critérios específicos de elegibilidade. A Secretaria explica as condições de concessão.',
  },
  {
    id: 'prazo',
    pergunta: 'Até quando posso me inscrever?',
    resposta:
      'Se o período de inscrições ainda não estiver aberto, fale com a Secretaria para receber as informações da turma.',
  },
  {
    id: 'contato',
    pergunta: 'Como falo com a equipe?',
    resposta:
      'Pelo WhatsApp oficial da Secretaria do Gestcorp, para tirar dúvidas sobre o programa, os requisitos de ingresso e o calendário.',
  },
]
