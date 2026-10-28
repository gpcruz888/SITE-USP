import { InterestForm } from '@/components/forms/InterestForm'
import { getTurmaAtiva } from '@/data/turma'
import { banners } from '@/data/banners'

export function Turma2027() {
  const turma = getTurmaAtiva()

  const facts = [
    { label: 'Início', value: turma.dataInicioLabel },
    { label: 'Vagas', value: String(turma.vagas) },
    { label: 'Modalidade', value: 'Presencial' },
    { label: 'Duração', value: '2 anos' },
  ] as const

  return (
    <section className="enrollment-section" id="turma-2027" aria-labelledby="turma-title">
      <div className="grid lg:min-h-[36rem] lg:grid-cols-2">
        <div className="relative min-h-[22rem] bg-blue-deep lg:min-h-full">
          <img
            src={banners.turma}
            alt=""
            className="enrollment-photo absolute inset-0 h-full w-full object-cover object-center"
            loading="lazy"
            decoding="async"
            aria-hidden="true"
          />
          <div className="enrollment-image-fade absolute inset-0" aria-hidden="true" />
          <div className="relative flex h-full flex-col justify-end px-6 py-10 sm:px-8 md:p-12 lg:p-14">
            <p className="text-xs font-semibold tracking-[0.14em] text-cream/70 uppercase">
              Turma 2027
            </p>
            <h2 id="turma-title" className="mt-4 max-w-lg text-title-md text-white md:text-display">
              Gestcorp 2027: informações para planejar sua participação
            </h2>
            <dl className="mt-8 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5">
              {facts.map((item) => (
                <div
                  key={item.label}
                  className={'wide' in item && item.wide ? 'col-span-2' : undefined}
                >
                  <dt className="text-sm text-cream/55">{item.label}</dt>
                  <dd
                    className={[
                      'mt-1 text-[0.9375rem] leading-snug font-semibold text-white sm:text-base',
                      'muted' in item && item.muted ? 'font-medium text-cream/75' : '',
                    ].join(' ')}
                  >
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 max-w-lg rounded-2xl border border-white/15 bg-white/10 px-5 py-5 sm:px-6">
              <p className="text-xs font-semibold tracking-[0.14em] text-cream/70 uppercase">
                Investimento
              </p>
              <p className="mt-2 text-[1.75rem] leading-none font-bold tracking-[-0.03em] text-white">
                {turma.investimentoParcelas ?? 'Valor a confirmar'}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-cream/80">
                {turma.investimento
                  ? `Total de ${turma.investimento}. Dois anos de especialização presencial na ECA-USP, no ritmo de uma mensalidade.`
                  : 'O valor da turma será confirmado pela Secretaria.'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center bg-blue-deep px-6 py-12 sm:px-8 md:px-12 lg:px-14 lg:py-16">
          <div className="mx-auto w-full max-w-md">
            <h3 className="text-2xl font-bold tracking-[-0.03em] text-white md:text-[1.75rem]">
              Garanta sua vaga na turma 2027
            </h3>
            <p className="mt-3 mb-8 text-sm leading-relaxed text-cream/70">
              Informe seus dados. A Secretaria orienta a matrícula e as formas de pagamento.
            </p>
            <div className="rounded-2xl bg-cream-warm p-5 sm:p-6 md:p-8">
              <InterestForm conversion />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
