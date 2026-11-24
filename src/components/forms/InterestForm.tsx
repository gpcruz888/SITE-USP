import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2, X } from 'lucide-react'
import { captureAttribution, submitCrmLead } from '@/lib/crm'
import { Button } from '@/components/ui/Button'
import { getTurmaAtiva, turmas } from '@/data/turma'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

interface FormValues {
  nome: string
  email: string
  whatsapp: string
  turmaId: string
  consentimento: boolean
  comunicacoes: boolean
  imagem: boolean
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
    errors.consentimento = 'Confirme que você leu a Política de Privacidade.'
  }

  return errors
}

function createInitialValues(turmaId: string): FormValues {
  return {
    nome: '',
    email: '',
    whatsapp: '',
    turmaId,
    consentimento: false,
    comunicacoes: false,
    imagem: false,
  }
}

let supportsDisplayTransition: boolean | undefined

function canTransitionDisplay(): boolean {
  if (supportsDisplayTransition !== undefined) return supportsDisplayTransition
  if (!window.CSS?.supports?.('transition-behavior', 'allow-discrete') || !document.body) {
    return false
  }
  const probe = document.createElement('div')
  probe.style.cssText = 'transition: display 1s allow-discrete !important; display: block;'
  document.body.appendChild(probe)
  getComputedStyle(probe).display
  probe.style.display = 'none'
  supportsDisplayTransition = getComputedStyle(probe).display === 'block'
  probe.remove()
  return supportsDisplayTransition
}

function supportsTopLayerExit(): boolean {
  return Boolean(window.CSS?.supports?.('overlay', 'auto')) && canTransitionDisplay()
}

async function closeTopLayer(dialog: HTMLDialogElement): Promise<void> {
  if (!dialog.open) return
  if (!supportsTopLayerExit()) {
    dialog.setAttribute('data-closing', '')
    const animations = dialog.getAnimations({ subtree: true })
    if (animations.length > 0) {
      await Promise.race([
        Promise.allSettled(animations.map((animation) => animation.finished)),
        new Promise((resolve) => window.setTimeout(resolve, 500)),
      ])
    }
    if (!dialog.hasAttribute('data-closing')) return
    dialog.removeAttribute('data-closing')
  }
  dialog.close()
}

