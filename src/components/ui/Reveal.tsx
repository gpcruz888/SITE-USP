import { createElement, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delayMs?: number
  as?: 'div' | 'li' | 'span' | 'article'
}

/** Mantém a marcação das listas. A entrada na rolagem fica no script global, para o conteúdo continuar visível se o JavaScript falhar. */
export function Reveal({ children, className = '', as = 'div' }: RevealProps) {
  return createElement(as, { className }, children)
}
