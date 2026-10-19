import { MapPin, Clock, Users, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { MediaFrame } from '@/components/ui/MediaFrame'
import { Icon } from '@/components/ui/Icon'
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
      className="bg-cream-warm py-20 md:py-28"
      aria-labelledby="experiencia-title"
    >
      <div className="container-site">
        <div className="max-w-3xl">
          <p className="text-[1.0625rem] font-medium text-blue md:text-lg">
            Segundas e quartas, na Cidade Universitária.
          </p>
          <p className="mt-2 text-[1.0625rem] leading-relaxed text-graphite-muted">
            Debate em sala · Professores e pesquisadores da USP · Profissionais de diferentes
            organizações · ECA-USP, Cidade Universitária
          </p>
          <h2 id="experiencia-title" className="text-title-md mt-6 text-graphite">
            O conhecimento também se constrói no encontro
          </h2>
        </div>

        <div className="relative mt-12 lg:mt-16">
          <div className="media-zoom lg:w-[60%]">
            <MediaFrame
              label="Experiência presencial"
              caption="ECA-USP · Cidade Universitária"
              mark="ECA"
              variant="wide"
              className="w-full min-h-[16rem] md:min-h-[22rem]"
            />
          </div>

          <span
            className="absolute top-[42%] left-[56%] z-20 hidden h-3 w-3 rounded-full bg-orange lg:block"
            aria-hidden="true"
          />

          <Reveal className="relative z-10 mx-4 -mt-10 bg-white p-6 shadow-[0_0_0_1px_var(--color-border)] md:mx-0 md:-mt-16 md:ml-auto md:max-w-xl md:p-10 lg:absolute lg:top-12 lg:right-0 lg:mt-0 lg:ml-0 lg:w-[48%]">
            <div className="space-y-5 text-[1.0625rem] leading-relaxed text-graphite-muted md:text-lg">
              <p className="text-graphite">
                A experiência presencial no Gestcorp coloca profissionais de diferentes trajetórias
                em contato com professores, pesquisadores e perspectivas diversas sobre a
                Comunicação.
              </p>
              <p>
                Aulas, leituras, discussões e atividades acadêmicas ampliam a oportunidade de
                relacionar os conteúdos do curso aos desafios encontrados nas organizações. As trocas
                em sala permitem conhecer outras realidades profissionais, confrontar interpretações
                e desenvolver novas perguntas sobre situações que fazem parte da rotina de trabalho.
              </p>
            </div>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-6 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {infos.map((item, index) => (
            <Reveal key={item.label} as="li" delayMs={index * 70}>
              <div className="group flex gap-3 lg:flex-col lg:gap-2">
                <Icon icon={item.icon} size={18} className="icon-nudge mt-0.5 text-orange" />
                <div>
                  <span className="text-sm text-graphite-light">{item.label}</span>
                  <p className="mt-1 text-sm leading-relaxed font-medium text-graphite md:text-[0.9375rem]">
                    {item.value}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <div className="mt-10">
          <Button href="#programa" variant="secondary" size="lg">
            Saber mais sobre as aulas
          </Button>
        </div>
      </div>
    </section>
  )
}
