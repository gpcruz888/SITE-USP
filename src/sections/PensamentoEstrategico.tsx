import { Search, Map, Link2, Scale, Compass } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { useInView } from '@/hooks/useInView'

const sequencia = [
  { title: 'Analisar', icon: Search },
  { title: 'Contextualizar', icon: Map },
  { title: 'Relacionar', icon: Link2 },
  { title: 'Fundamentar', icon: Scale },
  { title: 'Decidir', icon: Compass },
] as const

export function PensamentoEstrategico() {
  const line = useInView()

  return (
    <section
      id="pensamento"
      className="relative overflow-hidden bg-blue-deep py-20 text-cream md:py-28"
      aria-labelledby="pensamento-title"
    >
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-[28rem] w-[28rem] rounded-full border border-white/10 opacity-40"
        aria-hidden="true"
      />

      <div className="container-site relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="text-display-lg max-w-3xl text-cream">
              Mais informação não dispensa critério.
            </p>
            <h2 id="pensamento-title" className="text-title mt-8 text-cream/90">
              Comunicar exige técnica. Decidir exige compreender o contexto.
            </h2>
          </div>
          <div className="space-y-5 text-[1.0625rem] leading-relaxed text-cream/80 md:text-lg lg:col-span-5 lg:pt-2">
            <p>
              Uma estratégia de Comunicação envolve escolhas: quais públicos considerar, que
              informações investigar, quais riscos antecipar e como avaliar os resultados. Essas
              perguntas não pertencem a uma única disciplina.
            </p>
            <p>
              Elas exigem relacionar Comunicação Organizacional, Relações Públicas, pesquisa,
              gestão, cultura, política, ética e transformações sociais. O Gestcorp propõe esse
              aprofundamento: compreender como diferentes conhecimentos contribuem para analisar os
              desafios da Comunicação e fundamentar decisões.
            </p>
          </div>
        </div>

        <div ref={line.ref} className="relative mt-16 md:mt-20">
          <div
            className={[
              'draw-line mb-10 hidden h-px bg-white/35 md:block',
              line.inView ? 'is-visible' : '',
            ].join(' ')}
            aria-hidden="true"
          />
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {sequencia.map((etapa, index) => (
              <Reveal key={etapa.title} as="li" delayMs={120 + index * 90}>
                <div className="relative text-left lg:text-center">
                  <span
                    className="absolute -top-[1.65rem] left-0 hidden h-2.5 w-2.5 rounded-full bg-orange lg:left-1/2 lg:block lg:-translate-x-1/2"
                    aria-hidden="true"
                  />
                  <Icon icon={etapa.icon} size={20} className="mb-3 text-orange lg:mx-auto" />
                  <span className="block text-sm text-cream/45 tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-1 block text-lg font-medium tracking-[-0.03em] text-cream md:text-xl">
                    {etapa.title}
                  </span>
                </div>
              </Reveal>
            ))}
          </ol>
          <p className="sr-only">
            Sequência: Analisar → Contextualizar → Relacionar → Fundamentar → Decidir
          </p>
        </div>

        <aside className="mt-14 max-w-3xl border-l-2 border-orange bg-white/5 py-6 pl-6 md:mt-16 md:py-8 md:pl-8">
          <p className="text-lg leading-relaxed font-medium tracking-[-0.02em] text-cream md:text-xl md:leading-relaxed">
            A inteligência artificial amplia as possibilidades de produção e análise de
            informações. Mas interpretar resultados, avaliar implicações e reconhecer os limites de
            uma resposta continuam exigindo conhecimento, responsabilidade e compreensão do
            contexto.
          </p>
        </aside>
      </div>
    </section>
  )
}
