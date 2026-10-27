import seloUsp from '@/img/selo-usp.png'

interface UspSealProps {
  corner?: 'top-right' | 'bottom-right'
  inline?: boolean
}

/** Lembrete visual da marca Gestcorp · ECA · USP. */
export function UspSeal({ corner = 'bottom-right', inline = false }: UspSealProps) {
  if (inline) {
    return (
      <img
        src={seloUsp}
        alt="Gestcorp · ECA · USP"
        className="usp-seal-inline"
      />
    )
  }

  return (
    <img
      src={seloUsp}
      alt=""
      aria-hidden="true"
      className={['usp-seal', corner === 'top-right' ? 'usp-seal--top' : ''].filter(Boolean).join(' ')}
    />
  )
}
