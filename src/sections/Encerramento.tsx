import { Button } from '@/components/ui/Button'
import { MediaFrame } from '@/components/ui/MediaFrame'
import { getWhatsAppHref, getWhatsAppTarget } from '@/data/contact'

export function Encerramento() {
  return (
    <section
      id="encerramento"
      className="relative overflow-hidden bg-blue-deep py-14 text-white md:py-16"
      aria-labelledby="encerramento-title"
    >
      <div className="container-site relative">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2
              id="encerramento-title"
              className="text-[1.75rem] font-medium leading-snug tracking-[-0.03em] text-cream md:text-[2.125rem]"
            >
              Aprofundar o conhecimento também é uma decisão estratégica
            </h2>

            <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-cream/75 md:text-[1.0625rem]">
              A Comunicação atravessa relações, instituições e decisões que exigem diferentes formas
              de compreender a realidade. Desde 1999, o Gestcorp participa dessa discussão a partir
              da formação acadêmica em Comunicação Organizacional e Relações Públicas na ECA-USP.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/55">
              Conheça o programa, tire suas dúvidas e informe-se sobre as condições de participação
              na turma 2027.
            </p>

            <div className="mt-8">
              <Button
                href={getWhatsAppHref()}
                target={getWhatsAppTarget()}
                rel={getWhatsAppTarget() ? 'noopener noreferrer' : undefined}
                size="lg"
              >
                Quero saber como participar
              </Button>
            </div>
            <p className="mt-3 text-sm text-cream/50">
              Atendimento da Secretaria do Gestcorp pelo WhatsApp, de segunda a sexta, em horário
              comercial.
            </p>
          </div>

          <div className="relative lg:col-span-5">
            <div
              className="pointer-events-none absolute -top-6 -left-6 h-24 w-24 rounded-full border border-blue/60"
              aria-hidden="true"
            />
            <svg
              className="pointer-events-none absolute -right-4 -bottom-4 z-20 h-24 w-24 text-orange"
              viewBox="0 0 100 100"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 68 A40 40 0 0 1 78 28"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <div className="media-zoom relative z-10">
              <MediaFrame
                label="Banner de encerramento"
                caption="Gestcorp 2027"
                mark="→"
                variant="landscape"
                tone="blue"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
