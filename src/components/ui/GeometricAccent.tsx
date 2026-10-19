interface GeometricAccentProps {
  variant?: 'arc' | 'circle'
  className?: string
  color?: 'orange' | 'blue' | 'cream'
}

const colors = {
  orange: '#FF7900',
  blue: '#1D52A0',
  cream: '#EDE3DA',
}

export function GeometricAccent({
  variant = 'arc',
  className = '',
  color = 'orange',
}: GeometricAccentProps) {
  const stroke = colors[color]

  if (variant === 'circle') {
    return (
      <svg
        className={['pointer-events-none absolute', className].join(' ')}
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="90" stroke={stroke} strokeWidth="2" />
      </svg>
    )
  }

  return (
    <svg
      className={['pointer-events-none absolute', className].join(' ')}
      viewBox="0 0 320 160"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 140 A140 140 0 0 1 300 140"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}
