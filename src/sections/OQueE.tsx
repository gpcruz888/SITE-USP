import {
  ClipboardList,
  Landmark,
  Building2,
  Megaphone,
  Search,
  Shield,
  Users,
} from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { useInView } from '@/hooks/useInView'

const eixos = [
  { label: 'Planejamento', icon: ClipboardList },
  { label: 'Governança', icon: Landmark },
  { label: 'Cultura organizacional', icon: Building2 },
  { label: 'Comunicação pública', icon: Megaphone },
  { label: 'Pesquisa', icon: Search },
  { label: 'Reputação', icon: Shield },
  { label: 'Organizações e sociedade', icon: Users },
] as const

export function OQueE() {
  const circle = useInView()

  return (
    <section id="o-curso" className="bg-white py-20 md:py-28" aria-labelledby="o-curso-title">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <div ref={circle.ref} className="relative inline-flex items-center justify-center">
              <svg
                className="absolute h-[9.5rem] w-[9.5rem] text-blue md:h-[11rem] md:w-[11rem]"
                viewBox="0 0 120 120"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  className={['draw-circle', circle.inView ? 'is-visible' : ''].join(' ')}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              <span
                className="relative z-10 font-medium text-[5.5rem] leading-none tracking-[-0.05em] text-blue md:text-[6.5rem]"
                aria-hidden="true"
              >
                99
              </span>
            </div>
            <div className="mt-6 h-px w-12 origin-left bg-orange" aria-hidden="true" />
            <h2
              id="o-curso-title"
              className="mt-5 text-[1.875rem] font-medium leading-snug tracking-[-0.03em] text-graphite md:text-[2.125rem]"
            >
              Uma formação dedicada à gestão estratégica da Comunicação desde 1999
            </h2>
          </div>

          <div className="lg:col-span-8">
            <p className="max-w-3xl border-b border-border pb-8 text-[1.25rem] leading-relaxed font-medium tracking-[-0.02em] text-blue md:text-[1.3125rem]">
              O Gestcorp é a Especialização em Gestão Estratégica em Comunicação Organizacional e
              Relações Públicas da Escola de Comunicações e Artes da Universidade de São Paulo
              (ECA-USP). &quot;Gestcorp&quot; é a forma curta do nome do curso.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-10">
              <p className="text-[1.0625rem] leading-relaxed text-graphite-muted md:text-lg">
                Criado em 1999, o curso articula fundamentos científicos, reflexão crítica e questões
                contemporâneas da gestão da Comunicação nas organizações. Sua proposta abrange
                diferentes contextos de atuação, incluindo empresas privadas, instituições públicas e
                organizações do terceiro setor.
              </p>
              <p className="text-[1.0625rem] leading-relaxed text-graphite-muted md:text-lg">
                Ao longo da formação, os profissionais aprofundam conhecimentos sobre planejamento,
                governança, cultura organizacional, comunicação pública, pesquisa, reputação e
                relações entre organizações e sociedade.
              </p>
            </div>

            <ul className="mt-10 grid gap-1 sm:grid-cols-2" aria-label="Eixos de aprofundamento">
              {eixos.map((eixo, index) => (
                <Reveal key={eixo.label} as="li" delayMs={index * 40}>
                  <div className="group flex items-center gap-3 border-b border-border-subtle px-2 py-3.5 transition-colors hover:bg-blue/[0.04]">
                    <Icon
                      icon={eixo.icon}
                      size={18}
                      className="icon-nudge text-blue"
                    />
                    <span className="text-[0.9375rem] font-medium text-graphite">{eixo.label}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
