import { useEffect, useState } from 'react'

/** Devolve o id da seção que ocupa a faixa central da tela, ou null fora delas. */
export function useActiveSection(ids: string[], enabled: boolean): string | null {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join(',')

  useEffect(() => {
    if (!enabled) {
      setActive(null)
      return
    }

    const elements = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        setActive(elements.find((element) => visible.has(element.id))?.id ?? null)
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [key, enabled])

  return active
}
