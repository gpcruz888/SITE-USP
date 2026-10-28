import seloClaro from '@/img/selo-usp-claro.png'
import seloEscuro from '@/img/selo-usp-escuro.png'

interface UspSealProps {
  /** Fundo da seção: claro usa o selo de fundo claro, escuro usa o de fundo escuro. */
  tone?: 'light' | 'dark'
  corner?: 'top-right' | 'bottom-right'
  inline?: boolean
}

/** Selo USP. O tom segue o fundo da seção. */
export function UspSeal({ tone = 'light', corner = 'top-right', inline = false }: UspSealProps) {
  const src = tone === 'dark' ? seloEscuro : seloClaro
  const alt = 'ECA-USP'

  if (inline) {
    return <img src={src} alt={alt} className="usp-seal-inline" />
  }

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={['usp-seal', corner === 'top-right' ? 'usp-seal--top' : ''].filter(Boolean).join(' ')}
    />
  )
}
