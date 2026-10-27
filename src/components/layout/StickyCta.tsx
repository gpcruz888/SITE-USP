import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { getTurmaAtiva } from '@/data/turma'

export function StickyCta() {
  const [visible, setVisible] = useState(false)
  const turma = getTurmaAtiva()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const form = document.getElementById('turma-2027')
      const formTop = form ? form.getBoundingClientRect().top + y : Number.POSITIVE_INFINITY
      const nearForm = y + window.innerHeight > formTop - 80
      setVisible(y > 520 && !nearForm)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [])

  return (
    <div
      className={['sticky-cta', visible ? 'sticky-cta--visible' : ''].filter(Boolean).join(' ')}
      aria-hidden={!visible}
    >
      <div className="sticky-cta__inner">
        <div className="min-w-0">
          <p className="text-[0.6875rem] font-semibold tracking-[0.12em] text-blue uppercase">
            {turma.status === 'inscricoes_abertas' ? 'Inscrições abertas' : turma.status === 'encerrada' ? 'Inscrições encerradas' : 'Conheça a próxima turma'}
          </p>
          <p className="truncate text-sm font-semibold text-blue-deep md:text-[0.9375rem]">
            Turma {turma.ano} · {turma.investimentoParcelas ?? turma.dataInicioLabel}
          </p>
        </div>
        <Button href="#turma-2027" size="sm" tabIndex={visible ? 0 : -1}>
          Faça sua Matrícula Agora
        </Button>
      </div>
    </div>
  )
}
