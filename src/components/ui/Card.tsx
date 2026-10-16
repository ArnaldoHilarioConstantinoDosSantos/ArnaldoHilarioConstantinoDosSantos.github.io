import type { CSSProperties, ReactNode } from 'react'
import type { Accent } from '../../types'

export const accentVar: Record<Accent, string> = {
  gold: 'var(--accent)',
  green: 'var(--accent-2)',
  red: 'var(--accent-3)',
}

interface CardProps {
  children: ReactNode
  accent?: Accent
  /** Desloca o painel e colore a sombra no hover. */
  interactive?: boolean
  as?: 'div' | 'article' | 'li'
  className?: string
}

export function Card({ children, accent = 'gold', interactive = false, as: Tag = 'div', className = '' }: CardProps) {
  return (
    <Tag
      className={`card ${interactive ? 'card-interactive' : ''} ${className}`}
      style={{ '--tone': accentVar[accent] } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
