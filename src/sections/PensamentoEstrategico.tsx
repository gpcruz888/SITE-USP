import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { UspSeal } from '@/components/ui/UspSeal'
import { Icon } from '@/components/ui/Icon'

export function PensamentoEstrategico() {
  return (
    <section
      id="pensamento"
      className="strategy-section relative bg-blue py-16 text-white md:py-20"
      aria-labelledby="pensamento-title"
    >
      <UspSeal tone="dark" />
      <div className="container-site">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h2 id="pensamento-title" className="text-display text-white">
              Mais informação não dispensa critério.
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-[1.0625rem] leading-relaxed text-white/85 md:text-lg">
              Comunicar exige técnica. Decidir exige compreender o contexto. O Gestcorp propõe
              aprofundar como diferentes conhecimentos contribuem para analisar os desafios da
              Comunicação e fundamentar decisões.
            </p>
            <div className="mt-8">
              <Button href="#programa" variant="outline-light" size="lg" className="group/cta">
                Ver o programa
                <Icon
                  icon={ArrowRight}
                  size={18}
                  strokeWidth={2}
                  className="transition-transform duration-200 group-hover/cta:translate-x-0.5"
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
