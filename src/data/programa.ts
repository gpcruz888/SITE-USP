export interface Disciplina {
  nome: string
  professor: string
}

export interface Modulo {
  id: string
  titulo: string
  descricao: string
  disciplinas: Disciplina[]
}

export const modulos: Modulo[] = [
  {
    id: 'modulo-1',
    titulo: 'Módulo 1',
    descricao:
      'Fundamentos do planejamento e da teoria da Comunicação, em diálogo com governança, política, cultura, risco e ética.',
    disciplinas: [
      { nome: 'Comunicação na Governança', professor: 'Vânia Bueno' },
      {
        nome: 'Ambiente contemporâneo de RP: abordagens disciplinares e dimensão aplicada',
        professor: 'Else Lemos',
      },
      {
        nome: 'Planejamento Estratégico da Comunicação Organizacional',
        professor: 'Margarida Kunsch',
      },
      {
        nome: 'Teoria da Comunicação e a Gestão Simbólica de Processos Organizacionais',
        professor: 'Mauro Wilton',
      },
      { nome: 'Introdução à Ciência Política', professor: 'Maria do Socorro Braga' },
      { nome: 'Cultura Organizacional e Comunicação', professor: 'Renata Beretta' },
      { nome: 'Gestão de Risco, Comunicação e Crises', professor: 'Sérgio Andreucci' },
      { nome: 'Ética, Integridade e Comunicação', professor: 'Ágatha Paraventi' },
    ],
  },
  {
    id: 'modulo-2',
    titulo: 'Módulo 2',
    descricao:
      'A organização e seus públicos: comunicação organizacional, pública e interna, gestão, marketing, pesquisa de opinião e transformação digital, além da introdução ao trabalho científico.',
    disciplinas: [
      {
        nome: 'Comunicação Organizacional: conceitos, processos, novas interfaces e desafios',
        professor: 'Paulo Nassar',
      },
      { nome: 'Comunicação Pública e Comunicação Política', professor: 'Eugênio Bucci' },
      { nome: 'Gestão Estratégica das Organizações', professor: 'Flávio Hourneaux Junior' },
      { nome: 'Marketing', professor: 'Mitsuru Higuchi Yanaze' },
      { nome: 'Pesquisa de Opinião Pública e de Mercado', professor: 'Suzel Figueiredo' },
      { nome: 'Comunicação Interna: Processos e Gestão', professor: 'Rozália Del Gáudio' },
      {
        nome: 'Comunicação Estratégica na transformação digital e cultural',
        professor: 'Cláudio Cardoso',
      },
      {
        nome: 'Metodologia da Pesquisa em Comunicação: introdução ao trabalho científico',
        professor: 'Valéria Castro',
      },
    ],
  },
  {
    id: 'modulo-3',
    titulo: 'Módulo 3',
    descricao:
      'Marca, mídia e mensuração, ao lado de temas contemporâneos como ambiente digital, diversidade, ESG e interculturalidade.',
    disciplinas: [
      { nome: 'Criatividade: a marca e sua comunicação', professor: 'Dorinho Bastos' },
      { nome: 'Gestão de Marcas', professor: 'Josmar Andrade' },
      {
        nome: 'Avaliação e Mensuração de Resultados em Comunicação',
        professor: 'Valéria Castro',
      },
      { nome: 'Estratégias de Relacionamento com a Mídia', professor: 'Luiz Alberto de Farias' },
      { nome: 'Relações Públicas Digitais e Mídias Sociais', professor: 'Carolina Terra' },
      { nome: 'Diversidade e Inclusão nas Organizações', professor: 'Patrícia Salvatori' },
      {
        nome: 'Planejamento Estratégico de ESG e Sustentabilidade na Comunicação Organizacional',
        professor: 'Laís Castilho',
      },
      {
        nome: 'Comunicação Intercultural: perspectivas, dilemas e desafios na sociedade pós-moderna',
        professor: 'Maria Aparecida Ferrari',
      },
    ],
  },
  {
    id: 'modulo-4',
    titulo: 'Módulo 4',
    descricao: 'Elaboração do projeto e desenvolvimento da monografia.',
    disciplinas: [
      {
        nome: 'Metodologia da Pesquisa em Comunicação: elaboração do projeto de TCC',
        professor: 'Valéria Castro',
      },
      {
        nome: 'Trabalho de Conclusão de Curso',
        professor: 'atividade supervisionada pelos docentes do curso',
      },
    ],
  },
]

export const trabalhoFinal =
  'A formação inclui a elaboração de uma monografia, desenvolvida com acompanhamento acadêmico e fundamentação metodológica, permitindo aprofundar uma questão relacionada ao campo da Comunicação.'
