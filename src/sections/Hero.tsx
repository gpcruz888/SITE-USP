import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { MediaFrame } from '@/components/ui/MediaFrame'
import { getWhatsAppHref, getWhatsAppTarget } from '@/data/contact'
import { getTurmaAtiva } from '@/data/turma'
import { CalendarDays, MapPin, Users, Clock } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'

export function Hero() {
  const turma = getTurmaAtiva()
  const mediaRef = useRef<HTMLDivElement>(null)

  const highlights = [
    { label: 'Início previsto', value: turma.dataInicioLabel, icon: CalendarDays },
    { label: 'Modalidade', value: 'Presencial na ECA-USP', icon: MapPin },
    { label: 'Vagas', value: String(turma.vagas), icon: Users },
    { label: 'Duração', value: '2 Anos', icon: Clock },
  ]

  useEffect(() => {
    const node = mediaRef.current
    if (!node) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(pointer: fine)').matches
    if (reduce || !fine) return

    const onMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect()
      const y = (event.clientY - rect.top) / rect.height - 0.5
      node.style.transform = `translate3d(0, ${y * 8}px, 0)`
    }
    const onLeave = () => {
      node.style.transform = 'translate3d(0, 0, 0)'
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    node.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      node.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section id="topo" className="relative overflow-hidden bg-cream-light" aria-labelledby="hero-title">
      <div className="container-site py-12 md:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:min-h-[30rem] lg:grid-cols-12 lg:gap-10">
          <div className="animate-fade-up flex flex-col justify-center lg:col-span-6">
            <h1 id="hero-title" className="text-display-lg text-graphite">
              Não basta comunicar decisões,{' '}
              <em className="font-medium not-italic text-blue">é preciso participar delas</em>
            </h1>

            <div className="prose-editorial mt-8 md:mt-9">
              <p className="text-graphite">
                Reputação, crises, cultura e relações com públicos exigem mais do que saber
                comunicar. Exigem compreender contextos, analisar cenários e fundamentar escolhas.
              </p>
              <p>
                Desde 1999, o Gestcorp, especialização da ECA-USP, reúne conhecimento acadêmico,
                pesquisa e experiência profissional para aprofundar a gestão estratégica da
                Comunicação.
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                href={getWhatsAppHref()}
                target={getWhatsAppTarget()}
                rel={getWhatsAppTarget() ? 'noopener noreferrer' : undefined}
                size="lg"
              >
                Quero saber como participar
              </Button>
              <span className="cta-line hidden sm:block" aria-hidden="true" />
              <Button href="#programa" variant="secondary" size="lg">
                Conhecer o programa
              </Button>
            </div>
            <p className="mt-4 text-[0.9375rem] text-graphite-light">
              Fale com a Secretaria do Gestcorp pelo WhatsApp.
            </p>
          </div>

          <div className="relative animate-fade-up-delay lg:col-span-6">
            <div
              className="pointer-events-none absolute -top-6 -right-4 z-0 h-40 w-40 rounded-full border border-blue/40 md:h-52 md:w-52"
              aria-hidden="true"
            />
            <svg
              className="pointer-events-none absolute -bottom-4 -left-6 z-20 h-28 w-28 text-orange md:h-36 md:w-36"
              viewBox="0 0 120 120"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M18 78 A48 48 0 0 1 102 42"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <div ref={mediaRef} className="parallax-media relative z-10">
              <MediaFrame
                label="Imagem principal da Hero"
                caption="Turma 2027"
                mark="27"
                variant="tall"
                className="min-h-[22rem] w-full md:min-h-[28rem] lg:min-h-[30rem]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue text-white">
        <div className="container-site">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item, index) => (
              <Reveal
                key={item.label}
                as="li"
                delayMs={index * 80}
                className="border-b border-white/15 px-0 py-6 last:border-b-0 sm:border-r sm:border-b-0 sm:px-5 sm:py-7 sm:first:pl-0 sm:last:border-r-0"
              >
                <div className="flex items-start gap-3">
                  <Icon icon={item.icon} className="mt-0.5 text-orange" size={18} />
                  <div>
                    <span className="block text-sm text-white/60">{item.label}</span>
                    <span className="mt-1.5 block text-lg font-medium tracking-[-0.02em] md:text-xl">
                      {item.value}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
