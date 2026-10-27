import { useState, type FormEvent } from 'react'
import { mutate } from '@/lib/api'
import { Button } from '@/components/ui/Button'
import { getTurmaAtiva, turmas } from '@/data/turma'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

interface FormValues {
  nome: string
  email: string
  whatsapp: string
  turmaId: string
  consentimento: boolean
}

interface FormErrors {
  nome?: string
  email?: string
  whatsapp?: string
  turmaId?: string
  consentimento?: string
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^[\d\s()+-]{10,20}$/

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.nome.trim() || values.nome.trim().length < 3) {
    errors.nome = 'Informe seu nome completo.'
  }
  if (!values.email.trim() || !emailRegex.test(values.email.trim())) {
    errors.email = 'Informe um e-mail válido.'
  }
  if (!values.whatsapp.trim() || !phoneRegex.test(values.whatsapp.trim())) {
    errors.whatsapp = 'Informe um WhatsApp válido com DDD.'
  }
  if (!values.turmaId) {
    errors.turmaId = 'Selecione a turma de interesse.'
  }
  if (!values.consentimento) {
    errors.consentimento = 'É necessário consentir com o tratamento dos dados.'
  }

  return errors
}

export function InterestForm({
  className = '',
  conversion = false,
  applicationProcessId,
}: {
  className?: string
  conversion?: boolean
  applicationProcessId?: string
}) {
  const turmaAtiva = getTurmaAtiva()
  const [values, setValues] = useState<FormValues>({
    nome: '',
    email: '',
    whatsapp: '',
    turmaId: turmaAtiva.id,
    consentimento: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [serverMessage, setServerMessage] = useState('')
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  function updateField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
    setStatus('idle')
    setServerMessage('')
  }

  function handleBlur(field: keyof FormValues) {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors(validate({ ...values }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    setTouched({
      nome: true,
      email: true,
      whatsapp: true,
      turmaId: true,
      consentimento: true,
    })

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error')
      return
    }

    setStatus('loading')

    setServerMessage('')
    try {
      const result = await mutate<{ message: string }>(
        applicationProcessId ? '/public/applications' : '/public/interests',
        'POST',
        { ...values, ...(applicationProcessId ? { process_id: applicationProcessId } : {}) },
      )
      setServerMessage(result.message)
      setStatus('success')
    } catch (error) {
      setServerMessage(error instanceof Error ? error.message : 'Não foi possível enviar. Tente novamente.')
      setStatus('error')
    }
  }

  const fieldClass = conversion
    ? 'w-full min-h-12 rounded-xl border border-border bg-cream-light px-4 py-3 text-base text-graphite transition-colors placeholder:text-graphite-muted/60 focus:border-blue focus:outline-2 focus:outline-offset-0 focus:outline-blue'
    : 'w-full rounded-xl border border-border bg-cream-light px-4 py-3 text-[0.9375rem] text-graphite transition-colors placeholder:text-graphite-muted/60 focus:border-blue focus:bg-cream-warm focus:outline-none'

  const labelClass = conversion
    ? 'mb-2 block text-sm font-medium text-blue-deep'
    : 'mb-1.5 block text-sm font-medium text-graphite-muted'

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={['space-y-5', className].join(' ')}
      aria-describedby="form-status"
    >
      <div>
        <label htmlFor="lead-nome" className={labelClass}>
          Nome completo
        </label>
        <input
          id="lead-nome"
          name="nome"
          type="text"
          autoComplete="name"
          className={fieldClass}
          value={values.nome}
          onChange={(e) => updateField('nome', e.target.value)}
          onBlur={() => handleBlur('nome')}
          aria-invalid={touched.nome && !!errors.nome}
          aria-describedby={errors.nome ? 'lead-nome-error' : undefined}
        />
        {touched.nome && errors.nome && (
          <p id="lead-nome-error" className="mt-1.5 text-xs text-orange-dark" role="alert">
            {errors.nome}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="lead-email" className={labelClass}>
          E-mail
        </label>
        <input
          id="lead-email"
          name="email"
          type="email"
          autoComplete="email"
          className={fieldClass}
          value={values.email}
          onChange={(e) => updateField('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          aria-invalid={touched.email && !!errors.email}
          aria-describedby={errors.email ? 'lead-email-error' : undefined}
        />
        {touched.email && errors.email && (
          <p id="lead-email-error" className="mt-1.5 text-xs text-orange-dark" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="lead-whatsapp" className={labelClass}>
          WhatsApp
        </label>
        <input
          id="lead-whatsapp"
          name="whatsapp"
          type="tel"
          autoComplete="tel"
          placeholder="(11) 90000-0000"
          className={fieldClass}
          value={values.whatsapp}
          onChange={(e) => updateField('whatsapp', e.target.value)}
          onBlur={() => handleBlur('whatsapp')}
          aria-invalid={touched.whatsapp && !!errors.whatsapp}
          aria-describedby={errors.whatsapp ? 'lead-whatsapp-error' : undefined}
        />
        {touched.whatsapp && errors.whatsapp && (
          <p id="lead-whatsapp-error" className="mt-1.5 text-xs text-orange-dark" role="alert">
            {errors.whatsapp}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="lead-turma" className={labelClass}>
          Turma de interesse
        </label>
        <select
          id="lead-turma"
          name="turmaId"
          className={fieldClass}
          value={values.turmaId}
          onChange={(e) => updateField('turmaId', e.target.value)}
          onBlur={() => handleBlur('turmaId')}
          aria-invalid={touched.turmaId && !!errors.turmaId}
        >
          {turmas.map((turma) => (
            <option key={turma.id} value={turma.id}>
              {turma.nome}
            </option>
          ))}
        </select>
        {touched.turmaId && errors.turmaId && (
          <p className="mt-1.5 text-xs text-orange-dark" role="alert">
            {errors.turmaId}
          </p>
        )}
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-graphite-muted">
          <input
            type="checkbox"
            name="consentimento"
            className="mt-0.5 h-4 w-4 shrink-0 rounded-none accent-blue"
            checked={values.consentimento}
            onChange={(e) => updateField('consentimento', e.target.checked)}
            onBlur={() => handleBlur('consentimento')}
            aria-invalid={touched.consentimento && !!errors.consentimento}
          />
          <span className="min-w-0 text-pretty">
            Autorizo o Gestcorp ECA-USP a tratar meus dados para contato sobre a especialização e
            turmas de interesse, conforme a legislação aplicável.
          </span>
        </label>
        {touched.consentimento && errors.consentimento && (
          <p className="mt-1.5 text-xs text-orange-dark" role="alert">
            {errors.consentimento}
          </p>
        )}
      </div>

      <div className="pt-2">
        <Button type="submit" size="lg" disabled={status === 'loading' || status === 'success'} className="w-full">
          {status === 'loading' ? 'Enviando…' : status === 'success' ? 'Enviado com sucesso' : applicationProcessId ? 'Enviar inscrição' : conversion ? 'Garanta sua Matrícula' : 'Enviar interesse'}
        </Button>
      </div>

      <p
        id="form-status"
        className="text-xs leading-relaxed text-graphite-light"
        role="status"
        aria-live="polite"
      >
        {status === 'success' && (
          <span className="text-blue font-medium">
            {serverMessage}
          </span>
        )}
        {status === 'error' && (
          <span className="text-orange-dark">
            {serverMessage || 'Revise os campos destacados antes de continuar.'}
          </span>
        )}
        {status === 'idle' && (
          <>Seus dados serão usados pela equipe para acompanhar seu interesse na formação.</>
        )}
      </p>
      {!applicationProcessId && <a href="/inscricao" className="inline-flex text-xs font-medium text-blue underline-offset-4 hover:underline">Consultar processos com inscrições abertas →</a>}
    </form>
  )
}

