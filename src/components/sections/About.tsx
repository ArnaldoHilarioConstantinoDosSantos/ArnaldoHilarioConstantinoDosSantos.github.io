import { aboutParagraphs, aboutPillars } from '../../data/profile'
import { Card } from '../ui/Card'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

export function About() {
  return (
    <Section id="sobre" number="01" eyebrow="Sobre mim" title="Da rotina da operação ao sistema que a sustenta">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
          {aboutParagraphs.map((paragraph, index) => (
            <p key={index} className={index === 0 ? 'text-fg' : undefined}>
              {paragraph}
            </p>
          ))}
        </Reveal>

        <ul className="grid content-start gap-4 sm:grid-cols-2">
          {aboutPillars.map((pillar, index) => (
            <li key={pillar.title}>
              <Reveal delay={index * 0.06} className="h-full">
                <Card interactive className="h-full p-5">
                  <span className="icon-chip">
                    <pillar.icon className="size-[1.125rem]" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base">{pillar.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{pillar.description}</p>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
