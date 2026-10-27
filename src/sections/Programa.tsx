import { useId, useRef, useState } from 'react'
import {
  Layers,
  Building2,
  Palette,
  FileText,
  FileCheck2,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { UspSeal } from '@/components/ui/UspSeal'
import { banners } from '@/data/banners'
import { modulos, trabalhoFinal } from '@/data/programa'
import { getWhatsAppHref, getWhatsAppTarget } from '@/data/contact'

const moduleIcons: LucideIcon[] = [Layers, Building2, Palette, FileText]

const moduleThemes = [
  ['Governança', 'Planejamento', 'Ética', 'Cultura'],
  ['Públicos', 'Gestão', 'Pesquisa', 'Digital'],
  ['Marca', 'Mídia', 'ESG', 'Diversidade'],
  ['Projeto', 'Monografia', 'Método'],
] as const

export function Programa() {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const baseId = useId()
  const modulo = modulos[active]

  return (
    <section
      id="programa"
      className="curriculum-section bg-cream-light pt-20 md:pt-28"
      aria-labelledby="programa-title"
    >
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <h2 id="programa-title" className="text-title-md text-graphite lg:col-span-7">
            Uma formação que conecta diferentes perspectivas da Comunicação
          </h2>
          <p className="text-[1.0625rem] leading-relaxed text-graphite-muted md:text-lg lg:col-span-5">
            O programa reúne conteúdos de Comunicação Organizacional e Relações Públicas, gestão,
            pesquisa e questões contemporâneas que influenciam as relações entre organizações e
            sociedade. Ao longo da formação, os temas são abordados a partir de fundamentos
            acadêmicos e de suas conexões com a atuação profissional.
          </p>
        </div>

        <div className="module-shell relative mt-12 md:mt-16">
          <div
            className="module-tabs"
            role="tablist"
            aria-label="Módulos do programa"
            aria-orientation="horizontal"
          >
            {modulos.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`${baseId}-tab-${index}`}
                aria-selected={active === index}
                aria-controls={`${baseId}-panel`}
                ref={element => { tabs.current[index] = element }}
                tabIndex={active === index ? 0 : -1}
                className="module-tab relative"
                onClick={() => setActive(index)}
                onKeyDown={(event) => {
                  let next = index
                  if (event.key === 'ArrowRight') next = (index + 1) % modulos.length
                  else if (event.key === 'ArrowLeft') next = (index - 1 + modulos.length) % modulos.length
                  else if (event.key === 'Home') next = 0
                  else if (event.key === 'End') next = modulos.length - 1
                  else return
                  event.preventDefault()
                  setActive(next)
                  tabs.current[next]?.focus()
                }}
              >
                <Icon
                  icon={moduleIcons[index]}
                  size={18}
                  className={active === index ? 'text-orange' : 'text-current opacity-70'}
                />
                <span className="text-xl font-medium tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm font-medium leading-snug">{item.titulo}</span>
                <span className="text-[0.6875rem] opacity-70">
                  {item.disciplinas.length} disciplinas
                </span>
              </button>
            ))}
          </div>

          <div
            className="module-panel"
            role="tabpanel"
            id={`${baseId}-panel`}
            key={modulo.id}
            tabIndex={0}
            aria-labelledby={`${baseId}-tab-${active}`}
          >
            <div className="flex flex-col gap-6 border-b border-border-subtle pb-8 md:flex-row md:items-start md:gap-10">
              <span
                className="text-6xl font-medium leading-none tracking-[-0.06em] text-cream-muted md:text-7xl"
                aria-hidden="true"
              >
                {String(active + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex items-center gap-2">
                  <Icon icon={moduleIcons[active]} size={20} className="text-blue" />
                  <h3 className="text-2xl font-medium tracking-[-0.03em] text-graphite md:text-3xl">
                    {modulo.titulo}
                  </h3>
                </div>
                <p className="max-w-2xl text-[1.0625rem] leading-relaxed text-graphite-muted">
                  {modulo.descricao}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Temas do módulo">
                  {moduleThemes[active].map((theme) => (
                    <li
                      key={theme}
                      className="border border-blue/20 bg-blue/5 px-3 py-1.5 text-sm text-blue"
                    >
                      {theme}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <ol className="mt-8 grid gap-0 md:grid-cols-2 md:gap-x-10">
              {modulo.disciplinas.map((disciplina, n) => (
                <li key={`${disciplina.nome}-${disciplina.professor}`} className="discipline-tile">
                  <span
                    className="pt-0.5 text-[0.6875rem] font-medium text-orange tabular-nums"
                    aria-hidden="true"
                  >
                    {String(n + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className="text-[0.9375rem] leading-snug font-medium text-graphite">
                      {disciplina.nome}
                    </h4>
                    <p className="mt-1.5 text-sm text-graphite-muted">{disciplina.professor}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

      </div>

      <div
        className="trabalho-final-band relative mt-16 flex min-h-[26rem] items-end md:mt-20 md:min-h-[32rem]"
        style={{ backgroundImage: `url(${banners.trabalhoFinal})` }}
      >
        <div className="absolute inset-0 bg-blue-deep/25" aria-hidden="true" />
        <UspSeal corner="top-right" />

        <div className="relative container-site w-full">
          <div className="max-w-xl rounded-t-2xl bg-blue/92 px-7 py-9 text-white backdrop-blur-[2px] sm:px-9 sm:py-10 md:max-w-lg lg:max-w-xl">
            <div className="work-final-heading">
              <span className="work-final-icon" aria-hidden="true"><Icon icon={FileCheck2} size={23} strokeWidth={1.6} /></span>
              <h3 className="text-2xl font-bold tracking-[-0.03em] md:text-[1.75rem]">Trabalho final</h3>
            </div>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/85">
              {trabalhoFinal}
            </p>
            <div className="mt-8">
              <Button
                href={getWhatsAppHref()}
                target={getWhatsAppTarget()}
                rel={getWhatsAppTarget() ? 'noopener noreferrer' : undefined}
                size="lg"
              >
                Garanta sua Matrícula
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
