import { MapPin } from 'lucide-react'
import { experiences } from '../../data/experience'
import { flag } from '../../game/sprites'
import { PixelSprite } from '../game/PixelSprite'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { Tag } from '../ui/Tag'

export function Experience() {
  return (
    <Section id="experiencia" level="1-4" eyebrow="Experiência profissional" title="Checkpoints" className="bg-bg-soft">
      <ol className="relative space-y-12 before:absolute before:inset-y-2 before:left-[6px] before:w-1 before:bg-line-strong sm:before:left-[calc(12rem+6px)]">
        {experiences.map((experience) => (
          <li key={experience.company}>
            <Reveal className="relative grid gap-3 pl-10 sm:grid-cols-[12rem_1fr] sm:gap-0 sm:pl-0">
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1 size-4 border-4 border-ink sm:left-[12rem] ${
                  experience.current ? 'blink bg-accent' : 'bg-surface-2'
                }`}
              />
              <p className="label text-subtle sm:pr-8 sm:pt-1 sm:text-right">{experience.period}</p>

              <div className="sm:pl-12">
                <h3 className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                  {experience.current && <PixelSprite sprite={flag} pixel={3} />}
                  {experience.role}
                </h3>
                <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
                  <span className="font-semibold text-accent">{experience.company}</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3.5" aria-hidden="true" />
                    {experience.location}
                  </span>
                </p>

                <ul className="mt-4 space-y-2.5">
                  {experience.responsibilities.map((responsibility) => (
                    <li key={responsibility} className="flex gap-3 leading-relaxed text-muted">
                      <span className="mt-2.5 size-1.5 shrink-0 bg-accent" aria-hidden="true" />
                      {responsibility}
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tecnologias">
                  {experience.stack.map((tech) => (
                    <li key={tech}>
                      <Tag>{tech}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
