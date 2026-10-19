import { ArrowRight } from 'lucide-react'
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
      className={`relative overflow-hidden bg-bg-soft ${compact ? 'border-b border-line' : 'rounded-2xl border border-line'}`}
      style={{ '--tone': accentVar[project.accent] } as CSSProperties}
    >
      <div aria-hidden="true" className="bg-dots absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="absolute -top-24 left-1/2 h-48 w-2/3 -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: 'var(--tone)' }}
      />

      <div className={`relative flex flex-col ${compact ? 'gap-5 p-5' : 'gap-7 p-5 sm:p-8'}`}>
        <div className="flex items-center justify-between gap-3">
          <span className="icon-chip">
            <Icon className="size-[1.125rem]" aria-hidden="true" />
          </span>
          <figcaption className="rounded-full border border-line bg-surface/80 px-2.5 py-1 font-mono text-[0.6875rem] text-subtle backdrop-blur">
            Diagrama ilustrativo
          </figcaption>
        </div>

        <ol
          className={`flex ${compact ? 'flex-wrap items-center gap-x-1.5 gap-y-2' : 'flex-col gap-3 lg:flex-row lg:items-stretch'}`}
          aria-label={`Arquitetura de ${project.name}`}
        >
          {nodes.map((node, index) => (
            <Fragment key={node.label}>
              {index > 0 && (
                <li aria-hidden="true" className="flex items-center justify-center text-subtle">
                  <ArrowRight className={`size-3.5 ${compact ? '' : 'rotate-90 lg:rotate-0'}`} />
                </li>
              )}
              <li
                className={
                  compact
                    ? 'whitespace-nowrap rounded-lg border border-line bg-surface/90 px-2.5 py-1 font-mono text-xs text-fg backdrop-blur'
                    : 'flex-1 rounded-xl border border-line bg-surface/90 p-4 backdrop-blur'
                }
              >
                {compact ? (
                  node.label
                ) : (
                  <>
                    <p className="font-mono text-sm font-medium text-(--tone)">{node.label}</p>
                    <p className="mt-2 text-sm leading-snug text-muted">{node.detail}</p>
                  </>
                )}
              </li>
            </Fragment>
          ))}
        </ol>
      </div>
    </figure>
  )
}
