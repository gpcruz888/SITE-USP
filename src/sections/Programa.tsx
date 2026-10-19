import { useId, useState } from 'react'
import {
  Layers,
  Building2,
  Palette,
  FileText,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
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
  const baseId = useId()
  const modulo = modulos[active]

  return (
    <section
      id="programa"
      className="bg-cream-light py-20 md:py-28"
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
            aria-orientation="vertical"
          >
            {modulos.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`${baseId}-tab-${index}`}
                aria-selected={active === index}
                aria-controls={`${baseId}-panel-${index}`}
                tabIndex={active === index ? 0 : -1}
                className="module-tab relative"
                onClick={() => setActive(index)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                    event.preventDefault()
                    setActive((index + 1) % modulos.length)
                  }
                  if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                    event.preventDefault()
                    setActive((index - 1 + modulos.length) % modulos.length)
                  }
                }}
              >
                {active === index && (
                  <span
                    className="absolute top-0 bottom-0 left-0 w-1 bg-orange transition-all duration-250"
                    aria-hidden="true"
                  />
                )}
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
            id={`${baseId}-panel-${active}`}
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

        <div className="mt-12 grid gap-6 border-t border-border pt-10 md:grid-cols-12 md:items-start">
          <h3 className="text-xl font-medium tracking-[-0.03em] text-graphite md:col-span-3 md:text-2xl">
            Trabalho final
          </h3>
          <div className="md:col-span-9">
            <p className="max-w-3xl text-[1.0625rem] leading-relaxed text-graphite-muted md:text-lg">
              {trabalhoFinal}
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
          </div>
        </div>
      </div>
    </section>
  )
}
