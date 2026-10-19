import { useId, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { faqItems } from '@/data/faq'

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(null)
  const baseId = useId()

  return (
    <section
      id="duvidas"
      className="bg-white py-20 md:py-28"
      aria-labelledby="faq-title"
    >
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <span
              className="relative mb-6 block h-14 w-14 rounded-full border border-blue"
              aria-hidden="true"
            >
              <span className="absolute top-3 left-3 h-3 w-3 rounded-full bg-orange" />
            </span>
            <h2 id="faq-title" className="text-title-md text-graphite">
              Perguntas frequentes sobre o Gestcorp
            </h2>
          </div>

          <div className="border-t border-border lg:col-span-8">
            {faqItems.map((item) => {
              const open = openId === item.id
              const panelId = `${baseId}-${item.id}`
              const buttonId = `${panelId}-btn`

              return (
                <div
                  key={item.id}
                  className={[
                    'border-b border-border transition-colors duration-250',
                    open ? 'bg-cream-light/80' : '',
                  ].join(' ')}
                >
                  <h3 className="m-0">
                    <button
                      type="button"
                      id={buttonId}
                      className="flex w-full cursor-pointer items-start justify-between gap-6 bg-transparent py-6 text-left"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenId(open ? null : item.id)}
                    >
                      <span className="text-lg font-medium tracking-[-0.03em] text-graphite md:text-xl">
                        {item.pergunta}
                      </span>
                      <span
                        className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center border border-border text-blue"
                        aria-hidden="true"
                      >
                        <Icon icon={open ? Minus : Plus} size={15} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={['expand-panel', open ? 'is-open' : ''].join(' ')}
                  >
                    <div>
                      <p className="max-w-2xl border-l-2 border-blue pb-7 pl-5 text-[1.0625rem] leading-relaxed text-graphite-muted">
                        {item.resposta}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
