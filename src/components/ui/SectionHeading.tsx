import type { ReactNode } from 'react'

interface SectionHeadingProps {
  title: string
  children?: ReactNode
  light?: boolean
  className?: string
  id?: string
  large?: boolean
}

export function SectionHeading({
  title,
  children,
  light = false,
  className = '',
  id,
  large = false,
}: SectionHeadingProps) {
  return (
    <header className={['mb-12 max-w-4xl md:mb-16', className].join(' ')}>
      <h2
        id={id}
        className={[
          large ? 'text-display-lg' : 'text-display',
          light ? 'text-white' : 'text-graphite',
        ].join(' ')}
      >
        {title}
      </h2>
      {children && (
        <div
          className={[
            'prose-editorial mt-6',
            light ? 'text-cream/85 [&_p]:text-cream/85' : '',
          ].join(' ')}
        >
          {children}
        </div>
      )}
    </header>
  )
}
