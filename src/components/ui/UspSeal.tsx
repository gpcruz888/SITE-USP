import seloClaro from '@/img/selo-usp-claro.png'
import seloEscuro from '@/img/selo-usp-escuro.png'

interface UspSealProps {
  /** Fundo da seção: claro usa o selo de fundo claro, escuro usa o de fundo escuro. */
  tone?: 'light' | 'dark'
  corner?: 'top-right' | 'bottom-right'
  inline?: boolean
}

/** Selo USP. O tom segue o fundo da seção. */
export function UspSeal({ tone = 'light', inline = false }: UspSealProps) {
  if (!inline) return null
  const src = tone === 'dark' ? seloEscuro : seloClaro
  const alt = 'ECA-USP'

  return <img src={src} alt={alt} className="usp-seal-inline" />
}
