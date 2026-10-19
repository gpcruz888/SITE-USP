import type { LucideIcon, LucideProps } from 'lucide-react'

interface IconProps extends LucideProps {
  icon: LucideIcon
}

/** Ícones lineares Lucide com espessura consistente. */
export function Icon({ icon: Lucide, className = '', size = 20, strokeWidth = 1.5, ...props }: IconProps) {
  return (
    <Lucide
      size={size}
      strokeWidth={strokeWidth}
      absoluteStrokeWidth
      className={['shrink-0', className].join(' ')}
      aria-hidden={props['aria-label'] ? undefined : true}
      {...props}
    />
  )
}
