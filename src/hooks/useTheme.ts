import { useCallback, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'portfolio:theme'
const THEME_COLOR: Record<Theme, string> = { dark: '#08090b', light: '#fafafa' }

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

/**
 * O tema inicial é aplicado por um script em index.html (o salvo ou, sem escolha, o do sistema).
 * Aqui alternamos e só gravamos quando o visitante escolhe; sem escolha, o site segue o sistema.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(currentTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
  }, [theme])

  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: light)')
    const onChange = (event: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return
      } catch {
        // Sem acesso ao armazenamento: segue o sistema.
      }
      setTheme(event.matches ? 'light' : 'dark')
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((value) => {
      const next = value === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Armazenamento bloqueado: o tema vale só para esta visita.
      }
      return next
    })
  }, [])

  return { theme, toggleTheme }
}
