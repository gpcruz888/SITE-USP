import { useState } from 'react'
import { ArrowUpRight, Minus, Plus } from 'lucide-react'
import { MediaFrame } from '@/components/ui/MediaFrame'
import { Icon } from '@/components/ui/Icon'
import { docentes, docentesDestaque } from '@/data/docentes'

function PendingField({ label }: { label: string }) {
  return (
    <span className="text-graphite-light italic">[{label} — a confirmar pela coordenação]</span>
  )
}

function initials(nome: string) {
  return nome
    .split(' ')
    .filter((part) => part.length > 2)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export function CorpoDocente() {
  const [listaAberta, setListaAberta] = useState(false)

  return (
    <section
      id="professores"
      className="bg-white py-20 md:py-28"
      aria-labelledby="professores-title"
    >
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <h2 id="professores-title" className="text-title-md text-graphite lg:col-span-6">
            O conhecimento de quem pesquisa, ensina e pensa a Comunicação
          </h2>
          <p className="text-[1.0625rem] leading-relaxed text-graphite-muted md:text-lg lg:col-span-6 lg:pt-1">
            O corpo docente reúne professores e pesquisadores de diferentes campos do conhecimento,
            proporcionando uma formação que articula teorias, métodos e perspectivas
            contemporâneas. Suas trajetórias acadêmicas e profissionais contribuem para ampliar a
            compreensão da Comunicação Organizacional e das Relações Públicas.
          </p>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
          {docentesDestaque.map((docente, index) => {
            const accentOrange = index % 2 === 1
            return (
              <article key={docente.id} className="group flex flex-col">
                <div className="media-zoom relative">
                  <span
                    className={[
                      'absolute top-0 left-0 z-10 h-1 w-12',
                      accentOrange ? 'bg-orange' : 'bg-blue',
                    ].join(' ')}
                    aria-hidden="true"
                  />
                  <MediaFrame
                    label={`Professor / ${docente.nome}`}
                    caption={docente.role ?? 'Docente Gestcorp'}
                    mark={initials(docente.nome)}
                    variant="tall"
                    className="w-full max-w-[18rem]"
                  />
                </div>
                <div className="mt-5 flex flex-1 flex-col border-t border-border pt-4">
                  <h3 className="flex items-start gap-2 text-xl font-medium tracking-[-0.03em] text-graphite">
                    <span>
                      {docente.nome}
                      {docente.role && (
                        <span className="mt-1 block text-sm font-medium text-blue">
                          {docente.role}
                        </span>
                      )}
                    </span>
                    <Icon
                      icon={ArrowUpRight}
                      size={16}
                      className="mt-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100 text-orange"
                    />
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-graphite-muted">
                    {docente.titulacao && docente.vinculo ? (
                      `${docente.titulacao} · ${docente.vinculo}`
                    ) : (
                      <PendingField label="titulação e vínculo atual" />
                    )}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-graphite-muted">
                    {docente.areaAtuacao ? (
                      docente.areaAtuacao
                    ) : (
                      <PendingField label="linha de atuação e pesquisa" />
                    )}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-graphite">
                    <span className="font-medium">Disciplina: </span>
                    {docente.disciplinas.join('; ')}
                  </p>
                  <a
                    href={docente.lattes}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-blue underline decoration-blue/30 underline-offset-4 hover:decoration-blue"
                  >
                    Currículo Lattes
                    <Icon icon={ArrowUpRight} size={14} className="icon-nudge" />
                  </a>
                </div>
              </article>
            )
          })}
        </div>

        <p className="mt-10 text-sm text-graphite-light">
          Professores em destaque sujeitos a confirmação pela coordenação. Titulações e vínculos
          serão atualizados sem inventar informações.
        </p>

        <div className="mt-14 border-t border-border pt-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-2xl font-medium tracking-[-0.03em] text-graphite">
              Todos os professores
            </h3>
            <button
              type="button"
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 border border-border bg-transparent px-4 py-2 text-sm font-medium text-graphite transition-colors hover:border-blue hover:text-blue"
              aria-expanded={listaAberta}
              onClick={() => setListaAberta((v) => !v)}
            >
              {listaAberta ? 'Ocultar lista' : 'Exibir lista completa'}
              <Icon icon={listaAberta ? Minus : Plus} size={16} />
            </button>
          </div>

          {listaAberta && (
            <ul className="mt-6 border-t border-border">
              {docentes.map((docente) => (
                <li
                  key={docente.id}
                  className="grid gap-2 border-b border-border-subtle py-4 md:grid-cols-12 md:items-baseline md:gap-6"
                >
                  <div className="md:col-span-4">
                    <span className="font-medium text-graphite">{docente.nome}</span>
                    {docente.role && (
                      <span className="ml-1 text-sm text-graphite-muted">· {docente.role}</span>
                    )}
                  </div>
                  <p className="text-sm leading-snug text-graphite-muted md:col-span-6">
                    {docente.disciplinas.join('; ')}
                  </p>
                  <div className="md:col-span-2 md:text-right">
                    <a
                      href={docente.lattes}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-blue underline decoration-blue/30 underline-offset-4"
                    >
                      Lattes
                      <Icon icon={ArrowUpRight} size={14} />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
