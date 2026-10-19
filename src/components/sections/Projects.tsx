import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { categoryLabels, projects, techFilters } from '../../data/projects'
import type { ProjectCategory, TechFilter } from '../../types'
import { ProjectCard } from '../projects/ProjectCard'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

type CategoryFilter = ProjectCategory | 'todos'

const categories: { value: CategoryFilter; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'profissional', label: categoryLabels.profissional },
  { value: 'autoral', label: 'Autorais' },
  { value: 'freelance', label: categoryLabels.freelance },
]

interface FilterButtonProps {
  active: boolean
  onClick: () => void
  children: string
}

function FilterButton({ active, onClick, children }: FilterButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
        active ? 'border-fg bg-fg text-bg' : 'border-line-strong text-muted hover:border-fg/40 hover:text-fg'
      }`}
    >
      {children}
    </button>
  )
}

export function Projects() {
  const [category, setCategory] = useState<CategoryFilter>('todos')
  const [tech, setTech] = useState<TechFilter | null>(null)

  const filtered = useMemo(
    () =>
      projects.filter(
        (project) =>
          (category === 'todos' || project.category === category) && (tech === null || project.filters.includes(tech)),
      ),
    [category, tech],
  )

  const clearFilters = () => {
    setCategory('todos')
    setTech(null)
  }

  return (
    <Section
      id="projetos"
      number="03"
      eyebrow="Projetos em destaque"
      title="Sistemas que construí"
      description="Trabalhos profissionais na Ceasa/PE, um projeto freelance e sistemas que idealizei e desenvolvi de ponta a ponta."
    >
      <Reveal className="mb-9 space-y-3">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por categoria">
          <span className="eyebrow mr-1 w-full text-subtle sm:w-28">Categoria</span>
          {categories.map((option) => (
            <FilterButton key={option.value} active={category === option.value} onClick={() => setCategory(option.value)}>
              {option.label}
            </FilterButton>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por tecnologia">
          <span className="eyebrow mr-1 w-full pt-2 text-subtle sm:w-28 sm:pt-0">Tecnologia</span>
          {techFilters.map((option) => (
            <FilterButton key={option} active={tech === option} onClick={() => setTech(tech === option ? null : option)}>
              {option}
            </FilterButton>
          ))}
        </div>
        <p className="pt-1 font-mono text-xs text-subtle" role="status">
          {filtered.length === 1 ? '1 projeto' : `${filtered.length} projetos`}
        </p>
      </Reveal>

      {filtered.length > 0 ? (
        <ul className="grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((project) => (
              <motion.li
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <ProjectCard project={project} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <div className="rounded-2xl border border-dashed border-line-strong p-10 text-center">
          <p className="text-muted">Nenhum projeto combina esses dois filtros.</p>
          <button type="button" onClick={clearFilters} className="mt-3 text-sm font-medium text-accent hover:underline">
            Limpar filtros
          </button>
        </div>
      )}
    </Section>
  )
}
