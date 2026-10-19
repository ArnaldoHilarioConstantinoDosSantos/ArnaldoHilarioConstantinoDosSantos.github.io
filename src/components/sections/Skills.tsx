import { skillGroups, skillLevels } from '../../data/skills'
import type { SkillLevel } from '../../types'
import { Card } from '../ui/Card'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

const levelBars: Record<SkillLevel, number> = { principal: 3, frequente: 2, complementar: 1 }
const levelOrder: SkillLevel[] = ['principal', 'frequente', 'complementar']

/** Nível em barrinhas (de 1 a 3), com o nome do nível para leitores de tela. */
function Level({ level }: { level: SkillLevel }) {
  return (
    <span className="inline-flex shrink-0 items-end gap-0.5">
      {[1, 2, 3].map((position) => (
        <span
          key={position}
          aria-hidden="true"
          className={`w-1 rounded-full ${position <= levelBars[level] ? 'bg-(--tone)' : 'bg-line-strong'}`}
          style={{ height: `${4 + position * 3}px` }}
        />
      ))}
      <span className="sr-only"> ({skillLevels[level].label})</span>
    </span>
  )
}

export function Skills() {
  return (
    <Section
      id="tecnologias"
      number="02"
      eyebrow="Tecnologias e habilidades"
      title="Ferramentas com que construo"
      description="Tecnologias presentes no meu trabalho e nos meus projetos. As barras indicam o quanto cada uma faz parte do dia a dia."
    >
      <Reveal>
        <ul
          className="mb-9 flex flex-wrap gap-x-7 gap-y-2 text-sm text-muted [--tone:var(--accent)]"
          aria-label="Legenda dos níveis"
        >
          {levelOrder.map((level) => (
            <li key={level} className="flex items-center gap-2.5">
              <Level level={level} />
              <span>
                <strong className="font-medium text-fg">{skillLevels[level].label}</strong> — {skillLevels[level].description}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {skillGroups.map((group, index) => (
          <Reveal key={group.id} delay={(index % 3) * 0.06} className={index < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <Card accent={group.accent} interactive className="h-full p-6">
              <div className="flex items-start gap-4">
                <span className="icon-chip">
                  <group.icon className="size-[1.125rem]" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base">{group.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{group.description}</p>
                </div>
              </div>

              <ul className="mt-6 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className={`inline-flex items-center gap-2 rounded-lg border px-2.5 py-1 text-sm ${
                      skill.level === 'complementar'
                        ? 'border-dashed border-line-strong text-muted'
                        : 'border-line bg-surface-2 text-fg'
                    }`}
                  >
                    {skill.name}
                    <Level level={skill.level} />
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
