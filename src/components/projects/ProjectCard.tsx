import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categoryLabels } from '../../data/projects'
import type { Project } from '../../types'
import { GithubIcon } from '../ui/BrandIcons'
import { Card } from '../ui/Card'
import { Tag } from '../ui/Tag'
import { ProjectVisual } from './ProjectVisual'

const MAX_TAGS = 6

export function ProjectCard({ project }: { project: Project }) {
  const hiddenTags = project.stack.length - MAX_TAGS
  const cover = project.screenshots[0]

  return (
    <Card as="article" accent={project.accent} interactive className="group flex h-full flex-col">
      {cover ? (
        <img
          src={cover.src}
          alt={cover.alt}
          loading="lazy"
          decoding="async"
          className="aspect-[16/9] w-full border-b border-line object-cover object-top"
        />
      ) : (
        <ProjectVisual project={project} compact />
      )}

      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow flex flex-wrap items-center gap-x-2.5 gap-y-1 text-subtle">
          <span className="text-(--tone)">{categoryLabels[project.category]}</span>
          <span aria-hidden="true">·</span>
          <span>{project.origin}</span>
        </p>

        <h3 className="mt-3 text-xl">
          {/* O link cobre o card inteiro; os demais links ficam acima dele. */}
          <Link to={`/projetos/${project.slug}`} className="after:absolute after:inset-0">
            {project.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-subtle">{project.kind}</p>
        <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>

        <ul className="mt-4 hidden space-y-1.5 sm:block">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2 text-sm leading-snug text-muted">
              <Check className="mt-0.5 size-4 shrink-0 text-(--tone)" aria-hidden="true" />
              {highlight}
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tecnologias">
          {project.stack.slice(0, MAX_TAGS).map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
          {hiddenTags > 0 && (
            <li>
              <Tag>+{hiddenTags}</Tag>
            </li>
          )}
        </ul>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-fg" aria-hidden="true">
            Ver estudo de caso
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
          <div className="relative z-10 flex items-center gap-3 text-sm">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-muted hover:text-fg"
              >
                <GithubIcon className="size-4" /> Código
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-muted hover:text-fg"
              >
                <ArrowUpRight className="size-4" aria-hidden="true" /> Demonstração
              </a>
            )}
            {!project.links.github && !project.links.demo && <span className="text-subtle">{project.status}</span>}
          </div>
        </div>
      </div>
    </Card>
  )
}
