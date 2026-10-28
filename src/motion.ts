const groups: { selector: string; stagger: boolean }[] = [
  { selector: 'main section:not(.home-hero) h2', stagger: false },
  { selector: '.course-main-image, .institution-panorama, .history-section .media-frame', stagger: false },
  { selector: '.institution-pillars .soft-card', stagger: true },
  { selector: '.experience-section li', stagger: true },
  { selector: '.audience-section [role="listitem"]', stagger: true },
  { selector: '.module-shell', stagger: false },
  { selector: '.trabalho-final-band .container-site > div', stagger: false },
  { selector: '.history-section ol > li', stagger: true },
  { selector: '.admissions-section .soft-card', stagger: true },
  { selector: '.faq-section .border-t > .border-b', stagger: true },
  { selector: '.enrollment-section > .grid > div:last-child', stagger: false },
  { selector: '.closing-section .container-site', stagger: false },
]

export function initMotion() {
  const root = document.documentElement
  if (root.dataset.motion === 'on') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (typeof IntersectionObserver === 'undefined') return
  root.dataset.motion = 'on'

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target as HTMLElement
        el.classList.add('is-in')
        observer.unobserve(el)
        el.addEventListener(
          'animationend',
          () => {
            el.classList.remove('rise', 'is-in')
            el.style.animationDelay = ''
          },
          { once: true },
        )
      })
    },
    { rootMargin: '0px 0px -32px 0px', threshold: 0.12 },
  )

  document.addEventListener(
    'focusin',
    (event) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const block = target.closest<HTMLElement>('.rise')
      if (!block) return
      block.classList.add('is-in')
      observer.unobserve(block)
    },
    true,
  )

  const seen = new Set<HTMLElement>()
  const viewLimit = window.innerHeight - 8

  groups.forEach(({ selector, stagger }) => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector)).filter((el) => {
      if (seen.has(el) || el.closest('.home-hero') || el.closest('.reveal')) return false
      seen.add(el)
      return el.getBoundingClientRect().top >= viewLimit
    })

    if (stagger) {
      const byParent = new Map<HTMLElement, HTMLElement[]>()
      nodes.forEach((el) => {
        const parent = el.parentElement
        if (!parent) return
        const list = byParent.get(parent) ?? []
        list.push(el)
        byParent.set(parent, list)
      })
      byParent.forEach((list) => {
        list.forEach((el, index) => {
          el.style.animationDelay = `${Math.min(index, 4) * 70}ms`
        })
      })
    }

    nodes.forEach((el) => {
      el.classList.add('rise')
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
