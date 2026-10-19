import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse' | 'text'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary:
    'bg-orange text-white hover:bg-orange-dark focus-visible:outline-blue border border-transparent shadow-none',
  secondary:
    'bg-transparent text-graphite border border-graphite/30 hover:border-graphite hover:bg-graphite/5 focus-visible:outline-blue',
  ghost:
    'bg-transparent text-blue border border-blue/40 hover:border-blue hover:bg-blue/5 focus-visible:outline-blue',
  inverse:
    'bg-white text-graphite border border-white hover:bg-cream-light focus-visible:outline-white',
  text:
    'bg-transparent text-blue hover:text-blue-dark border-b border-blue/30 hover:border-blue rounded-none px-0 py-1 min-h-0',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm tracking-tight',
  lg: 'px-7 py-3.5 text-base tracking-tight',
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
    'inline-flex items-center justify-center gap-2.5 font-medium transition-all duration-200',
    variant !== 'text' ? 'min-h-[2.75rem] rounded-[2px] cursor-pointer no-underline text-center' : 'cursor-pointer no-underline',
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

