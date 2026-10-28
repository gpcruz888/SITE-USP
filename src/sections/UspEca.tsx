import { GraduationCap, MessagesSquare, Palette, type LucideIcon } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { UspSeal } from '@/components/ui/UspSeal'
import { banners } from '@/data/banners'

const blocos: {
  title: string
  text: string
  icon: LucideIcon
}[] = [
  {
    title: 'USP',
    icon: GraduationCap,
    text: 'Uma universidade de referência na produção científica e na formação superior brasileira. No QS Latin America & Caribbean Ranking 2027, divulgado em outubro de 2026, a USP ocupa a segunda posição entre 517 instituições avaliadas.',
  },
  {
    title: 'ECA-USP',
    icon: Palette,
    text: 'Uma escola dedicada ao ensino, à pesquisa e à produção de conhecimento nos campos da Comunicação e das Artes. É também a sede acadêmica da revista Organicom, dedicada à Comunicação Organizacional e às Relações Públicas.',
  },
  {
    title: 'Gestcorp',
    icon: MessagesSquare,
    text: 'Uma especialização com trajetória desde 1999, dedicada à formação de profissionais com visão crítica e estratégica sobre a Comunicação nas organizações.',
  },
]

export function UspEca() {
  return (
    <section
      id="usp-eca"
      className="institution-section relative bg-cream-light py-20 md:py-28"
      aria-labelledby="usp-eca-title"
    >
      <UspSeal />
      <div className="container-site">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold tracking-[0.14em] text-blue uppercase">
              Instituição
            </p>
            <h2 id="usp-eca-title" className="text-title-md mt-4 text-blue-deep">
              A tradição acadêmica da USP. A perspectiva da ECA. A trajetória do Gestcorp.
            </h2>
          </div>
          <p className="text-[1.0625rem] leading-relaxed text-graphite-muted md:text-lg lg:col-span-6">
            A formação do Gestcorp se desenvolve no ambiente acadêmico da Universidade de São Paulo,
            em diálogo com a pesquisa, a produção de conhecimento e os desafios contemporâneos da
            Comunicação.
          </p>
        </div>

        <div className="institution-panorama">
          <img
            src={banners.experiencia}
            alt="ECA-USP e Cidade Universitária"
            className="aspect-[21/9] w-full object-cover md:aspect-[2.4/1]"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="institution-pillars">
          {blocos.map((bloco) => (
            <article key={bloco.title} className="soft-card">
              <span className="soft-card__badge" aria-hidden="true">
                <Icon icon={bloco.icon} size={16} strokeWidth={2} />
              </span>
              <h3 className="text-xl font-bold tracking-[-0.02em] text-blue-deep">{bloco.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-graphite-muted md:text-base">
                {bloco.text}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-sm text-graphite-muted">
          Fonte: QS Quacquarelli Symonds, Latin America &amp; Caribbean Rankings 2027
          (topuniversities.com).
        </p>
      </div>
    </section>
  )
}
