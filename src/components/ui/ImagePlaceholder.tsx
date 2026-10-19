type Aspect = 'hero' | 'portrait' | 'landscape' | 'banner' | 'square'

const aspectClasses: Record<Aspect, string> = {
  hero: 'aspect-[16/9]',
  portrait: 'aspect-[4/5]',
  landscape: 'aspect-[4/3]',
  banner: 'aspect-[16/9]',
  square: 'aspect-square',
}

interface ImagePlaceholderProps {
  label: string
  aspect?: Aspect
  className?: string
  initials?: string
}

export function ImagePlaceholder({
  label,
  aspect = 'portrait',
  className = '',
  initials,
}: ImagePlaceholderProps) {
  return (
    <div
      className={[
        'relative flex flex-col items-center justify-center overflow-hidden bg-cream-muted/40 text-graphite-muted transition-colors',
        'border border-border/60',
        aspectClasses[aspect],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="img"
      aria-label={label}
    >
      {initials ? (
        <span className="font-sans text-2xl font-medium tracking-[-0.03em] text-graphite-light/80">
          {initials}
        </span>
      ) : (
        <svg
          width="36"
          height="36"
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
          className="text-graphite-light/50"
        >
          <circle cx="20" cy="15" r="6" stroke="currentColor" strokeWidth="1.2" />
          <path
            d="M8 34c0-6.627 5.373-12 12-12s12 5.373 12 12"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      )}
      <span className="mt-3 max-w-[85%] px-3 text-center text-xs font-normal tracking-wide text-graphite-light">
        {label}
      </span>
    </div>
  )
}

