import { useEffect, useState } from 'react'

const chapters = [
  {
    id: 'o-curso',
    label: 'O curso',
    sections: ['topo', 'o-curso', 'usp-eca', 'para-quem', 'pensamento'],
  },
  {
    id: 'experiencia',
    label: 'Experiência',
    sections: ['experiencia'],
  },
  {
    id: 'programa',
    label: 'Programa',
    sections: ['programa', 'professores', 'trajetoria'],
  },
  {
    id: 'turma-2027',
    label: 'Turma 2027',
    sections: ['turma-2027', 'processo', 'duvidas', 'encerramento'],
  },
] as const

export function ReadingNav() {
  const [active, setActive] = useState('o-curso')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const chapter = chapters.find((item) =>
              (item.sections as readonly string[]).includes(entry.target.id),
            )
            if (chapter) setActive(chapter.id)
          }
        })
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: 0 },
    )

    document.querySelectorAll('main > section').forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="reading-nav" aria-label="Etapas da leitura">
      {chapters.map((chapter, index) => (
        <a
          key={chapter.id}
          href={`#${chapter.id}`}
          aria-current={active === chapter.id ? 'location' : undefined}
        >
          <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          {chapter.label}
        </a>
      ))}
    </nav>
  )
}
