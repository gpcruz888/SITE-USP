import { useId, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

const perfis = [
  {
    id: 'p1',
    num: '01',
    title: 'Quando a Comunicação passa a participar das decisões',
    text: 'Você lida com lideranças, reputação, crises, públicos estratégicos e questões que atravessam diferentes áreas da organização.',
  },
  {
    id: 'p2',
    num: '02',
    title: 'Quando a experiência pede novos fundamentos',
    text: 'Você já conhece a prática profissional e deseja aprofundar os conceitos, os métodos de pesquisa e as perspectivas que sustentam suas escolhas.',
  },
  {
    id: 'p3',
    num: '03',
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
      className="audience-section bg-cream-light py-20 md:py-28"
      aria-labelledby="para-quem-title"
    >
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-[0.14em] text-blue uppercase">
              Para quem
            </p>
            <h2 id="para-quem-title" className="text-title-md mt-4 text-blue-deep">
              Sua experiência já trouxe perguntas maiores
            </h2>
          </div>
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
                    className="grid w-full cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-4 bg-transparent py-6 text-left md:gap-6 md:py-7"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenId(open ? '' : perfil.id)}
                  >
                    <span className="text-xl font-semibold tracking-[-0.03em] text-blue tabular-nums md:text-2xl">
                      {perfil.num}
                    </span>
                    <span className="text-lg font-medium tracking-[-0.03em] text-blue-deep md:text-xl md:leading-snug">
                      {perfil.title}
                    </span>
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-md bg-cream-light text-blue"
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
                  inert={!open}
                  aria-hidden={!open}
                  className={['expand-panel', open ? 'is-open' : ''].join(' ')}
                >
                  <div>
                    <p className="max-w-3xl pb-8 text-[1.0625rem] leading-relaxed text-graphite-muted md:text-lg">
                      {perfil.text}
                    </p>
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
