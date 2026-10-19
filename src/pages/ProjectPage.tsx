import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Info } from 'lucide-react'
import { useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProjectVisual } from '../components/projects/ProjectVisual'
import { GithubIcon } from '../components/ui/BrandIcons'
import { Button } from '../components/ui/Button'
import { accentVar } from '../components/ui/Card'
import { Reveal } from '../components/ui/Reveal'
import { Tag } from '../components/ui/Tag'
import { categoryLabels, getProject, projects } from '../data/projects'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import type { Project, ProjectScreenshot } from '../types'
import { NotFound } from './NotFound'

interface BlockProps {
  number: string
  title: string
  children: ReactNode
}

function Block({ number, title, children }: BlockProps) {
  return (
    <Reveal>
      <section className="grid gap-4 border-t border-line py-10 sm:grid-cols-[14rem_1fr] sm:gap-8 sm:py-14">
        <h2 className="flex items-baseline gap-3 text-xl sm:flex-col sm:gap-2">
          <span className="font-mono text-sm font-medium text-(--tone)">{number}</span>
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

/** Capturas em grade (a primeira em largura total); um clique abre a imagem ampliada. */
function Screenshots({ items }: { items: ProjectScreenshot[] }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState<ProjectScreenshot | null>(null)

  const show = (screenshot: ProjectScreenshot) => {
    setOpen(screenshot)
    dialog.current?.showModal()
  }

  return (
    <>
      <ul className="mb-6 grid gap-5 md:grid-cols-2">
        {items.map((screenshot, index) => (
          <li key={screenshot.src} className={index === 0 ? 'md:col-span-2' : undefined}>
            <button
              type="button"
              onClick={() => show(screenshot)}
              aria-label={`Ampliar: ${screenshot.alt}`}
              className="group block w-full cursor-zoom-in overflow-hidden rounded-xl border border-line"
            >
              <img
                src={screenshot.src}
                alt={screenshot.alt}
                loading="lazy"
                decoding="async"
                className="w-full transition-transform duration-500 group-hover:scale-[1.015]"
              />
            </button>
          </li>
        ))}
      </ul>

      {/* Clique fora da imagem ou Esc fecham. */}
      <dialog
        ref={dialog}
        onClick={() => dialog.current?.close()}
        onClose={() => setOpen(null)}
        className="m-auto max-h-[92vh] max-w-[min(92vw,1600px)] cursor-zoom-out overflow-hidden rounded-xl border border-line-strong bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        {open && <img src={open.src} alt={open.alt} className="max-h-[92vh] w-auto" />}
      </dialog>
    </>
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
      className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-32 sm:px-8 sm:pt-40"
      style={{ '--tone': accentVar[project.accent] } as CSSProperties}
    >
      <Link to="/#projetos" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Todos os projetos
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="eyebrow flex flex-wrap items-center gap-x-2.5 gap-y-1 text-subtle">
          <span className="text-(--tone)">{categoryLabels[project.category]}</span>
          <span aria-hidden="true">·</span>
          <span>{project.origin}</span>
        </p>
        <h1 className="text-gradient mt-4 text-4xl tracking-[-0.035em] sm:text-6xl">{project.name}</h1>
        <p className="mt-3 text-subtle">{project.kind}</p>
        <p className="mt-4 text-xl leading-relaxed text-muted">{project.tagline}</p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <span className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm text-fg">
            <span className="size-2 rounded-full bg-(--tone)" aria-hidden="true" />
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

      <div className="mt-14">
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
                <span className="mt-[0.7rem] size-1 shrink-0 rounded-full bg-(--tone)" aria-hidden="true" />
                {note}
              </li>
            ))}
          </ul>
        </Block>

        <Block number="05" title="Funcionalidades">
          <CheckList items={details.features} columns />
        </Block>

        <Block number="06" title="Desafios técnicos">
          <ul className="grid gap-4 md:grid-cols-2">
            {details.challenges.map((challenge) => (
              <li key={challenge.title} className="card p-5">
                <h3 className="text-base">{challenge.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{challenge.description}</p>
              </li>
            ))}
          </ul>
        </Block>

        <Block number="07" title="Resultados">
          <CheckList items={details.results} />
        </Block>

        <Block number="08" title="Imagens do sistema">
          {project.screenshots.length > 0 && <Screenshots items={project.screenshots} />}
          <p className="flex max-w-3xl gap-3 rounded-xl border border-line bg-surface p-5 text-sm leading-relaxed text-muted">
            <Info className="mt-0.5 size-4 shrink-0 text-(--tone)" aria-hidden="true" />
            {project.screenshots.length > 0 ? 'Capturas reais do sistema, com dados de demonstração.' : project.disclosure}
          </p>
        </Block>
      </div>

      <nav aria-label="Outros projetos" className="mt-4 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
        <Link to={`/projetos/${previous.slug}`} className="card card-interactive group block p-5">
          <span className="inline-flex items-center gap-1.5 text-sm text-subtle">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            Projeto anterior
          </span>
          <span className="mt-2 block text-lg font-semibold tracking-tight">{previous.name}</span>
        </Link>
        <Link to={`/projetos/${next.slug}`} className="card card-interactive group block p-5 text-right">
          <span className="inline-flex items-center gap-1.5 text-sm text-subtle">
            Próximo projeto
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
          <span className="mt-2 block text-lg font-semibold tracking-tight">{next.name}</span>
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
