import { aboutParagraphs, aboutPillars } from '../../data/profile'
import { Card } from '../ui/Card'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

export function About() {
  return (
    <Section id="sobre" level="1-1" eyebrow="Sobre mim" title="Da rotina da operação ao sistema que a sustenta">
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
          {aboutParagraphs.map((paragraph, index) => (
            <p key={index} className={index === 0 ? 'text-fg' : undefined}>
              {paragraph}
            </p>
          ))}
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {aboutPillars.map((pillar, index) => (
            <li key={pillar.title}>
              <Reveal delay={index * 0.08}>
                <Card className="flex gap-4 p-5">
                  <span className="qblock grid size-11 shrink-0 place-items-center">
                    <pillar.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-xs">{pillar.title}</h3>
                    <p className="mt-2 leading-snug text-muted">{pillar.description}</p>
                  </div>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
