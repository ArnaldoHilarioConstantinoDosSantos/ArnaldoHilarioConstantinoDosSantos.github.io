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
      className={`border-2 px-3 py-1 leading-tight ${
        active
          ? 'border-ink bg-block font-semibold text-on-accent shadow-[3px_3px_0_var(--shadow)]'
          : 'border-line-strong text-muted hover:border-ink hover:text-fg'
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
      level="1-3"
      eyebrow="Projetos em destaque"
      title="Selecione uma fase"
      description="Trabalhos profissionais na Ceasa/PE, um projeto freelance e sistemas que idealizei e desenvolvi de ponta a ponta."
    >
      <Reveal className="mb-9 space-y-3">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por categoria">
          <span className="label mr-1 w-28 text-subtle">Categoria</span>
          {categories.map((option) => (
            <FilterButton key={option.value} active={category === option.value} onClick={() => setCategory(option.value)}>
              {option.label}
            </FilterButton>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por tecnologia">
          <span className="label mr-1 w-28 text-subtle">Tecnologia</span>
          {techFilters.map((option) => (
            <FilterButton key={option} active={tech === option} onClick={() => setTech(tech === option ? null : option)}>
              {option}
            </FilterButton>
          ))}
        </div>
        <p className="text-subtle" role="status">
          {filtered.length === 1 ? '1 projeto' : `${filtered.length} projetos`}
        </p>
      </Reveal>

      {filtered.length > 0 ? (
        <ul className="grid gap-8 md:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((project) => (
              <motion.li
                key={project.slug}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ProjectCard project={project} number={projects.indexOf(project) + 1} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <div className="border-4 border-dashed border-line-strong p-10 text-center">
          <p className="text-muted">Nenhum projeto combina esses dois filtros.</p>
          <button type="button" onClick={clearFilters} className="label mt-4 text-accent hover:underline">
            Limpar filtros
          </button>
        </div>
      )}
    </Section>
  )
}
