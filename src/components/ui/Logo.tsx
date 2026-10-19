import logoGestcorp from '@/img/optimized/logo-gestcorp.png'

interface LogoProps {
  className?: string
  compact?: boolean
  light?: boolean
}

/** Marca institucional Gestcorp ECA-USP */
export function Logo({ className = '', compact = false, light = false }: LogoProps) {
  return (
    <span className={['inline-flex items-center', className].join(' ')}>
      <img
        src={logoGestcorp}
        alt="Gestcorp ECA-USP"
        className={[
          'w-auto object-contain transition-opacity duration-200',
          compact ? 'h-7 md:h-8' : 'h-9 md:h-11',
          light ? 'brightness-0 invert' : '',
        ].filter(Boolean).join(' ')}
      />
    </span>
  )
}

