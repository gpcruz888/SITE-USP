import { MediaFrame } from '@/components/ui/MediaFrame'
import { Reveal } from '@/components/ui/Reveal'
import { banners } from '@/data/banners'

const destaques = [
  {
    year: '1999',
    label: 'Desde 1999',
    value: 'trajetória do Gestcorp',
  },
  {
    year: '—',
    label: '[número oficial]',
    value: 'especialistas formados',
  },
  {
    year: '2004',
    label: 'Desde 2004',
    value: 'revista Organicom',
  },
] as const

export function Trajetoria() {
  return (
    <section
      id="trajetoria"
      className="history-section bg-cream-light py-20 md:py-28"
      aria-labelledby="trajetoria-title"
    >
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <MediaFrame
              src={banners.trajetoria}
              label="Trajetória do Gestcorp"
              caption="Produção intelectual"
              variant="tall"
            />
          </div>

          <div className="lg:col-span-7">
            <h2 id="trajetoria-title" className="text-title-md text-blue-deep">
              Uma trajetória de formação e produção de conhecimento
            </h2>
            <p className="mt-7 max-w-2xl text-[1.0625rem] leading-relaxed text-graphite-muted md:text-lg">
              Desde 1999, o Gestcorp integra a formação de profissionais que atuam nas organizações
              e contribui para o debate acadêmico sobre Comunicação Organizacional e Relações
              Públicas. Sua trajetória está associada à pesquisa, à produção intelectual e às
              experiências de sucessivas turmas.
            </p>

            <ol className="mt-10 grid gap-3">
              {destaques.map((item, index) => (
                <Reveal key={item.label} as="li" delayMs={100 + index * 90}>
                  <div className="rounded-lg bg-cream-warm px-5 py-5 md:px-6 md:py-6">
                    <span className="text-sm font-medium text-blue">{item.year}</span>
                    <p className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-blue-deep md:text-3xl">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm text-graphite-muted">{item.value}</p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-cream-warm p-6">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-blue-deep">Organicom</h3>
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
              <div className="rounded-lg bg-cream-warm p-6">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-blue-deep">
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
