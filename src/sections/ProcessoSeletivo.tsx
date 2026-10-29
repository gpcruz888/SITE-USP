import {
  CalendarDays,
  ClipboardCheck,
  MessageCircle,
  UserRoundCheck,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { UspSeal } from '@/components/ui/UspSeal'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { getWhatsAppHref, getWhatsAppTarget } from '@/data/contact'

const etapas: {
  title: string
  text: string
  icon: LucideIcon
}[] = [
  {
    icon: MessageCircle,
    title: 'Conheça as informações da turma',
    text: 'Fale com a Secretaria do Gestcorp para esclarecer dúvidas sobre programa, rotina, investimento e ingresso.',
  },
  {
    icon: CalendarDays,
    title: 'Consulte o período de inscrição',
    text: 'Confira o calendário oficial, os requisitos e a documentação exigida para a turma.',
  },
  {
    icon: ClipboardCheck,
    title: 'Faça sua inscrição no canal indicado',
    text: 'No período autorizado, siga as orientações de cadastro e envio da documentação.',
  },
  {
    icon: UserRoundCheck,
    title: 'Acompanhe a seleção e a matrícula',
    text: 'A seleção analisa currículo e documentos. Depois, a Secretaria orienta a matrícula.',
  },
]

export function ProcessoSeletivo() {
  return (
    <section
      id="processo"
      className="admissions-section relative bg-cream-warm py-20 md:py-28"
      aria-labelledby="processo-title"
    >
      <UspSeal />
      <div className="container-site">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.14em] text-blue uppercase">
            Processo seletivo
          </p>
          <h2 id="processo-title" className="text-title-md mt-4 text-blue-deep">
            Como participar do processo seletivo
          </h2>
        </div>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {etapas.map((etapa, index) => (
            <Reveal key={etapa.title} as="li" delayMs={70 + index * 70}>
              <article className="soft-card flex h-full flex-col">
                <span className="soft-card__badge" aria-hidden="true">
                  <Icon icon={etapa.icon} size={16} strokeWidth={2} />
                </span>
                <span className="text-xs font-bold tracking-[0.08em] text-blue tabular-nums uppercase">
                  Etapa {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-lg font-bold leading-snug tracking-[-0.02em] text-blue-deep">
                  {etapa.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-graphite-muted">
                  {etapa.text}
                </p>
              </article>
            </Reveal>
          ))}
        </ol>

        <div className="mt-10">
          <Button
            href={getWhatsAppHref()}
            target={getWhatsAppTarget()}
            rel={getWhatsAppTarget() ? 'noopener noreferrer' : undefined}
            data-macrm-wa-btn=""
            data-location="processo"
            size="lg"
          >
            Faça sua matrícula
          </Button>
        </div>
      </div>
    </section>
  )
}
