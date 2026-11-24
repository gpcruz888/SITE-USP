const CRM_SUBMIT_URL =
  'https://www.maisalunoscrm.app.br/api/public/forms/ab2a87a6-2794-43c9-9d1e-bdc934b585ba/submit'

const ATTRIBUTION_KEYS = ['gclid', 'fbclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
const ATTRIBUTION_STORAGE = 'macrm_attribution'

export interface CrmLead {
  nome: string
  email: string
  whatsapp: string
  consentimento: boolean
  comunicacoes: boolean
}

/** Origem do anúncio (UTM, gclid, fbclid), guardada na sessão para sobreviver à navegação interna. */
export function captureAttribution(): Record<string, string> {
  let attribution: Record<string, string> = {}
  try {
    const params = new URLSearchParams(window.location.search)
    for (const key of ATTRIBUTION_KEYS) {
      const value = params.get(key)
      if (value) attribution[key] = value.slice(0, 255)
    }
    if (Object.keys(attribution).length) sessionStorage.setItem(ATTRIBUTION_STORAGE, JSON.stringify(attribution))
    else attribution = JSON.parse(sessionStorage.getItem(ATTRIBUTION_STORAGE) || '{}') || {}
  } catch {
    // sessionStorage bloqueado: segue só com a URL atual
  }
  return attribution
}

/** Envia o lead ao formulário "Fale com a Secretaria" do CRM Mais Alunos. */
export async function submitCrmLead(lead: CrmLead): Promise<{ ok: true } | { ok: false; error: string }> {
  const attribution = captureAttribution()
  try {
    const response = await fetch(CRM_SUBMIT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        data: {
          nome_lead: lead.nome.trim(),
          email: lead.email.trim(),
          telefone: lead.whatsapp.trim(),
          campo_1: lead.consentimento,
          campo_2: lead.comunicacoes,
        },
        ...(Object.keys(attribution).length ? { attribution } : {}),
      }),
    })
    if (response.ok) return { ok: true }
    const body = await response.json().catch(() => ({}))
    return { ok: false, error: body.detail || body.message || 'Não foi possível enviar. Tente novamente.' }
  } catch {
    return { ok: false, error: 'Não foi possível enviar. Verifique sua conexão e tente novamente.' }
  }
}
