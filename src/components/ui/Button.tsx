import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse' | 'outline-light' | 'text'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary:
    'bg-orange text-blue-deep hover:bg-orange-dark focus-visible:outline-blue border border-transparent',
  secondary:
    'bg-blue text-white hover:bg-blue-dark focus-visible:outline-blue-deep border border-transparent',
  ghost:
    'bg-transparent text-blue border border-blue/40 hover:bg-blue-soft focus-visible:outline-blue',
  inverse:
    'bg-cream-warm text-blue-deep border border-transparent hover:bg-cream-light focus-visible:outline-white',
  'outline-light':
    'bg-transparent text-white border border-white/50 hover:bg-white/10 hover:border-white focus-visible:outline-white',
  text:
    'bg-transparent text-blue hover:text-blue-dark border-0 rounded-none px-0 py-1 min-h-0 underline-offset-4 hover:underline',
}

const sizes: Record<Size, string> = {
  sm: 'px-5 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm tracking-tight',
  lg: 'px-8 py-3.5 text-base tracking-tight',
}

type CommonProps = {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export type ButtonProps = ButtonAsButton | ButtonAsLink

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const classes = [
    `site-button site-button--${variant}`,
    'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200',
    variant !== 'text'
      ? 'min-h-[2.75rem] rounded-full cursor-pointer no-underline text-center'
      : 'cursor-pointer no-underline',
    variants[variant],
    variant !== 'text' ? sizes[size] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if ('href' in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  const buttonProps = props as ButtonAsButton
  return (
    <button type={buttonProps.type ?? 'button'} className={classes} {...buttonProps}>
      {children}
    </button>
  )
}
