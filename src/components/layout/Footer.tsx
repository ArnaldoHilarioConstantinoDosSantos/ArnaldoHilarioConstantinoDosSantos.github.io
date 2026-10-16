import { Mail } from 'lucide-react'
import { profile } from '../../data/profile'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'

const linkClass = 'grid size-10 place-items-center border-2 border-transparent text-muted hover:border-line-strong hover:text-fg'

export function Footer() {
  return (
    <footer>
      <div aria-hidden="true" className="ground h-12" />
      <div className="bg-bg-soft">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
          <div className="text-center sm:text-left">
            <p className="label text-accent">Obrigado por jogar!</p>
            <p className="mt-2 text-muted">
              © {new Date().getFullYear()} {profile.name} · {profile.role}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={linkClass}>
              <LinkedinIcon className="size-5" />
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={linkClass}>
              <GithubIcon className="size-5" />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Enviar e-mail" className={linkClass}>
              <Mail className="size-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
