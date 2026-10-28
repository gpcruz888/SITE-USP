type Kind = 'up' | 'fade' | 'left' | 'right' | 'scale'

const kinds: Kind[] = ['up', 'fade', 'left', 'right', 'scale']

/** Blocos maiores primeiro, para um filho não animar de novo dentro do pai. */
const groups: { selector: string; kind: Kind; stagger?: boolean; delay?: number }[] = [
  { selector: '.course-description', kind: 'left' },
  { selector: '.course-visual', kind: 'scale' },
  { selector: '.institution-section .container-site > .grid > div', kind: 'left' },
  { selector: '.institution-section .container-site > .grid > p', kind: 'right', delay: 80 },
  { selector: '.institution-panorama', kind: 'fade' },
  { selector: '.institution-pillars .soft-card', kind: 'scale', stagger: true },
  { selector: '.audience-section .container-site > .grid > div:first-child', kind: 'left' },
  { selector: '.audience-section .container-site > .grid > div:last-child', kind: 'right', delay: 80 },
  { selector: '.audience-section [role="listitem"]', kind: 'up', stagger: true },
  { selector: '.audience-section .container-site > div.mt-12', kind: 'up' },
  { selector: '.strategy-section .grid > div:first-child', kind: 'left' },
  { selector: '.strategy-section .grid > div:last-child', kind: 'right', delay: 80 },
  { selector: '.experience-section .grid > div:first-child', kind: 'left' },
  { selector: '.experience-section li', kind: 'up', stagger: true },
  { selector: '.curriculum-section .container-site > .grid > h2', kind: 'left' },
  { selector: '.curriculum-section .container-site > .grid > p', kind: 'right', delay: 80 },
  { selector: '.module-shell', kind: 'up' },
  { selector: '.trabalho-final-band .container-site > div', kind: 'scale' },
  { selector: '.faculty-section .grid > div:first-child', kind: 'left' },
  { selector: '.faculty-section .grid > div:last-child', kind: 'scale', delay: 80 },
  { selector: '.history-section .media-frame', kind: 'fade' },
  { selector: '.history-section .grid > div:last-child > h2', kind: 'up' },
  { selector: '.history-section .grid > div:last-child > p', kind: 'up', delay: 90 },
  { selector: '.history-section ol > li', kind: 'up', stagger: true },
  { selector: '.history-section .mt-12.grid > div', kind: 'scale', stagger: true },
  { selector: '.enrollment-section > .grid > div:first-child', kind: 'fade' },
  { selector: '.enrollment-section > .grid > div:last-child', kind: 'right', delay: 70 },
  { selector: '.admissions-section .max-w-2xl', kind: 'up' },
  { selector: '.admissions-section ol > li', kind: 'scale', stagger: true },
  { selector: '.admissions-section .container-site > .mt-10', kind: 'up', delay: 80 },
  { selector: '.faq-section .grid > div:first-child', kind: 'up' },
  { selector: '.faq-section .border-t > .border-b', kind: 'up', stagger: true },
  { selector: '.closing-section .closing-photo', kind: 'fade' },
  { selector: '.closing-section .max-w-2xl', kind: 'up', delay: 70 },
  { selector: 'footer', kind: 'up' },
]

function hasMotion(el: Element) {
  return kinds.some((kind) => el.classList.contains(`motion-${kind}`))
}

function insideMotion(el: HTMLElement) {
  let parent = el.parentElement
  while (parent) {
    if (hasMotion(parent)) return true
    parent = parent.parentElement
  }
  return false
}

export function initMotion() {
  const root = document.documentElement
  if (root.dataset.motion === 'on') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (typeof IntersectionObserver === 'undefined') return
  root.dataset.motion = 'on'

  const finish = (el: HTMLElement) => {
    el.classList.remove('is-in', ...kinds.map((kind) => `motion-${kind}`))
    el.style.animationDelay = ''
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const fresh = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target as HTMLElement)
      const batches = new Map<HTMLElement, HTMLElement[]>()
      fresh.forEach((el) => {
        if (el.dataset.stagger !== '1' || !el.parentElement) return
        const list = batches.get(el.parentElement) ?? []
        list.push(el)
        batches.set(el.parentElement, list)
      })
      fresh.forEach((el) => {
        let delay = Number(el.dataset.delay || 0)
        if (el.dataset.stagger === '1' && el.parentElement) {
          const index = (batches.get(el.parentElement) ?? []).indexOf(el)
          delay = Math.min(Math.max(index, 0), 4) * 80
        }
        if (delay) el.style.animationDelay = `${delay}ms`
        el.classList.add('is-in')
        observer.unobserve(el)
        const onEnd = (event: AnimationEvent) => {
          if (event.target !== el) return
          el.removeEventListener('animationend', onEnd)
          finish(el)
        }
        el.addEventListener('animationend', onEnd)
        window.setTimeout(() => finish(el), 900)
      })
    },
    { rootMargin: '0px 0px 12% 0px', threshold: 0.01 },
  )

  document.addEventListener(
    'focusin',
    (event) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const block = target.closest<HTMLElement>(kinds.map((kind) => `.motion-${kind}`).join(','))
      if (!block || block.classList.contains('is-in')) return
      block.classList.add('is-in')
      observer.unobserve(block)
    },
    true,
  )

  const seen = new Set<HTMLElement>()
  const viewLimit = window.innerHeight * 0.86

  groups.forEach(({ selector, kind, stagger, delay }) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      if (seen.has(el) || el.closest('.home-hero') || insideMotion(el)) return
      seen.add(el)
      if (el.getBoundingClientRect().top <= viewLimit) return
      el.classList.add(`motion-${kind}`)
      if (stagger) el.dataset.stagger = '1'
      if (delay) el.dataset.delay = String(delay)
      observer.observe(el)
    })
  })
}

export function startMotion() {
  const run = (tries = 0) => {
    if (document.querySelector('main section')) {
      initMotion()
      return
    }
    if (tries < 40) requestAnimationFrame(() => run(tries + 1))
  }
  run()
}
