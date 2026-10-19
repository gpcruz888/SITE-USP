import { BookOpen, Users, Library } from 'lucide-react'
import { MediaFrame } from '@/components/ui/MediaFrame'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { useInView } from '@/hooks/useInView'

const destaques = [
  {
    year: '1999',
    label: 'Desde 1999',
    value: 'trajetória do Gestcorp',
    icon: BookOpen,
    primary: true,
  },
  {
    year: '—',
    label: '[número oficial]',
    value: 'especialistas formados',
    icon: Users,
    primary: false,
  },
  {
    year: '2004',
    label: 'Desde 2004',
    value: 'revista Organicom',
    icon: Library,
    primary: false,
  },
] as const

export function Trajetoria() {
  const line = useInView()

  return (
    <section
      id="trajetoria"
      className="bg-cream-warm py-20 md:py-28"
      aria-labelledby="trajetoria-title"
    >
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <div className="media-zoom">
              <MediaFrame
                label="Trajetória do Gestcorp"
                caption="Produção intelectual"
                mark="99"
                variant="tall"
                treatment="offset"
                tone="warm"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 id="trajetoria-title" className="text-title-md text-graphite">
              Uma trajetória de formação e produção de conhecimento
            </h2>
            <p className="mt-7 max-w-2xl text-[1.0625rem] leading-relaxed text-graphite-muted md:text-lg">
              Desde 1999, o Gestcorp integra a formação de profissionais que atuam nas organizações
              e contribui para o debate acadêmico sobre Comunicação Organizacional e Relações
              Públicas. Sua trajetória está associada à pesquisa, à produção intelectual e às
              experiências de sucessivas turmas.
            </p>

            <div ref={line.ref} className="relative mt-12 pl-8">
              <div
                className={[
                  'draw-line-y absolute top-2 bottom-2 left-[0.3rem] w-px bg-blue',
                  line.inView ? 'is-visible' : '',
                ].join(' ')}
                aria-hidden="true"
              />
              <ol>
                {destaques.map((item, index) => (
                  <Reveal key={item.label} as="li" delayMs={150 + index * 120}>
                    <div className="relative pb-10 last:pb-0">
                      <span
                        className={[
                          'absolute top-2 -left-[1.95rem] h-2.5 w-2.5 rounded-full',
                          item.primary ? 'bg-orange' : 'bg-blue',
                        ].join(' ')}
                        aria-hidden="true"
                      />
                      <div className="flex items-start gap-3">
                        <Icon icon={item.icon} size={18} className="mt-1 text-blue" />
                        <div>
                          <span className="text-sm font-medium text-orange">{item.year}</span>
                          <p className="mt-1 text-2xl font-medium tracking-[-0.03em] text-graphite md:text-3xl">
                            {item.label}
                          </p>
                          <p className="mt-1 text-sm text-graphite-muted">{item.value}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>

            <div className="mt-12 grid gap-10 border-t border-border pt-10 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-medium tracking-[-0.03em] text-graphite">Organicom</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-graphite-muted">
                  A Organicom é a Revista Brasileira de Comunicação Organizacional e Relações
                  Públicas, publicada desde 2004 no Portal de Revistas da USP. Cada edição reúne
                  artigos em torno de um dossiê temático.
                </p>
                <a
                  href="https://revistas.usp.br/organicom/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex text-sm font-medium text-blue underline decoration-blue/30 underline-offset-4 hover:decoration-blue"
                >
                  Conhecer as edições da Organicom
                </a>
              </div>
              <div>
                <h3 className="text-xl font-medium tracking-[-0.03em] text-graphite">
                  Livros do corpo docente
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-graphite-muted">
                  <em>Gestão estratégica em comunicação organizacional e relações públicas</em>{' '}
                  (Difusão Editora, 2008) e{' '}
                  <em>
                    Comunicação organizacional estratégica: aportes conceituais e aplicados
                  </em>{' '}
                  (Summus, 2016).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
