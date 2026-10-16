import { starOff, starOn } from '../../game/sprites'
import { skillGroups, skillLevels } from '../../data/skills'
import type { SkillLevel } from '../../types'
import { PixelSprite } from '../game/PixelSprite'
import { Card } from '../ui/Card'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

const levelStars: Record<SkillLevel, number> = { principal: 3, frequente: 2, complementar: 1 }
const levelOrder: SkillLevel[] = ['principal', 'frequente', 'complementar']

/** Nível em estrelas (de 1 a 3), com o nome do nível para leitores de tela. */
function Stars({ level }: { level: SkillLevel }) {
  return (
    <span className="inline-flex shrink-0 gap-0.5">
      {[1, 2, 3].map((position) => (
        <PixelSprite key={position} sprite={position <= levelStars[level] ? starOn : starOff} pixel={2} />
      ))}
      <span className="sr-only"> ({skillLevels[level].label})</span>
    </span>
  )
}

export function Skills() {
  return (
    <Section
      id="tecnologias"
      level="1-2"
      eyebrow="Tecnologias e habilidades"
      title="Inventário"
      description="Tecnologias presentes no meu trabalho e nos meus projetos. As estrelas indicam o quanto cada uma faz parte do dia a dia."
      className="bg-bg-soft"
    >
      <Reveal>
        <ul className="mb-9 flex flex-wrap gap-x-7 gap-y-2 text-muted" aria-label="Legenda dos níveis">
          {levelOrder.map((level) => (
            <li key={level} className="flex items-center gap-2.5">
              <Stars level={level} />
              <span>
                <strong className="font-semibold text-fg">{skillLevels[level].label}</strong> — {skillLevels[level].description}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
        {skillGroups.map((group, index) => (
          <Reveal key={group.id} delay={(index % 3) * 0.08} className={index < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <Card accent={group.accent} interactive className="h-full p-6">
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center border-4 border-ink bg-(--tone) text-on-accent">
                  <group.icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xs">{group.title}</h3>
                  <p className="mt-2 leading-snug text-muted">{group.description}</p>
                </div>
              </div>

              <ul className="mt-6 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className={`inline-flex items-center gap-2 border-2 px-2 py-1 leading-tight ${
                      skill.level === 'complementar'
                        ? 'border-dashed border-line-strong text-muted'
                        : 'border-line-strong bg-surface-2 text-fg'
                    }`}
                  >
                    {skill.name}
                    <Stars level={skill.level} />
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
