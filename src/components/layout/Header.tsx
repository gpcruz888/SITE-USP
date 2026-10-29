import { useEffect, useState } from 'react'
import { navItems } from '@/data/navigation'
import { getWhatsAppHref, getWhatsAppTarget } from '@/data/contact'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'

export function Header({ variant = 'overlay' }: { variant?: 'overlay' | 'solid' }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.toggleAttribute('data-menu-open', open)
    if (!open) {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      return
    }
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      document.body.removeAttribute('data-menu-open')
    }
  }, [open])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        document.querySelector<HTMLButtonElement>('[aria-controls="menu-mobile"]')?.focus()
      }
    }
    const desktop = window.matchMedia('(min-width: 1280px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      window.removeEventListener('keydown', closeOnEscape)
      desktop.removeEventListener('change', closeOnDesktop)
    }
  }, [open])

  function handleNavClick() {
    setOpen(false)
  }

  const onDark = variant === 'overlay' && !scrolled && !open
  const floated = variant === 'solid' || scrolled || open
  const home = variant === 'solid' ? '/' : ''

  return (
    <header
      className={[
        'site-header fixed inset-x-0 top-0 z-50 transition-all duration-300',
        floated ? 'site-header--floated' : '',
      ].join(' ')}
    >
      <div
        className={[
          'site-header-surface transition-all duration-300',
          floated
            ? 'overflow-hidden rounded-xl border border-border/60 bg-cream-warm/96 shadow-[0_10px_36px_rgba(17,38,75,0.10)] backdrop-blur-md sm:rounded-2xl'
            : 'border border-transparent bg-transparent',
        ].join(' ')}
      >
        <div className="container-site flex h-16 items-center justify-between gap-4 md:h-20 md:gap-6">
          <div className="flex min-w-0 items-center gap-7 lg:gap-9">
            <a
              href={variant === 'solid' ? '/' : '#topo'}
              className="shrink-0 no-underline transition-opacity hover:opacity-85 focus-visible:outline-blue"
              onClick={handleNavClick}
              aria-label="Gestcorp ECA-USP — início"
            >
              <Logo eca light={onDark} />
            </a>

            <nav
              className="hidden items-center gap-4 xl:gap-5 xl:flex"
              aria-label="Navegação Principal"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={`${home}${item.href}`}
                  className={[
                    'whitespace-nowrap text-[0.8125rem] font-medium tracking-tight no-underline transition-colors focus-visible:outline-blue xl:text-[0.875rem]',
                    onDark
                      ? 'text-white/80 hover:text-white'
                      : 'text-blue-deep hover:text-blue',
                  ].join(' ')}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Button
              href={getWhatsAppHref()}
              target={getWhatsAppTarget()}
              rel={getWhatsAppTarget() ? 'noopener noreferrer' : undefined}
              data-macrm-wa-btn=""
              data-location="topo"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Inscreva-se já
            </Button>

            <button
              type="button"
              className={[
                'inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors focus-visible:outline-blue xl:hidden',
                onDark
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-cream-light text-blue-deep hover:bg-blue-soft',
              ].join(' ')}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? 'Fechar' : 'Abrir'} menu</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                {open ? (
                  <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                ) : (
                  <>
                    <path d="M3 6h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M3 11h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M3 16h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          id="menu-mobile"
          hidden={!open}
          className="border-t border-border/80 xl:hidden"
        >
          <nav
            className="container-site flex max-h-[min(70svh,32rem)] flex-col overflow-y-auto py-6"
            aria-label="Navegação Mobile"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={`${home}${item.href}`}
                onClick={handleNavClick}
                className="border-b border-border/50 py-4 text-base font-medium tracking-tight text-blue-deep no-underline transition-colors hover:text-blue"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-6 pb-2">
              <Button
                href={getWhatsAppHref()}
                target={getWhatsAppTarget()}
                rel={getWhatsAppTarget() ? 'noopener noreferrer' : undefined}
                data-macrm-wa-btn=""
                data-location="menu"
                className="w-full justify-center"
                size="lg"
                onClick={handleNavClick}
              >
                Inscreva-se já
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
