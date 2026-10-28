export const contact = {
  email: 'gestcorp@usp.br',
  whatsappNumber: '5511976135520',
  whatsappLabel: 'WhatsApp:',
  address: 'Av. Prof. Lúcio Martins Rodrigues, 443, Cidade Universitária, São Paulo (SP)',
  department:
    'Departamento de Relações Públicas, Propaganda e Turismo da Escola de Comunicações e Artes da Universidade de São Paulo',
  identification:
    'Gestcorp ECA-USP | Especialização em Gestão Estratégica em Comunicação Organizacional e Relações Públicas',
  privacyPolicyUrl: '/politica-de-privacidade',
  social: {
    linkedin: 'https://www.linkedin.com/company/gestcorp-eca-usp',
    instagram: 'https://www.instagram.com/gestcorp_eca_usp/',
    facebook: 'https://www.facebook.com/gestcorpecausp/',
  },
  ecaUrl: 'https://www.eca.usp.br/',
  updatedAt: '27 de outubro de 2026',
} as const

/** Destino configurável dos CTAs de WhatsApp. Sem número oficial, permanece âncora para o formulário. */
export function getWhatsAppHref(): string {
  if (contact.whatsappNumber) {
    const digits = contact.whatsappNumber.replace(/\D/g, '')
    return `https://wa.me/${digits}`
  }
  return '#turma-2027'
}

export function getWhatsAppTarget(): '_blank' | undefined {
  return contact.whatsappNumber ? '_blank' : undefined
}
