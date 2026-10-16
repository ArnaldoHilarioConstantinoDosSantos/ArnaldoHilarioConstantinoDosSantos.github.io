import { useCallback, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'portfolio:theme'
const THEME_COLOR: Record<Theme, string> = { dark: '#0a0d24', light: '#5c94fc' }

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

/** O tema inicial é aplicado por um script em index.html; aqui só lemos e alternamos. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(currentTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Armazenamento bloqueado: o tema vale só para esta visita.
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((value) => (value === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggleTheme }
}
