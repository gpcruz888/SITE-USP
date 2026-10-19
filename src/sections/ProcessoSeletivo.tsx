import { BookOpen, CalendarDays, FileCheck, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { useInView } from '@/hooks/useInView'
import { getWhatsAppHref, getWhatsAppTarget } from '@/data/contact'

const etapas = [
  {
    title: 'Conheça as informações da turma.',
    text: 'Entre em contato com a Secretaria do Gestcorp para esclarecer dúvidas sobre programa, rotina acadêmica, investimento e condições de ingresso.',
    icon: BookOpen,
  },
  {
    title: 'Consulte o período oficial de inscrição.',
    text: 'Confira o calendário atualizado, os requisitos e a documentação exigida.',
    icon: CalendarDays,
  },
  {
    title: 'Faça sua inscrição no canal indicado pela instituição.',
    text: 'Durante o período oficialmente autorizado, siga as orientações de cadastro e envio da documentação.',
    icon: FileCheck,
  },
  {
    title: 'Acompanhe a seleção e a matrícula.',
    text: 'O processo registrado para a turma 2027 considera a análise de currículo e documentação. Após a seleção, a Secretaria orienta os candidatos aprovados sobre as etapas de matrícula.',
    icon: GraduationCap,
  },
] as const

export function ProcessoSeletivo() {
  const line = useInView()

  return (
    <section
      id="processo"
      className="bg-blue-dark py-20 text-white md:py-28"
      aria-labelledby="processo-title"
    >
      <div className="container-site">
        <h2 id="processo-title" className="text-title-md max-w-3xl text-white">
          Como participar do processo seletivo
        </h2>

        <div ref={line.ref} className="relative mt-12 md:mt-16">
          <div
            className={[
              'draw-line absolute top-3 right-0 left-0 hidden h-px bg-white/30 lg:block',
              line.inView ? 'is-visible' : '',
            ].join(' ')}
            aria-hidden="true"
          />
          <div
            className={[
              'draw-line-y absolute top-0 bottom-0 left-3 w-px bg-white/30 lg:hidden',
              line.inView ? 'is-visible' : '',
            ].join(' ')}
            aria-hidden="true"
          />

          <ol className="grid gap-8 lg:grid-cols-4 lg:gap-6">
            {etapas.map((etapa, index) => (
              <Reveal key={etapa.title} as="li" delayMs={100 + index * 100}>
                <div className="group relative pl-10 transition-colors duration-250 lg:pl-0 lg:pt-8">
                  <span
                    className="absolute top-1 left-1.5 h-3 w-3 rounded-full bg-orange lg:top-1.5 lg:left-0"
                    aria-hidden="true"
                  />
                  <Icon
                    icon={etapa.icon}
                    size={22}
                    className="icon-nudge mb-4 text-orange"
                  />
                  <span
                    className="mb-4 block text-4xl font-medium tracking-[-0.04em] text-white/30 tabular-nums md:text-5xl"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-medium leading-snug tracking-[-0.03em] text-white md:text-xl">
                    <span className="sr-only">Etapa {index + 1}. </span>
                    {etapa.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-cream/70">{etapa.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="mt-12">
          <Button
            href={getWhatsAppHref()}
            target={getWhatsAppTarget()}
            rel={getWhatsAppTarget() ? 'noopener noreferrer' : undefined}
            variant="inverse"
            size="lg"
          >
            Falar com a Secretaria
          </Button>
        </div>
      </div>
    </section>
  )
}
