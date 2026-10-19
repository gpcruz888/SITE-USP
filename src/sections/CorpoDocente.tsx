import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { docentes } from '@/data/docentes'
import { professoresFotos } from '@/data/professoresFotos'

export function CorpoDocente() {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(3)
  useEffect(() => {
    const phone = window.matchMedia('(max-width: 639px)')
    const tablet = window.matchMedia('(max-width: 1023px)')
    const update = () => { setPageSize(phone.matches ? 1 : tablet.matches ? 2 : 3); setPage(0) }
    update()
    phone.addEventListener('change', update)
    tablet.addEventListener('change', update)
    return () => { phone.removeEventListener('change', update); tablet.removeEventListener('change', update) }
  }, [])
  const totalPages = Math.max(1, Math.ceil(docentes.length / pageSize))
  const visible = docentes.slice(page * pageSize, page * pageSize + pageSize)
  const goPrev = () => setPage(value => (value - 1 + totalPages) % totalPages)
  const goNext = () => setPage(value => (value + 1) % totalPages)

  return (
    <section
      id="professores"
      className="faculty-section bg-blue-deep py-20 text-white md:py-28"
      aria-labelledby="professores-title"
    >
      <div className="container-site">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold tracking-[0.14em] text-cream/60 uppercase">
              Corpo docente
            </p>
            <h2 id="professores-title" className="text-title-md mt-4 text-white">
              O conhecimento de quem pesquisa, ensina e pensa a Comunicação
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-cream/75">
              O corpo docente reúne professores e pesquisadores de diferentes campos do conhecimento,
              proporcionando uma formação que articula teorias, métodos e perspectivas
              contemporâneas.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={goPrev}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10 focus-visible:outline-orange"
                aria-label="Professores anteriores"
              >
                <Icon icon={ArrowLeft} size={18} />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10 focus-visible:outline-orange"
                aria-label="Próximos professores"
              >
                <Icon icon={ArrowRight} size={18} />
              </button>
              <span aria-live="polite" aria-atomic="true" className="faculty-page ml-1 text-sm font-medium text-cream/50 tabular-nums">
                {String(page + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className="relative overflow-hidden lg:col-span-8">
            <div
              key={page}
              className="faculty-grid"
              style={{ gridTemplateColumns: `repeat(${pageSize}, minmax(0, 1fr))` }}
              aria-live="polite"
            >
              {visible.map((docente) => {
                const foto = professoresFotos[docente.id]
                return (
                  <article key={docente.id} className="group min-w-0">
                    <div className="overflow-hidden rounded-xl bg-white/5">
                      {foto ? (
                        <img
                          src={foto}
                          alt={docente.nome}
                          className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="flex aspect-[3/4] items-center justify-center bg-blue text-2xl font-bold text-white/30">
                          {docente.nome.slice(0, 1)}
                        </div>
                      )}
                      <div className="p-3 sm:p-3.5">
                        <h3 className="text-[0.8125rem] leading-snug font-bold tracking-[-0.02em] text-white sm:text-sm">
                          {docente.nome}
                        </h3>
                        <p className="mt-1 text-[0.6875rem] leading-snug text-cream/50 sm:text-xs">
                          {docente.role ?? docente.disciplinas.join(' · ') ?? 'Docente Gestcorp'}
                        </p>
                        <a
                          href={docente.lattes}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2.5 inline-flex items-center gap-1 text-[0.6875rem] font-semibold text-orange transition-colors hover:text-white sm:text-xs"
                        >
                          Currículo Lattes
                          <Icon icon={ArrowUpRight} size={12} />
                        </a>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
