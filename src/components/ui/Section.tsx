import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  /** Número da fase, como "1-2". */
  level: string
  eyebrow: string
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function Section({ id, level, eyebrow, title, description, children, className = '' }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className={`py-20 sm:py-24 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal className="mb-10 max-w-3xl sm:mb-14">
          <p className="label mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-accent">
            <span className="bg-accent px-2 py-1 text-on-accent">Fase {level}</span>
            {eyebrow}
          </p>
          <h2 id={`${id}-titulo`} className="pixel-shadow text-lg sm:text-2xl">
            {title}
          </h2>
          {description && <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  )
}
