import { getWhatsAppHref, getWhatsAppTarget } from '@/data/contact'

export function WhatsAppFab() {
  const href = getWhatsAppHref()
  const target = getWhatsAppTarget()

  return (
    <a
      href={href}
      target={target}
      rel={target ? 'noopener noreferrer' : undefined}
      className="whatsapp-fab"
      aria-label="Falar pelo WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" fill="currentColor">
        <path d="M16.004 4C9.377 4 4 9.352 4 15.95c0 2.11.554 4.168 1.607 5.98L4 28l6.28-1.643A12.02 12.02 0 0 0 16.004 28C22.63 28 28 22.648 28 16.05 28 9.352 22.63 4 16.004 4Zm6.99 17.01c-.29.816-1.69 1.498-2.34 1.594-.6.087-1.36.124-2.196-.138-.507-.16-1.157-.375-1.997-.734-3.515-1.515-5.8-5.03-5.976-5.264-.175-.233-1.427-1.896-1.427-3.617 0-1.72.903-2.565 1.223-2.915.32-.35.698-.438.931-.438.233 0 .466.002.67.012.215.01.504-.081.788.6.29.7.986 2.41 1.073 2.585.087.175.145.379.029.612-.116.233-.175.379-.35.583-.175.204-.37.455-.525.612-.175.175-.357.364-.153.714.204.35.908 1.498 1.95 2.425 1.34 1.193 2.47 1.563 2.82 1.738.35.175.554.146.758-.087.204-.233.875-1.02 1.108-1.37.233-.35.466-.292.787-.175.32.116 2.04.962 2.39 1.136.35.175.583.262.67.408.087.146.087.846-.203 1.662Z" />
      </svg>
      <span className="whatsapp-fab__pulse" aria-hidden="true" />
    </a>
  )
}
