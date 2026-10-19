import { createElement, type CSSProperties, type ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'

interface RevealProps {
  children: ReactNode
  className?: string
  delayMs?: number
  as?: 'div' | 'li' | 'span' | 'article'
}

export function Reveal({
  children,
  className = '',
  delayMs = 0,
  as = 'div',
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>()
  const style: CSSProperties | undefined = delayMs
    ? { transitionDelay: `${delayMs}ms` }
    : undefined

  return createElement(
    as,
    {
      ref,
      className: ['reveal', inView ? 'is-visible' : '', className].filter(Boolean).join(' '),
      style,
    },
    children,
  )
}
