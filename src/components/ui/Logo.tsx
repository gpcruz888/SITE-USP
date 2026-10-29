import logoGestcorp from '@/img/optimized/logo-gestcorp.png'
import logoEcaUsp from '@/img/image 3 (1).png'
import logoEcaUspBranco from '@/img/image 3.png'
import logoGestcorpHero from '@/img/optimized/logo-ges-hero.png'

interface LogoProps {
  className?: string
  compact?: boolean
  light?: boolean
  eca?: boolean
  gestcorp?: boolean
}

/** Marca institucional Gestcorp / ECA-USP */
export function Logo({ className = '', compact = false, light = false, eca = false, gestcorp = false }: LogoProps) {
  if (gestcorp) {
    return (
      <span className={['inline-flex items-center', className].join(' ')}>
        <img src={logoGestcorpHero} alt="Gestcorp" className="hero-gestcorp-logo h-auto w-[170px] md:w-[190px]" />
      </span>
    )
  }

  if (eca) {
    return (
      <span className={['inline-flex items-center', className].join(' ')}>
        <img
          src={light ? logoEcaUspBranco : logoEcaUsp}
          alt="ECA - Escola de Comunicações e Artes da USP"
          className="header-eca-logo w-auto object-contain transition-opacity duration-200"
        />
      </span>
    )
  }

  return (
    <span className={['inline-flex items-center', className].join(' ')}>
      <img
        src={logoGestcorp}
        alt="Gestcorp ECA-USP"
        className={[
          'w-auto object-contain transition-opacity duration-200',
          compact ? 'h-8 max-w-[220px]' : 'h-10 max-w-[250px] md:h-12 md:max-w-[340px]',
          light ? 'brightness-0 invert' : '',
        ].filter(Boolean).join(' ')}
      />
    </span>
  )
}

