import { useId, useState } from 'react'
import { Minus, Plus, Briefcase, BookOpen, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

const perfis = [
  {
    id: 'p1',
    num: '01',
    icon: Briefcase,
    title: 'Quando a Comunicação passa a participar das decisões',
    text: 'Você lida com lideranças, reputação, crises, públicos estratégicos e questões que atravessam diferentes áreas da organização.',
  },
  {
    id: 'p2',
    num: '02',
    icon: BookOpen,
    title: 'Quando a experiência pede novos fundamentos',
    text: 'Você já conhece a prática profissional e deseja aprofundar os conceitos, os métodos de pesquisa e as perspectivas que sustentam suas escolhas.',
  },
  {
    id: 'p3',
    num: '03',
    icon: TrendingUp,
    title: 'Quando é hora de ampliar sua atuação',
    text: 'Você busca assumir novos desafios, desenvolver projetos de maior complexidade ou ampliar suas possibilidades profissionais sem se afastar do campo da Comunicação.',
  },
] as const

export function ParaQuem() {
  const [openId, setOpenId] = useState<string>('p1')
  const baseId = useId()

  return (
    <section
      id="para-quem"
      className="bg-cream-light py-20 md:py-28"
      aria-labelledby="para-quem-title"
    >
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <h2
            id="para-quem-title"
            className="text-title-md text-graphite lg:col-span-5"
          >
            Sua experiência já trouxe perguntas maiores
          </h2>
          <div className="prose-editorial lg:col-span-7">
            <p className="text-graphite">
              Em diferentes momentos da carreira, o trabalho em Comunicação passa a exigir decisões
              que não se resolvem apenas com repertório técnico. É preciso interpretar cenários,
              compreender interesses, relacionar diferentes áreas do conhecimento e argumentar diante
              de problemas complexos.
            </p>
            <p>
              O Gestcorp é voltado a profissionais que desejam aprofundar essa perspectiva,
              independentemente da formação de origem.
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-border" role="list">
          {perfis.map((perfil) => {
            const open = openId === perfil.id
            const panelId = `${baseId}-${perfil.id}`
            const buttonId = `${panelId}-btn`

            return (
              <div
                key={perfil.id}
                role="listitem"
                className={[
                  'border-b border-border transition-colors duration-250',
                  open ? 'bg-white' : '',
                ].join(' ')}
              >
                <h3 className="m-0">
                  <button
                    type="button"
                    id={buttonId}
                    className={[
                      'grid w-full cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-4 bg-transparent py-6 text-left md:gap-6 md:py-7',
                      open ? 'border-l-4 border-l-blue pl-4 md:pl-5' : 'border-l-4 border-l-transparent pl-4 md:pl-5',
                    ].join(' ')}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenId(open ? '' : perfil.id)}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl font-medium tracking-[-0.03em] text-blue tabular-nums md:text-2xl">
                        {perfil.num}
                      </span>
                      <Icon icon={perfil.icon} size={18} className="hidden text-orange sm:block" />
                    </span>
                    <span className="text-lg font-medium tracking-[-0.03em] text-graphite md:text-xl md:leading-snug">
                      {perfil.title}
                    </span>
                    <span
                      className="flex h-9 w-9 items-center justify-center border border-border text-blue"
                      aria-hidden="true"
                    >
                      <Icon icon={open ? Minus : Plus} size={16} />
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
                    <div className="grid gap-6 border-l-4 border-l-blue/20 pb-8 pl-4 md:grid-cols-12 md:gap-8 md:pl-5">
                      <div className="relative md:col-span-1">
                        <span
                          className="absolute top-0 bottom-0 left-2 hidden w-px bg-border md:block"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="text-[1.0625rem] leading-relaxed text-graphite-muted md:col-span-10 md:text-lg">
                        {perfil.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-border pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-[1.0625rem] leading-relaxed text-graphite-muted md:text-lg">
            A especialização recebe graduados de diferentes áreas do conhecimento. A diversidade de
            experiências integra a riqueza das discussões em sala.
          </p>
          <Button href="#turma-2027" size="lg" className="shrink-0">
            Quero conhecer a turma 2027
          </Button>
        </div>
      </div>
    </section>
  )
}
