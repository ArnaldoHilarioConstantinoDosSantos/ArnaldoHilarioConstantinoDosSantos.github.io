import { ArrowLeft, ArrowUpRight, Check, Info } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProjectVisual } from '../components/projects/ProjectVisual'
import { GithubIcon } from '../components/ui/BrandIcons'
import { Button } from '../components/ui/Button'
import { accentVar } from '../components/ui/Card'
import { Reveal } from '../components/ui/Reveal'
import { Tag } from '../components/ui/Tag'
import { categoryLabels, getProject, projects } from '../data/projects'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import type { Project } from '../types'
import { NotFound } from './NotFound'

interface BlockProps {
  number: string
  title: string
  children: ReactNode
}

function Block({ number, title, children }: BlockProps) {
  return (
    <Reveal>
      <section className="grid gap-4 border-t-4 border-dotted border-line-strong py-10 sm:grid-cols-[14rem_1fr] sm:gap-8 sm:py-12">
        <h2 className="flex items-baseline gap-3 text-xs sm:flex-col sm:gap-2 sm:text-sm">
          <span className="label text-(--tone)">{number}</span>
          {title}
        </h2>
        <div className="min-w-0">{children}</div>
      </section>
    </Reveal>
  )
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-muted">
      {items.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </div>
  )
}

function CheckList({ items, columns = false }: { items: string[]; columns?: boolean }) {
  return (
    <ul className={`grid gap-3 ${columns ? 'md:grid-cols-2' : 'max-w-3xl'}`}>
      {items.map((text) => (
        <li key={text} className="flex gap-3 leading-relaxed text-muted">
          <Check className="mt-1 size-4 shrink-0 text-(--tone)" aria-hidden="true" />
          {text}
        </li>
      ))}
    </ul>
  )
}

function ProjectDetails({ project }: { project: Project }) {
  const { details } = project
  const index = projects.indexOf(project)
  const previous = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  useDocumentMeta(`${project.name} — Arnaldo Hilario`, project.summary)

  return (
    <article
      className="mx-auto w-full max-w-6xl px-5 pb-20 pt-32 sm:px-8 sm:pt-36"
      style={{ '--tone': accentVar[project.accent] } as CSSProperties}
    >
      <Link to="/#projetos" className="label inline-flex items-center gap-2 text-muted hover:text-fg">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Todos os projetos
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-subtle">
          <span className="bg-(--tone) px-2 py-1 text-on-accent">Fase {String(index + 1).padStart(2, '0')}</span>
          <span className="text-(--tone)">{categoryLabels[project.category]}</span>
          <span>{project.origin}</span>
        </p>
        <h1 className="pixel-shadow mt-5 text-xl sm:text-3xl">{project.name}</h1>
        <p className="mt-2 text-subtle">{project.kind}</p>
        <p className="mt-4 text-xl leading-relaxed text-muted">{project.tagline}</p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <span className="label inline-flex items-center gap-2 border-2 border-(--tone) px-3 py-2 text-fg">
            <span className="size-2 bg-(--tone)" aria-hidden="true" />
            {project.status}
          </span>
          {project.links.github && (
            <Button href={project.links.github} variant="secondary" icon={GithubIcon}>
              Código no GitHub
            </Button>
          )}
          {project.links.demo && (
            <Button href={project.links.demo} variant="secondary" icon={ArrowUpRight}>
              Demonstração
            </Button>
          )}
        </div>
      </header>

      <div className="mt-12">
        <Block number="01" title="Contexto">
          <Paragraphs items={details.context} />
        </Block>

        <Block number="02" title="Problema">
          <Paragraphs items={details.problem} />
        </Block>

        <Block number="03" title="Solução">
          <Paragraphs items={details.solution} />
        </Block>

        <Block number="04" title="Arquitetura e tecnologias">
          <ProjectVisual project={project} />
          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tecnologias">
            {project.stack.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
          <ul className="mt-6 max-w-3xl space-y-2.5">
            {details.architectureNotes.map((note) => (
              <li key={note} className="flex gap-3 leading-relaxed text-muted">
                <span className="mt-2.5 size-1.5 shrink-0 bg-(--tone)" aria-hidden="true" />
                {note}
              </li>
            ))}
          </ul>
        </Block>

        <Block number="05" title="Funcionalidades">
          <CheckList items={details.features} columns />
        </Block>

        <Block number="06" title="Desafios técnicos">
          <ul className="grid gap-5 md:grid-cols-2">
            {details.challenges.map((challenge) => (
              <li key={challenge.title} className="card p-5">
                <h3 className="text-xs leading-relaxed">{challenge.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{challenge.description}</p>
              </li>
            ))}
          </ul>
        </Block>

        <Block number="07" title="Resultados">
          <CheckList items={details.results} />
        </Block>

        <Block number="08" title="Imagens do sistema">
          {project.screenshots.length > 0 && (
            <ul className="mb-6 grid gap-5 md:grid-cols-2">
              {project.screenshots.map((screenshot) => (
                <li key={screenshot.src}>
                  <img
                    src={screenshot.src}
                    alt={screenshot.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full border-4 border-ink"
                  />
                </li>
              ))}
            </ul>
          )}
          <p className="flex max-w-3xl gap-3 border-2 border-line-strong bg-surface p-5 leading-relaxed text-muted">
            <Info className="mt-0.5 size-4 shrink-0 text-(--tone)" aria-hidden="true" />
            {project.screenshots.length > 0 ? 'Capturas reais do sistema.' : project.disclosure}
          </p>
        </Block>
      </div>

      <nav aria-label="Outros projetos" className="mt-4 grid gap-5 border-t-4 border-dotted border-line-strong pt-10 sm:grid-cols-2">
        <Link to={`/projetos/${previous.slug}`} className="card card-interactive block p-5">
          <span className="label text-subtle">◀ Fase anterior</span>
          <span className="mt-2 block text-lg font-semibold">{previous.name}</span>
        </Link>
        <Link to={`/projetos/${next.slug}`} className="card card-interactive block p-5 text-right">
          <span className="label text-subtle">Próxima fase ▶</span>
          <span className="mt-2 block text-lg font-semibold">{next.name}</span>
        </Link>
      </nav>
    </article>
  )
}

export function ProjectPage() {
  const { slug } = useParams()
  const project = getProject(slug)

  if (!project) return <NotFound />
  // A chave reinicia as animações ao navegar de um projeto para outro.
  return <ProjectDetails key={project.slug} project={project} />
}
