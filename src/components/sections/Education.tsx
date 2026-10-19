import { Award, GraduationCap, Languages } from 'lucide-react'
import { certifications, education, languages } from '../../data/experience'
import { Card } from '../ui/Card'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

export function Education() {
  const hasCertifications = certifications.length > 0

  return (
    <Section
      id="formacao"
      number="05"
      eyebrow={hasCertifications ? 'Formação e certificações' : 'Formação'}
      title="Base acadêmica e idiomas"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {education.map((item) => (
          <Reveal key={item.title}>
            <Card interactive className="flex h-full gap-4 p-6">
              <span className="icon-chip">
                <GraduationCap className="size-[1.125rem]" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg">{item.title}</h3>
                <p className="mt-1 text-muted">{item.institution}</p>
                <p className="mt-3 font-mono text-xs text-subtle">{item.period}</p>
              </div>
            </Card>
          </Reveal>
        ))}

        <Reveal delay={0.06}>
          <Card interactive className="flex h-full gap-4 p-6">
            <span className="icon-chip">
              <Languages className="size-[1.125rem]" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-lg">Idiomas</h3>
              <ul className="mt-1 space-y-1">
                {languages.map((language) => (
                  <li key={language.name} className="text-muted">
                    <span className="text-fg">{language.name}</span> — {language.level}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </Reveal>

        {certifications.map((certification) => (
          <Reveal key={certification.title}>
            <Card interactive className="flex h-full gap-4 p-6">
              <span className="icon-chip">
                <Award className="size-[1.125rem]" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg">
                  {certification.url ? (
                    <a href={certification.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                      {certification.title}
                    </a>
                  ) : (
                    certification.title
                  )}
                </h3>
                <p className="mt-1 text-muted">{certification.issuer}</p>
                <p className="mt-3 font-mono text-xs text-subtle">{certification.year}</p>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
