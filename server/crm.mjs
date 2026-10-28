export const CRM_FORM_URL = 'https://www.maisalunoscrm.app.br/api/external/forms/3a162091-5cf9-4825-8aac-e60ab1f83a34/submit'

/** Chaves estáveis para o mapeamento do formulário "Eca Site Novo" no CRM. */
export function crmPayload(input, values, source) {
  return {
    data: {
      nome: values.name,
      email: values.email,
      whatsapp: values.phone,
      turma: values.cohort,
      politica_privacidade: 'sim',
      comunicacoes: input.comunicacoes === true ? 'sim' : 'nao',
      imagem: input.imagem === true ? 'sim' : 'nao',
      origem: source,
    },
  }
}

export async function submitCrm(payload, { fetchImpl = fetch, apiKey = process.env.CRM_API_KEY, url = process.env.CRM_FORM_URL || CRM_FORM_URL } = {}) {
  if (!apiKey) return { ok: false, skipped: true }
  try {
    const response = await fetchImpl(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    })
    return { ok: response.ok, status: response.status }
  } catch {
    return { ok: false }
  }
}
