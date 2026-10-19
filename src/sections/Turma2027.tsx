import {
  CalendarDays,
  MapPin,
  Clock,
  GraduationCap,
  Users,
  Wallet,
  FileText,
  Hourglass,
} from 'lucide-react'
import { InterestForm } from '@/components/forms/InterestForm'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { getTurmaAtiva, formatPending } from '@/data/turma'

export function Turma2027() {
  const turma = getTurmaAtiva()

  const primary = [
    { label: 'Início', value: turma.dataInicioLabel, icon: CalendarDays },
    { label: 'Modalidade', value: turma.modalidade, icon: GraduationCap },
    { label: 'Local', value: turma.local, icon: MapPin },
    { label: 'Duração', value: turma.duracao, icon: Clock },
  ]

  const secondary = [
    { label: 'Público elegível', value: turma.publicoElegivel, icon: Users, pending: false },
    { label: 'Horários', value: turma.diasHorarios, icon: Clock, pending: false },
    {
      label: 'Carga horária',
      value: formatPending(turma.cargaHoraria, '[após confirmação do registro oficial]'),
      icon: Hourglass,
      pending: true,
    },
    {
      label: 'Investimento',
      value: formatPending(
        turma.investimento,
        '[após confirmação do valor, do parcelamento e de eventuais taxas]',
      ),
      icon: Wallet,
      pending: true,
    },
    {
      label: 'Inscrições',
      value: formatPending(turma.periodoInscricao, '[somente o período oficialmente autorizado]'),
      icon: FileText,
      pending: true,
    },
  ]

  return (
    <section
      id="turma-2027"
      className="bg-blue py-20 text-white md:py-28"
      aria-labelledby="turma-title"
    >
      <div className="container-site">
        <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Guide arrow desktop */}
          <svg
            className="guide-arrow text-orange"
            style={{ right: '56%', top: '8%', width: 120, height: 80 }}
            viewBox="0 0 120 80"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8 52 C 48 8, 72 12, 108 28"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M98 18 L108 28 L96 34"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="lg:col-span-5">
            <h2
              id="turma-title"
              className="text-[1.75rem] font-medium leading-snug tracking-[-0.03em] text-white md:text-[2.25rem]"
            >
              Gestcorp 2027: informações para planejar sua participação
            </h2>
            <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-cream/80">
              Conheça as principais condições da edição 2027 e avalie como a formação pode se
              integrar à sua rotina profissional.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-4">
              {primary.map((item) => (
                <div
                  key={item.label}
                  className="border border-white/20 bg-blue-dark/40 p-4"
                >
                  <dt className="flex items-center gap-2 text-sm text-cream/60">
                    <Icon icon={item.icon} size={16} className="text-orange" />
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-sm font-medium leading-snug text-white md:text-[0.9375rem]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex items-end gap-4 border-y border-white/20 py-7">
              <div>
                <p className="text-sm text-cream/60">Vagas</p>
                <p className="mt-1 text-5xl font-medium tracking-[-0.04em] text-orange md:text-6xl">
                  {turma.vagas}
                </p>
              </div>
              <p className="mb-2 max-w-xs text-sm leading-relaxed text-cream/65">
                Vagas para a edição presencial 2027 na ECA-USP.
              </p>
            </div>

            <dl className="divide-y divide-white/15">
              {secondary.map((info) => (
                <div
                  key={info.label}
                  className="grid gap-2 py-4 sm:grid-cols-12 sm:items-start sm:gap-4"
                >
                  <dt className="flex items-center gap-2 text-sm text-cream/55 sm:col-span-4">
                    <Icon icon={info.icon} size={15} className="text-orange/80" />
                    {info.label}
                  </dt>
                  <dd
                    className={[
                      'text-sm leading-relaxed sm:col-span-8',
                      info.pending ? 'text-cream/50 italic' : 'text-cream/85',
                    ].join(' ')}
                  >
                    {info.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <Reveal className="lg:col-span-7" delayMs={80}>
            <aside className="form-panel text-graphite">
              <span className="form-panel__dot" aria-hidden="true" />
              <h3 className="text-2xl font-medium tracking-[-0.03em] text-graphite md:text-[1.75rem]">
                Manifeste seu interesse
              </h3>
              <p className="mt-2 mb-8 text-sm leading-relaxed text-graphite-muted md:text-[0.9375rem]">
                Deixe seus dados para receber orientações sobre a turma. O envio ao sistema será
                integrado na etapa administrativa.
              </p>
              <InterestForm conversion />
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
