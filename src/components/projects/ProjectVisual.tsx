import { Fragment, type CSSProperties } from 'react'
import type { Project } from '../../types'
import { accentVar } from '../ui/Card'

interface ProjectVisualProps {
  project: Project
  /** Versão reduzida, usada nos cards. */
  compact?: boolean
}

/**
 * Mapa da arquitetura desenhado a partir dos dados do projeto.
 * É uma ilustração — e diz isso na própria imagem —, não uma captura de tela.
 */
export function ProjectVisual({ project, compact = false }: ProjectVisualProps) {
  const nodes = project.details.architecture
  const Icon = project.icon

  return (
    <figure
      className={`hero-sky relative overflow-hidden border-ink ${compact ? 'border-b-4' : 'border-4'}`}
      style={{ '--tone': accentVar[project.accent] } as CSSProperties}
    >
      <div className={`relative flex flex-col ${compact ? 'gap-4 p-5' : 'gap-7 p-5 sm:p-8'}`}>
        <div className="flex items-center justify-between gap-3">
          <span className="qblock grid size-11 place-items-center">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <figcaption className="label border-2 border-ink bg-surface px-2 py-1 text-[0.6875rem] text-muted">
            Diagrama ilustrativo
          </figcaption>
        </div>

        <ol
          className={`flex ${compact ? 'flex-wrap items-center gap-x-2 gap-y-2' : 'flex-col gap-3 lg:flex-row lg:items-stretch'}`}
          aria-label={`Arquitetura de ${project.name}`}
        >
          {nodes.map((node, index) => (
            <Fragment key={node.label}>
              {index > 0 && (
                <li
                  aria-hidden="true"
                  className={`label flex items-center justify-center text-white ${compact ? '' : 'rotate-90 lg:rotate-0'}`}
                >
                  ▶
                </li>
              )}
              <li
                className={
                  compact
                    ? 'whitespace-nowrap border-2 border-ink bg-surface px-2 py-1 text-sm leading-tight text-fg'
                    : 'flex-1 border-4 border-ink bg-surface p-4 shadow-[4px_4px_0_var(--shadow)]'
                }
              >
                {compact ? (
                  node.label
                ) : (
                  <>
                    <p className="label text-(--tone)">{node.label}</p>
                    <p className="mt-2 leading-snug text-muted">{node.detail}</p>
                  </>
                )}
              </li>
            </Fragment>
          ))}
        </ol>
      </div>
      <div aria-hidden="true" className="ground h-6" />
    </figure>
  )
}
