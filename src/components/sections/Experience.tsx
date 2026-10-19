import { MapPin } from 'lucide-react'
import { experiences } from '../../data/experience'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { Tag } from '../ui/Tag'

export function Experience() {
  return (
    <Section id="experiencia" number="04" eyebrow="Experiência profissional" title="Onde tenho trabalhado">
      <ol className="relative space-y-12 before:absolute before:inset-y-2 before:left-[5px] before:w-px before:bg-line-strong sm:before:left-[calc(11rem+5px)]">
        {experiences.map((experience) => (
          <li key={experience.company}>
            <Reveal className="relative grid gap-3 pl-9 sm:grid-cols-[11rem_1fr] sm:gap-0 sm:pl-0">
              <span aria-hidden="true" className="absolute left-0 top-1.5 flex size-[11px] sm:left-[11rem]">
                {experience.current && (
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                )}
                <span
                  className={`relative inline-flex size-[11px] rounded-full border-2 border-bg ${
                    experience.current ? 'bg-accent' : 'bg-line-strong'
                  }`}
                />
              </span>
              <p className="font-mono text-sm text-subtle sm:pr-8 sm:text-right">{experience.period}</p>

              <div className="sm:pl-10">
                <h3 className="flex flex-wrap items-center gap-3 text-xl">
                  {experience.role}
                  {experience.current && (
                    <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[0.6875rem] font-medium tracking-normal text-accent">
                      Atual
                    </span>
                  )}
                </h3>
                <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
                  <span className="font-medium text-fg">{experience.company}</span>
                  <span className="inline-flex items-center gap-1 text-sm">
                    <MapPin className="size-3.5" aria-hidden="true" />
                    {experience.location}
                  </span>
                </p>

                <ul className="mt-4 space-y-2.5">
                  {experience.responsibilities.map((responsibility) => (
                    <li key={responsibility} className="flex gap-3 leading-relaxed text-muted">
                      <span className="mt-[0.7rem] size-1 shrink-0 rounded-full bg-subtle" aria-hidden="true" />
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
