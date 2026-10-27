import { UspSeal } from '@/components/ui/UspSeal'

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
  src?: string
  seal?: boolean
}

const variantClass: Record<Variant, string> = {
  wide: 'media-frame--wide',
  landscape: 'media-frame--landscape',
  tall: 'media-frame--tall',
  square: 'media-frame--square',
}

const treatmentClass: Record<Treatment, string> = {
  default: '',
  bleed: '',
  offset: '',
  'round-top': '',
}

const toneClass: Record<NonNullable<MediaFrameProps['tone']>, string> = {
  cream: 'bg-placeholder text-blue',
  blue: 'bg-blue-deep text-cream',
  warm: 'bg-blue-soft text-blue',
}

export function MediaFrame({
  label,
  caption = 'Gestcorp · ECA-USP',
  mark = 'G',
  variant = 'landscape',
  treatment = 'default',
  className = '',
  tone = 'cream',
  src,
  seal = false,
}: MediaFrameProps) {
  const hasPhoto = Boolean(src)

  return (
    <figure
      className={[
        'media-frame overflow-hidden rounded-lg',
        variantClass[variant],
        treatmentClass[treatment],
        hasPhoto ? 'media-frame--photo' : toneClass[tone],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role={hasPhoto ? undefined : 'img'}
      aria-label={hasPhoto ? undefined : label}
    >
      {hasPhoto ? (
        <img
          src={src}
          alt={label}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="media-frame__mark" aria-hidden="true">
          {mark}
        </span>
      )}
      {seal ? <UspSeal corner="top-right" /> : null}
      {caption ? (
        <figcaption className="media-frame__caption">
          <span>{caption}</span>
        </figcaption>
      ) : null}
    </figure>
  )
}
