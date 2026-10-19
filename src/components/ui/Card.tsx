import type { CSSProperties, PointerEvent, ReactNode } from 'react'
import type { Accent } from '../../types'

export const accentVar: Record<Accent, string> = {
  gold: 'var(--amber)',
  green: 'var(--accent)',
  red: 'var(--rose)',
}

interface CardProps {
  children: ReactNode
  accent?: Accent
  /** Realça a borda e acende o brilho sob o ponteiro no hover. */
  interactive?: boolean
  as?: 'div' | 'article' | 'li'
  className?: string
}

/** Grava a posição do ponteiro para o brilho do .card::before. */
function trackPointer(event: PointerEvent<HTMLElement>) {
  const target = event.currentTarget
  const rect = target.getBoundingClientRect()
  target.style.setProperty('--x', `${event.clientX - rect.left}px`)
  target.style.setProperty('--y', `${event.clientY - rect.top}px`)
}

export function Card({ children, accent = 'green', interactive = false, as: Tag = 'div', className = '' }: CardProps) {
  return (
    <Tag
      className={`card ${interactive ? 'card-interactive' : ''} ${className}`}
      style={{ '--tone': accentVar[accent] } as CSSProperties}
      onPointerMove={interactive ? trackPointer : undefined}
    >
      {children}
    </Tag>
  )
}
