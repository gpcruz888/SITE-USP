import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { banners } from '@/data/banners'

export function OQueE() {
  return (
    <section
      id="o-curso"
      className="course-overview relative z-0 bg-cream-warm"
      aria-labelledby="o-curso-title"
    >
      <div className="container-site">
        <div className="course-layout">
          <div className="course-description">
            <p className="text-xs font-semibold tracking-[0.14em] text-blue uppercase">O curso</p>
            <h2 id="o-curso-title" className="text-title-md mt-4 text-blue-deep">
              Uma formação dedicada à gestão estratégica da Comunicação desde 1999
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-graphite-muted md:text-lg">
              O Gestcorp é a Especialização em Gestão Estratégica em Comunicação Organizacional e
              Relações Públicas da Escola de Comunicações e Artes da Universidade de São Paulo
              (ECA). &quot;Gestcorp&quot; é a forma curta do nome do curso.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-graphite-muted md:text-lg">
              Criado em 1999, o curso articula fundamentos científicos, reflexão crítica e questões
              contemporâneas da gestão da Comunicação nas organizações.
            </p>
            <div className="mt-8">
              <Button href="#programa" variant="ghost" size="lg" className="group/cta">
                Conhecer o programa
                <Icon
                  icon={ArrowRight}
                  size={18}
                  strokeWidth={2}
                  className="transition-transform duration-200 group-hover/cta:translate-x-0.5"
                />
              </Button>
            </div>
          </div>

          <div className="course-visual">
            <div className="course-main-image">
              <img src={banners.uspEca} alt="Formação Gestcorp na ECA-USP" loading="lazy" decoding="async" />
            </div>
            <div className="course-image-column">
              <div className="course-year"><p>1999</p><p>Trajetória de formação em Comunicação Organizacional e Relações Públicas</p></div>
              <img src={banners.galeria[0]} alt="" loading="lazy" decoding="async" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
