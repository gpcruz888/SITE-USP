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
          compact ? 'h-8 max-w-[220px]' : 'h-10 max-w-[250px] md:h-12 md:max-w-[340px]',
          light ? 'brightness-0 invert' : '',
        ].filter(Boolean).join(' ')}
      />
    </span>
  )
}

