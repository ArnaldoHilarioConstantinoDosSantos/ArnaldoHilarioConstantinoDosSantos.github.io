import { Award, GraduationCap, Languages } from 'lucide-react'
import { certifications, education, languages } from '../../data/experience'
import { Card } from '../ui/Card'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

const iconBox = 'qblock grid size-12 shrink-0 place-items-center'

export function Education() {
  const hasCertifications = certifications.length > 0

  return (
    <Section
      id="formacao"
      level="1-5"
      eyebrow={hasCertifications ? 'Formação e certificações' : 'Formação'}
      title="Conquistas desbloqueadas"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {education.map((item) => (
          <Reveal key={item.title}>
            <Card className="flex h-full gap-4 p-6">
              <span className={iconBox}>
                <GraduationCap className="size-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-xs sm:text-sm">{item.title}</h3>
                <p className="mt-2 text-muted">{item.institution}</p>
                <p className="label mt-3 text-subtle">{item.period}</p>
              </div>
            </Card>
          </Reveal>
        ))}

        <Reveal delay={0.08}>
          <Card className="flex h-full gap-4 p-6">
            <span className={iconBox}>
              <Languages className="size-6" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-xs sm:text-sm">Idiomas</h3>
              <ul className="mt-2 space-y-1">
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
            <Card className="flex h-full gap-4 p-6">
              <span className={iconBox}>
                <Award className="size-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-xs sm:text-sm">
                  {certification.url ? (
                    <a href={certification.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                      {certification.title}
                    </a>
                  ) : (
                    certification.title
                  )}
                </h3>
                <p className="mt-2 text-muted">{certification.issuer}</p>
                <p className="label mt-3 text-subtle">{certification.year}</p>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
