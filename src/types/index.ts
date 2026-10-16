import type { LucideIcon } from 'lucide-react'

export type Accent = 'gold' | 'green' | 'red'

export interface Profile {
  name: string
  role: string
  location: string
  headline: string
  intro: string
  email: string
  linkedin: string
  github: string
  resumeUrl: string
  resumeFileName: string
  highlights: { value: string; label: string }[]
}

export interface AboutPillar {
  icon: LucideIcon
  title: string
  description: string
}

/** Nível de uso: principal (dia a dia), frequente (projetos entregues) ou complementar. */
export type SkillLevel = 'principal' | 'frequente' | 'complementar'

export interface Skill {
  name: string
  level: SkillLevel
}

export interface SkillGroup {
  id: string
  title: string
  description: string
  icon: LucideIcon
  accent: Accent
  skills: Skill[]
}

export type ProjectCategory = 'profissional' | 'autoral' | 'freelance'

export type TechFilter =
  | 'React'
  | 'Node.js'
  | 'PostgreSQL'
  | 'Supabase'
  | 'Integrações'
  | 'Mobile'

export interface ArchitectureNode {
  label: string
  detail: string
}

export interface ProjectScreenshot {
  src: string
  alt: string
}

export interface Project {
  slug: string
  name: string
  tagline: string
  category: ProjectCategory
  /** Tipo de projeto, exibido no card. */
  kind: string
  /** Onde ou quando: "Ceasa/PE", "2026"… */
  origin: string
  status: string
  icon: LucideIcon
  accent: Accent
  summary: string
  problem: string
  highlights: string[]
  stack: string[]
  filters: TechFilter[]
  links: { github?: string; demo?: string }
  /** Capturas reais. Enquanto estiver vazio, a página mostra o diagrama ilustrativo. */
  screenshots: ProjectScreenshot[]
  /** Por que não há capturas ou links públicos. */
  disclosure: string
  details: {
    context: string[]
    problem: string[]
    solution: string[]
    architecture: ArchitectureNode[]
    architectureNotes: string[]
    features: string[]
    challenges: { title: string; description: string }[]
    results: string[]
  }
}

export interface Experience {
  company: string
  role: string
  period: string
  location: string
  current?: boolean
  responsibilities: string[]
  stack: string[]
}

export interface Education {
  title: string
  institution: string
  period: string
}

export interface Language {
  name: string
  level: string
}

export interface Certification {
  title: string
  issuer: string
  year: string
  url?: string
}

export interface NavItem {
  id: string
  label: string
}
