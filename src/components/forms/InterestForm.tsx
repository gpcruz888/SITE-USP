import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { getTurmaAtiva, turmas } from '@/data/turma'

type FormStatus = 'idle' | 'loading' | 'integration_pending' | 'error'

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
}: {
  className?: string
  conversion?: boolean
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
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  function updateField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
    setStatus('idle')
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

    // Integração com backend pendente (etapa administrativa futura).
    // Payload preparado: { ...values, origem: 'home', createdAt: ISO }
    await new Promise((resolve) => setTimeout(resolve, 700))
    setStatus('integration_pending')
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
        <Button type="submit" size="lg" disabled={status === 'loading'} className="w-full">
          {status === 'loading' ? 'Enviando…' : 'Enviar interesse'}
        </Button>
      </div>

      <p
        id="form-status"
        className="text-xs leading-relaxed text-graphite-light"
        role="status"
        aria-live="polite"
      >
        {status === 'integration_pending' && (
          <span className="text-blue font-medium">
            Seus dados foram validados na interface. O envio ao sistema ainda não está disponível —
            integração pendente da etapa administrativa.
          </span>
        )}
        {status === 'error' && Object.keys(errors).length > 0 && (
          <span className="text-orange-dark">
            Revise os campos destacados antes de continuar.
          </span>
        )}
        {status === 'idle' && (
          <>O envio será conectado ao painel administrativo em uma etapa posterior.</>
        )}
      </p>
    </form>
  )
}

