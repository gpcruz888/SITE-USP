import { CalendarDays, MapPin, Users, Clock3 } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { getTurmaAtiva } from '@/data/turma'

export function HeroHighlight() {
  const turma = getTurmaAtiva()

  const stats = [
    { value: turma.dataInicioLabel, label: 'Início previsto', icon: CalendarDays },
    { value: 'Presencial', label: 'ECA-USP · Cidade Universitária', icon: MapPin },
    { value: `${turma.vagas} vagas`, label: 'Turma 2027', icon: Users },
    { value: '2 anos', label: 'Duração da formação', icon: Clock3 },
  ]

  return (
    <div className="hero-bridge" aria-label="Informações da turma 2027">
      <div className="container-site">
        <div className="hero-stat-panel">
        <div className="hero-stat-inner">
          <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {stats.map((item, index) => (
              <div
                key={item.label}
                className={[
                  'hero-stat-item lg:px-6',
                  index === 0 ? 'lg:pl-0' : '',
                  index === stats.length - 1 ? 'lg:pr-0' : '',
                  index > 0 ? 'lg:border-l lg:border-blue-deep/15' : '',
                ].join(' ')}
              >
                <span className="hero-stat-icon" style={{ animationDelay: `${index * 90}ms` }} aria-hidden="true">
                  <Icon icon={item.icon} size={20} strokeWidth={1.7} />
                </span>
                <dd className="text-xl font-bold tracking-[-0.03em] text-blue-deep md:text-[1.5rem]">
                  {item.value}
                </dd>
                <dt className="mt-1 text-sm text-graphite-muted">{item.label}</dt>
              </div>
            ))}
          </dl>
        </div>
        </div>
      </div>
    </div>
  )
}
