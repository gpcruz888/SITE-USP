export interface Docente {
  id: string
  nome: string
  role?: string
  disciplinas: string[]
  lattes: string
  destaque?: boolean
  /** Campos a confirmar pela coordenação */
  titulacao?: string | null
  vinculo?: string | null
  areaAtuacao?: string | null
}

export const docentes: Docente[] = [
  {
    id: 'valeria-castro',
    nome: 'Valéria Castro',
    role: 'coordenação',
    disciplinas: [
      'Metodologia da Pesquisa em Comunicação',
      'Avaliação e Mensuração de Resultados em Comunicação',
    ],
    lattes: 'http://lattes.cnpq.br/7054550921382704',
    destaque: true,
    titulacao: null,
    vinculo: null,
    areaAtuacao: null,
  },
  {
    id: 'luiz-alberto-de-farias',
    nome: 'Luiz Alberto de Farias',
    role: 'vice-coordenação',
    disciplinas: ['Estratégias de Relacionamento com a Mídia'],
    lattes: 'http://lattes.cnpq.br/3303990426723179',
    destaque: true,
    titulacao: null,
    vinculo: null,
    areaAtuacao: null,
  },
  {
    id: 'agatha-paraventi',
    nome: 'Ágatha Paraventi',
    disciplinas: ['Ética, Integridade e Comunicação'],
    lattes: 'http://lattes.cnpq.br/7578128153022337',
  },
  {
    id: 'carolina-terra',
    nome: 'Carolina Terra',
    disciplinas: ['Relações Públicas Digitais e Mídias Sociais'],
    lattes: 'http://lattes.cnpq.br/4409094765322922',
    destaque: true,
    titulacao: null,
    vinculo: null,
    areaAtuacao: null,
  },
  {
    id: 'claudio-cardoso',
    nome: 'Cláudio Cardoso',
    disciplinas: ['Comunicação Estratégica na transformação digital e cultural'],
    lattes: 'http://lattes.cnpq.br/4669329854331074',
  },
  {
    id: 'dorinho-bastos',
    nome: 'Dorinho Bastos',
    disciplinas: ['Criatividade: a marca e sua comunicação'],
    lattes: 'http://lattes.cnpq.br/8452179447618910',
  },
  {
    id: 'else-lemos',
    nome: 'Else Lemos',
    disciplinas: ['Ambiente contemporâneo de RP'],
    lattes: 'http://lattes.cnpq.br/2996340814216498',
  },
  {
    id: 'eugenio-bucci',
    nome: 'Eugênio Bucci',
    disciplinas: ['Comunicação Pública e Comunicação Política'],
    lattes: 'http://lattes.cnpq.br/3091927508362382',
    destaque: true,
    titulacao: null,
    vinculo: null,
    areaAtuacao: null,
  },
  {
    id: 'flavio-hourneaux-junior',
    nome: 'Flávio Hourneaux Junior',
    disciplinas: ['Gestão Estratégica das Organizações'],
    lattes: 'http://lattes.cnpq.br/0412490684047223',
  },
  {
    id: 'josmar-andrade',
    nome: 'Josmar Andrade',
    disciplinas: ['Gestão de Marcas'],
    lattes: 'http://lattes.cnpq.br/8439431746333055',
  },
  {
    id: 'lais-castilho',
    nome: 'Laís Castilho',
    disciplinas: [
      'Planejamento Estratégico de ESG e Sustentabilidade na Comunicação Organizacional',
    ],
    lattes: 'http://lattes.cnpq.br/3073647108708772',
  },
  {
    id: 'margarida-kunsch',
    nome: 'Margarida Kunsch',
    disciplinas: ['Planejamento Estratégico da Comunicação Organizacional'],
    lattes: 'http://lattes.cnpq.br/4213808458053599',
    destaque: true,
    titulacao: null,
    vinculo: null,
    areaAtuacao: null,
  },
  {
    id: 'maria-aparecida-ferrari',
    nome: 'Maria Aparecida Ferrari',
    disciplinas: ['Comunicação Intercultural'],
    lattes: 'http://lattes.cnpq.br/5682470025203121',
  },
  {
    id: 'maria-do-socorro-braga',
    nome: 'Maria do Socorro Braga',
    disciplinas: ['Introdução à Ciência Política'],
    lattes: 'http://lattes.cnpq.br/2311094074614215',
  },
  {
    id: 'mauro-wilton',
    nome: 'Mauro Wilton',
    disciplinas: [
      'Teoria da Comunicação e a Gestão Simbólica de Processos Organizacionais',
    ],
    lattes: 'http://lattes.cnpq.br/7339114979277252',
  },
  {
    id: 'mitsuru-higuchi-yanaze',
    nome: 'Mitsuru Higuchi Yanaze',
    disciplinas: ['Marketing'],
    lattes: 'http://lattes.cnpq.br/0860597739869236',
  },
  {
    id: 'patricia-salvatori',
    nome: 'Patrícia Salvatori',
    disciplinas: ['Diversidade e Inclusão nas Organizações'],
    lattes: 'http://lattes.cnpq.br/8299687683562728',
  },
  {
    id: 'paulo-nassar',
    nome: 'Paulo Nassar',
    disciplinas: [
      'Comunicação Organizacional: conceitos, processos, novas interfaces e desafios',
    ],
    lattes: 'http://lattes.cnpq.br/1102614034104197',
    destaque: true,
    titulacao: null,
    vinculo: null,
    areaAtuacao: null,
  },
  {
    id: 'renata-beretta',
    nome: 'Renata Beretta',
    disciplinas: ['Cultura Organizacional e Comunicação'],
    lattes: 'http://lattes.cnpq.br/8969490083225177',
  },
  {
    id: 'rozalia-del-gaudio',
    nome: 'Rozália Del Gáudio',
    disciplinas: ['Comunicação Interna: Processos e Gestão'],
    lattes: 'http://lattes.cnpq.br/6137161686586044',
  },
  {
    id: 'sergio-andreucci',
    nome: 'Sérgio Andreucci',
    disciplinas: ['Gestão de Risco, Comunicação e Crises'],
    lattes: 'http://lattes.cnpq.br/8315242219969418',
  },
  {
    id: 'suzel-figueiredo',
    nome: 'Suzel Figueiredo',
    disciplinas: ['Pesquisa de Opinião Pública e de Mercado'],
    lattes: 'http://lattes.cnpq.br/4985535303217577',
  },
  {
    id: 'vania-bueno',
    nome: 'Vânia Bueno',
    disciplinas: ['Comunicação na Governança'],
    lattes: 'http://lattes.cnpq.br/4634983710312382',
  },
]

export const docentesDestaque = docentes.filter((d) => d.destaque)
