import { useEffect, useState } from 'react'
import { navItems } from '@/data/navigation'
import { getWhatsAppHref, getWhatsAppTarget } from '@/data/contact'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        document.querySelector<HTMLButtonElement>('[aria-controls="menu-mobile"]')?.focus()
      }
    }
    const desktop = window.matchMedia('(min-width: 1024px)')
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false) }
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

  return (
    <header
      className={[
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border/80 bg-cream-light/95 shadow-[0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md'
          : 'border-b border-border/40 bg-cream-light',
      ].join(' ')}
    >
      <div className="container-site flex h-20 items-center justify-between gap-6 md:h-24">
        <a
          href="#topo"
          className="shrink-0 no-underline transition-opacity hover:opacity-85 focus-visible:outline-blue"
          onClick={handleNavClick}
          aria-label="Gestcorp ECA-USP — início"
        >
          <Logo />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação Principal">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.875rem] font-medium tracking-tight text-graphite-muted no-underline transition-colors hover:text-blue focus-visible:outline-blue"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button
            href={getWhatsAppHref()}
            target={getWhatsAppTarget()}
            rel={getWhatsAppTarget() ? 'noopener noreferrer' : undefined}
            size="md"
            className="hidden sm:inline-flex"
          >
            Quero saber como participar
          </Button>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-border/80 bg-white/60 text-graphite transition-colors hover:border-graphite focus-visible:outline-blue lg:hidden"
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
        className="border-t border-border/80 bg-cream-light/98 backdrop-blur-lg lg:hidden"
      >
        <nav className="container-site flex flex-col py-6" aria-label="Navegação Mobile">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className="border-b border-border/50 py-4 text-base font-medium tracking-tight text-graphite no-underline transition-colors hover:text-blue"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-6 pb-2">
            <Button
              href={getWhatsAppHref()}
              target={getWhatsAppTarget()}
              rel={getWhatsAppTarget() ? 'noopener noreferrer' : undefined}
              className="w-full justify-center"
              size="lg"
              onClick={handleNavClick}
            >
              Quero saber como participar
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}

