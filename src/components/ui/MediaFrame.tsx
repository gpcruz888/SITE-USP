type Variant = 'wide' | 'landscape' | 'tall' | 'square'
type Treatment = 'default' | 'bleed' | 'offset' | 'round-top'

interface MediaFrameProps {
  label: string
  caption?: string
  mark?: string
  variant?: Variant
  treatment?: Treatment
  className?: string
  tone?: 'cream' | 'blue' | 'warm'
}

const variantClass: Record<Variant, string> = {
  wide: 'media-frame--wide',
  landscape: 'media-frame--landscape',
  tall: 'media-frame--tall',
  square: 'media-frame--square',
}

const treatmentClass: Record<Treatment, string> = {
  default: '',
  bleed: 'media-frame--bleed',
  offset: 'media-frame--offset',
  'round-top': 'media-frame--round-top',
}

const toneClass: Record<NonNullable<MediaFrameProps['tone']>, string> = {
  cream: 'bg-placeholder text-blue',
  blue: 'bg-blue-dark text-cream',
  warm: 'bg-cream-muted text-blue',
}

export function MediaFrame({
  label,
  caption = 'Gestcorp · ECA-USP',
  mark = 'G',
  variant = 'landscape',
  treatment = 'default',
  className = '',
  tone = 'cream',
}: MediaFrameProps) {
  return (
    <figure
      className={[
        'media-frame',
        variantClass[variant],
        treatmentClass[treatment],
        toneClass[tone],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="img"
      aria-label={label}
    >
      <div className="media-frame__grid" aria-hidden="true" />
      <div className="media-frame__arc" aria-hidden="true" />
      <span className="media-frame__mark" aria-hidden="true">
        {mark}
      </span>
      <figcaption className="media-frame__caption">
        <span>{caption}</span>
        <span>{label}</span>
      </figcaption>
    </figure>
  )
}
