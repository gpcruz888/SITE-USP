import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { UspSeal } from '@/components/ui/UspSeal'
import { banners } from '@/data/banners'
import { getWhatsAppHref, getWhatsAppTarget } from '@/data/contact'

export function Encerramento() {
  return (
    <section
      id="encerramento"
      className="closing-section relative isolate overflow-hidden text-white"
      aria-labelledby="encerramento-title"
    >
      <img
        src={banners.encerramento}
        alt=""
        className="closing-photo absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
        aria-hidden="true"
      />
      <div
        className="closing-image-fade absolute inset-0"
        aria-hidden="true"
      />
      <UspSeal tone="dark" corner="top-right" />

      <div className="relative container-site py-24 md:py-32 lg:py-36">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.14em] text-cream/65 uppercase">
            Próximo passo
          </p>
          <h2 id="encerramento-title" className="text-display mt-5 text-white">
            Aprofundar o conhecimento também é uma decisão estratégica
          </h2>
          <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-cream/80 md:text-lg">
            Desde 1999, o Gestcorp forma profissionais na ECA-USP para pensar Comunicação
            Organizacional e Relações Públicas com profundidade.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
            <Button
              href={getWhatsAppHref()}
              target={getWhatsAppTarget()}
              rel={getWhatsAppTarget() ? 'noopener noreferrer' : undefined}
              data-macrm-wa-btn=""
              data-location="encerramento"
              size="lg"
            >
              Faça sua matrícula
            </Button>
            <a
              href="#duvidas"
              className="group/cta inline-flex items-center gap-1.5 text-sm font-semibold text-cream transition-colors hover:text-white"
            >
              Ver dúvidas frequentes
              <Icon
                icon={ArrowRight}
                size={16}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover/cta:translate-x-0.5"
              />
            </a>
          </div>

          <p className="mt-8 max-w-md border-t border-white/15 pt-6 text-sm leading-relaxed text-cream/55">
            Atendimento da Secretaria pelo WhatsApp, de segunda a sexta, em horário comercial.
          </p>
        </div>
      </div>
    </section>
  )
}