export function InterestForm({
  className = '',
  conversion = false,
  applicationProcessId,
  masterclass = false,
}: {
  className?: string
  conversion?: boolean
  applicationProcessId?: string
  masterclass?: boolean
}) {
  const turmaAtiva = getTurmaAtiva()
  const [values, setValues] = useState<FormValues>(() => createInitialValues(turmaAtiva.id))
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [serverMessage, setServerMessage] = useState('')
  const [submittedFirstName, setSubmittedFirstName] = useState('')
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const dialogRef = useRef<HTMLDialogElement>(null)
  const resetTimerRef = useRef<number | null>(null)
  const dialogTitleId = useId()

  const clearResetTimer = useCallback(() => {
    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current)
      resetTimerRef.current = null
    }
  }, [])

  const scheduleSuccessReset = useCallback(() => {
    clearResetTimer()
    resetTimerRef.current = window.setTimeout(() => {
      setStatus((prev) => (prev === 'success' ? 'idle' : prev))
      setServerMessage('')
      resetTimerRef.current = null
    }, 5000)
  }, [clearResetTimer])

  const dismissDialog = useCallback(() => {
    if (dialogRef.current) {
      void closeTopLayer(dialogRef.current)
    }
  }, [])

  useEffect(() => {
    captureAttribution()
    return () => clearResetTimer()
  }, [clearResetTimer])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleCancel = (event: Event) => {
      event.preventDefault()
      void closeTopLayer(dialog)
    }

    const handleClose = () => {
      dialog.returnValue = ''
      scheduleSuccessReset()
    }

    dialog.addEventListener('cancel', handleCancel)
    dialog.addEventListener('close', handleClose)

    if ('closedBy' in HTMLDialogElement.prototype) {
      return () => {
        dialog.removeEventListener('cancel', handleCancel)
        dialog.removeEventListener('close', handleClose)
      }
    }

    const isOutside = (event: PointerEvent) => {
      const rect = dialog.getBoundingClientRect()
      return (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      )
    }

    let pressedOutside = false
    const handlePointerDown = (event: PointerEvent) => {
      pressedOutside = isOutside(event)
    }
    const handlePointerUp = (event: PointerEvent) => {
      if (pressedOutside && isOutside(event)) {
        void closeTopLayer(dialog)
      }
      pressedOutside = false
    }

    dialog.addEventListener('pointerdown', handlePointerDown)
    dialog.addEventListener('pointerup', handlePointerUp)

    return () => {
      dialog.removeEventListener('cancel', handleCancel)
      dialog.removeEventListener('close', handleClose)
      dialog.removeEventListener('pointerdown', handlePointerDown)
      dialog.removeEventListener('pointerup', handlePointerUp)
    }
  }, [scheduleSuccessReset])

  function updateField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    clearResetTimer()
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

    clearResetTimer()
    setStatus('loading')
    setServerMessage('')

    const firstName = values.nome.trim().split(/\s+/)[0] || ''
    const result = await submitCrmLead(values)
    if (result.ok) {
      setSubmittedFirstName(firstName)
      setValues(createInitialValues(turmaAtiva.id))
      setErrors({})
      setTouched({})
      setServerMessage(
        applicationProcessId
          ? 'Solicitação recebida. A equipe acompanhará sua inscrição.'
          : 'Interesse recebido. Em breve, a equipe entrará em contato.',
      )
      setStatus('success')
      if (dialogRef.current && !dialogRef.current.open) {
        dialogRef.current.showModal()
      }
    } else {
      setServerMessage(result.error)
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
    <>
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
            aria-required="true"
          />
          <span className="min-w-0 text-pretty">
            Li e estou ciente da{' '}
            <a
              href="/politica-de-privacidade"
              className="underline underline-offset-2"
              onClick={(event) => event.stopPropagation()}
            >
              Política de Privacidade
            </a>{' '}
            do Gestcorp ECA-USP.*
          </span>
        </label>
        {touched.consentimento && errors.consentimento && (
          <p className="mt-1.5 text-xs text-orange-dark" role="alert">
            {errors.consentimento}
          </p>
        )}
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-graphite-muted">
          <input
            type="checkbox"
            name="comunicacoes"
            className="mt-0.5 h-4 w-4 shrink-0 rounded-none accent-blue"
            checked={values.comunicacoes}
            onChange={(e) => updateField('comunicacoes', e.target.checked)}
          />
          <span className="min-w-0 text-pretty">
            Aceito receber do Gestcorp ECA-USP informações sobre turmas, eventos e Masterclasses por
            e-mail e WhatsApp.
          </span>
        </label>
      </div>

      {masterclass ? (
        <div>
          <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-graphite-muted">
            <input
              type="checkbox"
              name="imagem"
              className="mt-0.5 h-4 w-4 shrink-0 rounded-none accent-blue"
              checked={values.imagem}
              onChange={(e) => updateField('imagem', e.target.checked)}
            />
            <span className="min-w-0 text-pretty">
              Autorizo o uso da minha imagem em fotos e vídeos do evento, para divulgação institucional
              do Gestcorp ECA-USP.
            </span>
          </label>
        </div>
      ) : null}

      <p className="text-xs leading-relaxed text-graphite-muted">
        Você pode cancelar o recebimento dessas comunicações quando quiser. Para saber como tratamos
        seus dados e como exercer seus direitos, consulte nossa{' '}
        <a href="/politica-de-privacidade" className="underline underline-offset-2">
          Política de Privacidade
        </a>
        .
      </p>

      <div className="pt-2">
        <Button
          type="submit"
          size="lg"
          variant={status === 'success' ? 'success' : 'primary'}
          disabled={status === 'loading' || status === 'success'}
          className="w-full"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span>Enviando…</span>
            </>
          ) : status === 'success' ? (
            <>
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              <span>Enviado com sucesso</span>
            </>
          ) : applicationProcessId ? (
            'Enviar inscrição'
          ) : conversion ? (
            'Garanta sua Matrícula'
          ) : (
            'Enviar interesse'
          )}
        </Button>
      </div>

      <div
        id="form-status"
        className="text-xs leading-relaxed text-graphite-light"
        role="status"
        aria-live="polite"
      >
        {status === 'success' && (
          <div className="flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs font-medium text-emerald-900">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
            <span>{serverMessage}</span>
          </div>
        )}
        {status === 'error' && (
          <p className="text-orange-dark">
            {serverMessage || 'Revise os campos destacados antes de continuar.'}
          </p>
        )}
        {status === 'idle' && (
          <p>Seus dados serão usados pela equipe para acompanhar seu interesse na formação.</p>
        )}
      </div>
      {!applicationProcessId && <a href="/inscricao" className="inline-flex text-xs font-medium text-blue underline-offset-4 hover:underline">Consultar processos com inscrições abertas →</a>}
      </form>

      <dialog
        ref={dialogRef}
        className="site-dialog"
        aria-labelledby={dialogTitleId}
        {...({ closedby: 'any' } as Record<string, string>)}
      >
        <div className="relative p-6 text-center sm:p-7">
          <button
            type="button"
            onClick={dismissDialog}
            aria-label="Fechar aviso"
            className="absolute top-4 right-4 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-graphite-muted transition-colors hover:bg-cream-light hover:text-blue-deep"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50">
            <CheckCircle2 className="h-7 w-7 text-emerald-700" aria-hidden="true" />
          </div>

          <h1 id={dialogTitleId} className="text-xl font-bold tracking-tight text-blue-deep">
            {applicationProcessId ? 'Inscrição enviada com sucesso' : 'Mensagem enviada com sucesso'}
          </h1>

          <p className="mt-2.5 text-sm leading-relaxed text-graphite-muted">
            {submittedFirstName ? `Obrigado, ${submittedFirstName}! ` : ''}
            {serverMessage || 'Recebemos seus dados. Em breve, nossa equipe entrará em contato por e-mail ou WhatsApp.'}
          </p>

          <Button
            type="button"
            variant="secondary"
            size="md"
            autoFocus
            onClick={dismissDialog}
            className="mt-6 w-full"
          >
            Entendi
          </Button>
        </div>
      </dialog>
    </>
  )
}

