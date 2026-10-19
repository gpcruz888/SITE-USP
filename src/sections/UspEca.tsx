import { Landmark, GraduationCap, Network } from 'lucide-react'
import { MediaFrame } from '@/components/ui/MediaFrame'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'

const blocos = [
  {
    title: 'USP',
    icon: Landmark,
    text: 'Uma universidade de referência na produção científica e na formação superior brasileira. No QS Latin America & Caribbean Ranking 2027, divulgado em outubro de 2026, a USP ocupa a segunda posição entre 517 instituições avaliadas.',
  },
  {
    title: 'ECA-USP',
    icon: GraduationCap,
    text: 'Uma escola dedicada ao ensino, à pesquisa e à produção de conhecimento nos campos da Comunicação e das Artes. É também a sede acadêmica da revista Organicom, dedicada à Comunicação Organizacional e às Relações Públicas.',
  },
  {
    title: 'Gestcorp',
    icon: Network,
    text: 'Uma especialização com trajetória desde 1999, dedicada à formação de profissionais com visão crítica e estratégica sobre a Comunicação nas organizações.',
  },
] as const

export function UspEca() {
  return (
    <section
      id="usp-eca"
      className="bg-blue-deep py-20 text-white md:py-28"
      aria-labelledby="usp-eca-title"
    >
      <div className="container-site">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="mb-6 max-w-xl text-[1.0625rem] leading-relaxed text-cream/65">
              Uma especialização desenvolvida na Escola de Comunicações e Artes da Universidade de
              São Paulo.
            </p>
            <h2 id="usp-eca-title" className="text-display text-cream">
              A tradição acadêmica da USP. A perspectiva da ECA. A trajetória do Gestcorp.
            </h2>
            <p className="mt-8 max-w-2xl text-[1.0625rem] leading-relaxed text-cream/80 md:text-lg">
              A formação do Gestcorp se desenvolve no ambiente acadêmico da Universidade de São
              Paulo, em diálogo com a pesquisa, a produção de conhecimento e os desafios
              contemporâneos da Comunicação.
            </p>
          </div>

          <div className="relative lg:col-span-5">
            <div
              className="absolute -inset-3 border border-blue/50"
              aria-hidden="true"
            />
            <div
              className="absolute -right-2 -bottom-2 h-16 w-16 border-r-2 border-b-2 border-orange"
              aria-hidden="true"
            />
            <MediaFrame
              label="Fotografia institucional ECA-USP"
              caption="Cidade Universitária"
              mark="USP"
              variant="landscape"
              tone="blue"
              className="relative z-10"
            />
          </div>
        </div>

        <div className="relative mt-14 md:mt-20">
          <div
            className="pointer-events-none absolute top-10 right-0 left-0 hidden h-px bg-white/25 md:block"
            aria-hidden="true"
          />
          <div className="grid gap-0 md:grid-cols-3">
            {blocos.map((bloco, index) => (
              <Reveal key={bloco.title} as="article" delayMs={index * 90}>
                <div className="group relative border-b border-white/20 px-0 py-8 transition-colors duration-250 hover:bg-blue/40 md:border-r md:border-b-0 md:px-6 md:py-10 md:first:pl-0 md:last:border-r-0">
                  <span
                    className="absolute top-[2.35rem] left-0 hidden h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-orange md:block"
                    aria-hidden="true"
                  />
                  <Icon
                    icon={bloco.icon}
                    size={22}
                    className="icon-nudge mb-4 text-orange"
                  />
                  <h3 className="text-2xl font-medium tracking-[-0.03em] text-white md:text-3xl">
                    {bloco.title}
                  </h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-cream/80 md:text-[1.0625rem]">
                    {bloco.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 border-t border-white/15 pt-10 md:grid-cols-12 md:items-end">
          <p className="max-w-3xl text-lg leading-relaxed font-medium tracking-[-0.02em] text-cream/90 md:col-span-8 md:text-xl">
            O valor da formação está na articulação entre conhecimento científico, debate acadêmico e
            compreensão dos problemas que atravessam a atuação profissional.
          </p>
          <p className="text-sm leading-relaxed text-cream/45 md:col-span-4 md:text-right">
            Fonte: QS Quacquarelli Symonds, Latin America &amp; Caribbean Rankings 2027
            (topuniversities.com).
          </p>
        </div>
      </div>
    </section>
  )
}
