import { Menu, Moon, Sun, X } from 'lucide-react'
import { AnimatePresence, motion, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navItems } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useTheme } from '../../hooks/useTheme'

const sectionIds = navItems.map((item) => item.id)

export function Header() {
  const { pathname, hash, key } = useLocation()
  const { theme, toggleTheme } = useTheme()
  const { scrollYProgress } = useScroll()
  const [menuOpen, setMenuOpen] = useState(false)
  const onProjectPage = pathname.startsWith('/projetos/')
  const activeSection = useActiveSection(sectionIds, pathname === '/')
  // Nas páginas de projeto, "Projetos" continua marcado.
  const active = onProjectPage ? 'projetos' : activeSection

  useEffect(() => setMenuOpen(false), [pathname, hash, key])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const themeLabel = theme === 'dark' ? 'Mudar para o tema claro' : 'Mudar para o tema escuro'

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      {/* Barra de progresso da leitura. */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 h-0.5 origin-left bg-accent"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="relative mx-auto flex h-14 w-full max-w-6xl items-center justify-between rounded-full border border-line bg-bg/70 pl-2 pr-2 shadow-[0_8px_32px_-12px_rgb(0_0_0/0.4)] backdrop-blur-xl sm:pl-3">
        <Link to="/" className="flex items-center gap-2.5 rounded-full pr-2" aria-label="Arnaldo Hilario — início">
          <span className="grid size-9 place-items-center rounded-full bg-fg font-mono text-xs font-semibold text-bg">AH</span>
          <span className="text-sm font-medium">Arnaldo Hilario</span>
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
                    className={`relative isolate block rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                      isActive ? 'text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button type="button" onClick={toggleTheme} aria-label={themeLabel} title={themeLabel} className="icon-btn">
            {theme === 'dark' ? <Sun className="size-[1.125rem]" aria-hidden="true" /> : <Moon className="size-[1.125rem]" aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="icon-btn lg:hidden"
          >
            {menuOpen ? <X className="size-[1.125rem]" aria-hidden="true" /> : <Menu className="size-[1.125rem]" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="menu-mobile"
            aria-label="Seções"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="mx-auto mt-2 w-full max-w-6xl rounded-3xl border border-line bg-bg/90 p-2 shadow-xl backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={{ pathname: '/', hash: `#${item.id}` }}
                    aria-current={active === item.id ? 'location' : undefined}
                    className={`block rounded-2xl px-4 py-3 ${
                      active === item.id ? 'bg-surface-2 text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
