import { Button } from '@/components/ui/Button'
import { UspSeal } from '@/components/ui/UspSeal'
import { getWhatsAppHref, getWhatsAppTarget } from '@/data/contact'
import { banners } from '@/data/banners'

export function Hero() {
  return (
    <section id="topo" className="home-hero relative z-0 bg-blue-deep" aria-labelledby="hero-title">
      <div className="hero-layout">
        <div className="hero-narrative">
          <div className="hero-content">
            <UspSeal inline tone="dark" />

            <h1 id="hero-title" className="text-display-lg text-white">
              Não basta comunicar decisões,{' '}
              <span className="text-cream">é preciso participar delas</span>
            </h1>

            <p className="mt-7 max-w-md text-[1.0625rem] leading-relaxed text-cream/80 md:text-lg">
              Reputação, crises, cultura e relações com públicos exigem compreender contextos,
              analisar cenários e fundamentar escolhas.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button
                href={getWhatsAppHref()}
                target={getWhatsAppTarget()}
                rel={getWhatsAppTarget() ? 'noopener noreferrer' : undefined}
                data-macrm-wa-btn=""
                data-location="hero"
                size="lg"
              >
                Garanta sua Matrícula
              </Button>
              <Button href="#programa" variant="outline-light" size="lg">
                Conhecer o programa
              </Button>
            </div>
          </div>
        </div>

        <div className="hero-photo">
          <img
            src={banners.hero}
            alt="Ambiente acadêmico Gestcorp ECA-USP"
            className="hero-media absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div
            className="hero-image-fade pointer-events-none absolute inset-0"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}
