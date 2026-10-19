interface BannerImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  aspect?: '16/9' | '4/3' | '3/2' | 'natural'
}

/** Intentionally image-free composition studies; original photographs are not loaded. */
export function BannerImage({ alt, className = '', aspect = '16/9' }: BannerImageProps) {
  return <figure className={`editorial-placeholder ${className}`} data-aspect={aspect} aria-label={`Placeholder de imagem: ${alt}`}>
    <div className="placeholder-grid" aria-hidden="true" />
    <div className="placeholder-orbit" aria-hidden="true" />
    <div className="placeholder-window" aria-hidden="true"><span>G</span></div>
    <figcaption><span>GESTCORP / ECA-USP</span><span>Estudo de imagem ↗</span></figcaption>
  </figure>
}
