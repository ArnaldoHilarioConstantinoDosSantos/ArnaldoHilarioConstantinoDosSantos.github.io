import type { ReactNode } from 'react'

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center border-2 border-line-strong bg-surface-2 px-2 py-0.5 text-sm leading-tight text-muted">
      {children}
    </span>
  )
}
