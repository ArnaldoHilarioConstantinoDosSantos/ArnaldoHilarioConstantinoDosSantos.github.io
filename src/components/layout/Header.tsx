import { Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navItems } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useTheme } from '../../hooks/useTheme'
import { Hud } from './Hud'

const sectionIds = navItems.map((item) => item.id)

const iconButton =
  'grid size-10 place-items-center border-2 border-transparent text-muted hover:border-line-strong hover:text-fg'

export function Header() {
  const { pathname, hash, key } = useLocation()
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const onProjectPage = pathname.startsWith('/projetos/')
  const activeSection = useActiveSection(sectionIds, pathname === '/')
  // Nas páginas de projeto, "Projetos" continua marcado.
  const active = onProjectPage ? 'projetos' : activeSection

  const activeIndex = activeSection ? sectionIds.indexOf(activeSection) : -1
  const stage = onProjectPage ? 'Bônus' : activeIndex >= 0 ? `1-${activeIndex + 1}` : 'Início'

  useEffect(() => setMenuOpen(false), [pathname, hash, key])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const themeLabel = theme === 'dark' ? 'Mudar para o mundo de dia' : 'Mudar para o mundo de noite'

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-4 border-ink bg-bg">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="Arnaldo Hilario — início">
          <span className="qblock label grid size-9 place-items-center">AH</span>
          <span className="label hidden sm:inline">Arnaldo Hilario</span>
        </Link>

        <nav aria-label="Seções" className="hidden lg:block">
          <ul className="flex items-center">
            {navItems.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <Link
                    to={{ pathname: '/', hash: `#${item.id}` }}
                    aria-current={isActive ? 'location' : undefined}
                    className={`label relative block px-3 py-2 ${isActive ? 'text-accent' : 'text-muted hover:text-fg'}`}
                  >
                    {/* Cursor de seleção de menu, como nos jogos. */}
                    {isActive && (
                      <span aria-hidden="true" className="blink absolute -left-0.5 top-2">
                        ▶
                      </span>
                    )}
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button type="button" onClick={toggleTheme} aria-label={themeLabel} title={themeLabel} className={iconButton}>
            {theme === 'dark' ? <Sun className="size-5" aria-hidden="true" /> : <Moon className="size-5" aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            className={`${iconButton} lg:hidden`}
          >
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <Hud stage={stage} />

      {menuOpen && (
        <nav
          id="menu-mobile"
          aria-label="Seções"
          className="absolute inset-x-0 top-full border-y-4 border-ink bg-bg lg:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={{ pathname: '/', hash: `#${item.id}` }}
                  aria-current={active === item.id ? 'location' : undefined}
                  className={`label flex items-center gap-3 px-2 py-4 text-xs ${
                    active === item.id ? 'text-accent' : 'text-muted'
                  }`}
                >
                  <span aria-hidden="true" className={active === item.id ? 'blink' : 'invisible'}>
                    ▶
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
