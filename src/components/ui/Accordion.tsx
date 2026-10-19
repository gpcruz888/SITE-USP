import { useId, useState, type ReactNode } from 'react'

interface AccordionItemProps {
  title: string
  subtitle?: string
  children: ReactNode
  defaultOpen?: boolean
  titleAs?: 'h3' | 'h4' | 'span'
  className?: string
}

export function AccordionItem({
  title,
  subtitle,
  children,
  defaultOpen = false,
  titleAs = 'h3',
  className = '',
}: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()
  const buttonId = useId()
  const TitleTag = titleAs

  return (
    <div className={['border-b border-border/70 transition-colors', className].join(' ')}>
      <TitleTag className="m-0 text-inherit font-inherit">
        <button
          type="button"
          id={buttonId}
          className="group flex w-full cursor-pointer items-start justify-between gap-6 bg-transparent py-6 text-left transition-colors hover:text-blue focus-visible:outline-blue focus-visible:outline-offset-2 md:py-7"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <div className="flex-1 pr-2">
            <span className="text-lg font-medium tracking-[-0.03em] text-graphite transition-colors group-hover:text-blue md:text-xl">
              {title}
            </span>
            {subtitle && (
              <span className="mt-1 block text-sm text-graphite-muted">
                {subtitle}
              </span>
            )}
          </div>
          <span
            className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center text-graphite-muted transition-transform duration-200 group-hover:text-blue"
            aria-hidden="true"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className={['transition-transform duration-200', open ? 'rotate-45' : ''].join(' ')}
            >
              <path
                d="M7 1v12M1 7h12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </button>
      </TitleTag>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className="pb-8 pt-1"
      >
        {children}
      </div>
    </div>
  )
}

interface AccordionProps {
  children: ReactNode
  className?: string
}

export function Accordion({ children, className = '' }: AccordionProps) {
  return <div className={['divide-y-0', className].join(' ')}>{children}</div>
}

