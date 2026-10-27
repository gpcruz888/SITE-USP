import { forwardRef, type ReactNode } from 'react'
import { Mail, MapPin, MessageCircle, type LucideIcon, type LucideProps } from 'lucide-react'
import { contact, getWhatsAppHref, getWhatsAppTarget } from '@/data/contact'
import { Icon } from '@/components/ui/Icon'
import { Logo } from '@/components/ui/Logo'
import logoEcaUsp2017 from '@/img/logo_ECA_USP_2017.png'

/** Marcas sociais saíram do lucide-react 1.x; o traço segue o mesmo contrato do Icon. */
function brandIcon(name: string, markup: ReactNode): LucideIcon {
  const Component = forwardRef<SVGSVGElement, LucideProps>(function BrandIcon(
    { size = 24, strokeWidth = 2, absoluteStrokeWidth, color = 'currentColor', ...props },
    ref,
  ) {
    const numericSize = Number(size) || 24
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={
          absoluteStrokeWidth ? (Number(strokeWidth) * 24) / numericSize : strokeWidth
        }
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
      >
        {markup}
      </svg>
    )
  })
  Component.displayName = name
  return Component as unknown as LucideIcon
}

const Linkedin = brandIcon(
  'Linkedin',
  <>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </>,
)

const Instagram = brandIcon(
  'Instagram',
  <>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </>,
)

const Facebook = brandIcon(
  'Facebook',
  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
)

const socialLinks = [
  {
    label: 'LinkedIn',
    href: contact.social.linkedin,
    icon: Linkedin,
  },
  {
    label: 'Instagram',
    href: contact.social.instagram,
    icon: Instagram,
  },
  {
    label: 'Facebook',
    href: contact.social.facebook,
    icon: Facebook,
  },
] as const

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-blue-deep pb-24 text-cream md:pb-28">
      <div className="container-site py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="mb-7">
              <Logo light />
            </div>
            <p className="max-w-md text-[0.9375rem] font-medium leading-relaxed text-white">
              {contact.identification}
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/55">
              {contact.department}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              {socialLinks.map((item) =>
                item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-cream transition-colors hover:border-orange hover:bg-orange hover:text-blue-deep focus-visible:outline-orange"
                  >
                    <Icon icon={item.icon} size={18} strokeWidth={1.75} />
                  </a>
                ) : null,
              )}
            </div>
          </div>

          <div className="lg:col-span-4">
            <h2 className="text-sm font-medium text-cream/50">Contato</h2>
            <address className="mt-5 not-italic space-y-3.5 text-sm leading-relaxed text-cream/80">
              <p className="flex items-start gap-2.5">
                <Icon icon={MapPin} size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-orange" />
                <span>{contact.address}</span>
              </p>
              {contact.whatsappNumber ? (
                <p>
                  <a
                    href={getWhatsAppHref()}
                    target={getWhatsAppTarget()}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-white no-underline transition-colors hover:text-orange"
                  >
                    <Icon icon={MessageCircle} size={16} strokeWidth={1.75} className="shrink-0 text-orange" />
                    <span>
                      WhatsApp{' '}
                      <span className="underline decoration-orange/60 underline-offset-4">
                        {contact.whatsappNumber}
                      </span>
                    </span>
                  </a>
                </p>
              ) : (
                <p className="flex items-center gap-2.5 text-cream/70">
                  <Icon icon={MessageCircle} size={16} strokeWidth={1.75} className="shrink-0 text-orange" />
                  WhatsApp [número oficial]
                </p>
              )}
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2.5 text-white no-underline transition-colors hover:text-orange"
                >
                  <Icon icon={Mail} size={16} strokeWidth={1.75} className="shrink-0 text-orange" />
                  <span className="underline decoration-cream-light/40 underline-offset-4 hover:decoration-orange">
                    {contact.email}
                  </span>
                </a>
              </p>
            </address>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-sm font-medium text-cream/55">Links</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <a
                  href={contact.ecaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/80 no-underline transition-colors hover:text-white"
                >
                  ECA-USP
                </a>
              </li>
              {socialLinks.map((item) =>
                item.href ? (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-cream/80 no-underline transition-colors hover:text-white"
                    >
                      <Icon icon={item.icon} size={15} strokeWidth={1.75} />
                      {item.label}
                    </a>
                  </li>
                ) : null,
              )}
              <li>
                {contact.privacyPolicyUrl ? (
                  <a
                    href={contact.privacyPolicyUrl}
                    className="text-cream/80 no-underline transition-colors hover:text-white"
                  >
                    Política de privacidade
                  </a>
                ) : (
                  <span className="text-cream/40">Política de privacidade [pendente]</span>
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-4 text-xs text-cream/55 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <img
                src={logoEcaUsp2017}
                alt="Logo ECA USP"
                className="h-6 w-auto object-contain brightness-0 invert opacity-75"
              />
              <p>Escola de Comunicações e Artes · Universidade de São Paulo</p>
            </div>
            <p>
              Informações atualizadas em{' '}
              {contact.updatedAt ?? '[data da revisão]'}
            </p>
          </div>
          <p className="mt-5 text-xs text-cream/45">
            Desenvolvido por{' '}
            <a
              href="https://bliainteligencia.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-orange hover:decoration-orange"
            >
              Blia Inteligência
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
