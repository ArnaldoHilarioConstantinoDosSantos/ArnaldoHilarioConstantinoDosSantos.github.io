import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  /** Número da seção, como "02". */
  number: string
  eyebrow: string
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function Section({ id, number, eyebrow, title, description, children, className = '' }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className={`py-16 sm:py-24 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal className="mb-10 max-w-3xl sm:mb-14">
          <p className="eyebrow mb-4 flex items-center gap-3 text-accent">
            <span>{number}</span>
            <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
            <span className="text-muted">{eyebrow}</span>
          </p>
          <h2 id={`${id}-titulo`} className="text-gradient text-3xl sm:text-[2.75rem]">
            {title}
          </h2>
          {description && <p className="mt-5 text-lg leading-relaxed text-muted">{description}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  )
}
