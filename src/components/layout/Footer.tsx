import { contact, getWhatsAppHref, getWhatsAppTarget } from '@/data/contact'
import { Logo } from '@/components/ui/Logo'
import logoEcaUsp from '@/img/ECA-USP_Logotipo.pdf-1-1024x226.webp'
import logoEcaUsp2017 from '@/img/logo_ECA_USP_2017.png'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-graphite pb-24 text-cream-light md:pb-28">
      <div className="container-site py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="mb-7 flex flex-wrap items-center gap-5">
              <Logo light />
              <div className="h-7 w-px bg-white/15" aria-hidden="true" />
              <img
                src={logoEcaUsp}
                alt="ECA-USP — Escola de Comunicações e Artes da Universidade de São Paulo"
                className="h-7 w-auto object-contain brightness-0 invert opacity-85 transition-opacity hover:opacity-100"
              />
            </div>
            <p className="max-w-md text-[0.9375rem] font-medium leading-relaxed text-white">
              {contact.identification}
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-cream-light/55">
              {contact.department}
            </p>
          </div>

          <div className="lg:col-span-4">
            <h2 className="text-sm font-medium text-cream-light/50">Contato</h2>
            <address className="mt-5 not-italic space-y-4 text-sm leading-relaxed text-cream-light/80">
              <p>{contact.address}</p>
              <p>
                Secretaria do Gestcorp:{' '}
                {contact.whatsappNumber ? (
                  <a
                    href={getWhatsAppHref()}
                    target={getWhatsAppTarget()}
                    rel="noopener noreferrer"
                    className="text-white underline decoration-orange/60 underline-offset-4 transition-colors hover:text-orange hover:decoration-orange"
                  >
                    WhatsApp {contact.whatsappNumber}
                  </a>
                ) : (
                  <span className="text-cream-light/70">WhatsApp [número oficial]</span>
                )}{' '}
                ·{' '}
                <a
                  href={`mailto:${contact.email}`}
                  className="text-white underline decoration-cream-light/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
                >
                  {contact.email}
                </a>
              </p>
            </address>
          </div>

          {/* Coluna Links */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-medium text-cream-light/55">Links</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <a
                  href={contact.ecaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-light/80 no-underline transition-colors hover:text-white"
                >
                  ECA-USP
                </a>
              </li>
              <li>
                {contact.social.instagram ? (
                  <a
                    href={contact.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream-light/80 no-underline transition-colors hover:text-white"
                  >
                    Instagram
                  </a>
                ) : (
                  <span className="text-cream-light/40">Instagram [pendente]</span>
                )}
              </li>
              <li>
                {contact.social.linkedin ? (
                  <a
                    href={contact.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream-light/80 no-underline transition-colors hover:text-white"
                  >
                    LinkedIn
                  </a>
                ) : (
                  <span className="text-cream-light/40">LinkedIn [pendente]</span>
                )}
              </li>
              <li>
                {contact.privacyPolicyUrl ? (
                  <a
                    href={contact.privacyPolicyUrl}
                    className="text-cream-light/80 no-underline transition-colors hover:text-white"
                  >
                    Política de privacidade
                  </a>
                ) : (
                  <span className="text-cream-light/40">Política de privacidade [pendente]</span>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Linha Inferior com Copyright, Selo ECA-USP e Revisão */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-4 text-xs text-cream-light/60 sm:flex-row sm:items-center sm:justify-between">
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
        </div>
      </div>
    </footer>
  )
}

