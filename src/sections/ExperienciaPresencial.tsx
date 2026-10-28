import { MapPin, Clock, Users, Building2 } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { UspSeal } from '@/components/ui/UspSeal'
import { Reveal } from '@/components/ui/Reveal'

const infos = [
  {
    label: 'Local',
    value: 'Aulas presenciais na ECA-USP, Cidade Universitária',
    icon: MapPin,
  },
  {
    label: 'Rotina',
    value:
      'Encontros às segundas e quartas-feiras, das 19h às 22h30, sujeitos à confirmação do calendário',
    icon: Clock,
  },
  {
    label: 'Docência',
    value: 'Professores de diferentes áreas do conhecimento',
    icon: Users,
  },
  {
    label: 'Convivência',
    value:
      'Convivência com profissionais de empresas, instituições públicas e organizações do terceiro setor',
    icon: Building2,
  },
] as const

export function ExperienciaPresencial() {
  return (
    <section
      id="experiencia"
      className="experience-section relative bg-cream-light py-20 md:py-28"
      aria-labelledby="experiencia-title"
    >
      <UspSeal />
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold tracking-[0.14em] text-blue uppercase">
              Experiência
            </p>
            <h2 id="experiencia-title" className="text-title-md mt-4 text-blue-deep">
              O conhecimento também se constrói no encontro
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-graphite-muted">
              Segundas e quartas, na Cidade Universitária — debate em sala, professores da USP e
              profissionais de diferentes organizações.
            </p>
          </div>

          <ul className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
            {infos.map((item, index) => (
              <Reveal key={item.label} as="li" delayMs={index * 60}>
                <div>
                  <Icon icon={item.icon} size={22} className="text-blue" />
                  <h3 className="mt-4 text-lg font-bold tracking-[-0.02em] text-blue-deep">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-graphite-muted">
                    {item.value}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
