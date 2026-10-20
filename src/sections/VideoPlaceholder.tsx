import { Play } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'

export function VideoPlaceholder() {
  return (
    <section
      id="video"
      className="bg-cream-warm py-20 md:py-28"
      aria-labelledby="video-title"
    >
      <div className="container-site">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-[0.14em] text-blue uppercase">
              Em breve
            </p>
            <h2 id="video-title" className="text-title-md mt-4 text-blue-deep">
              Lorem ipsum dolor sit amet
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-graphite-muted md:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-graphite-muted md:text-lg">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div
              className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl bg-blue-deep"
              role="img"
              aria-label="Placeholder de vídeo"
            >
              <div
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,96,246,0.35)_0%,transparent_65%)]"
                aria-hidden="true"
              />
              <div className="relative flex flex-col items-center gap-3 text-center">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-orange text-blue-deep shadow-[0_12px_32px_rgba(246,100,3,0.35)]">
                  <Icon icon={Play} size={28} strokeWidth={2} className="ml-0.5" />
                </span>
                <span className="text-sm font-medium tracking-wide text-cream/70">
                  Vídeo · placeholder
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
