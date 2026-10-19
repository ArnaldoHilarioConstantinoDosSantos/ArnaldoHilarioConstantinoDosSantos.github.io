import { Mail } from 'lucide-react'
import { profile } from '../../data/profile'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
        <p className="text-center text-sm text-subtle sm:text-left">
          © {new Date().getFullYear()} {profile.name} · {profile.role}
        </p>
        <div className="flex items-center gap-1">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="icon-btn">
            <LinkedinIcon className="size-[1.125rem]" />
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="icon-btn">
            <GithubIcon className="size-[1.125rem]" />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Enviar e-mail" className="icon-btn">
            <Mail className="size-[1.125rem]" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
