import { Check, Copy, Download, Send, TriangleAlert } from 'lucide-react'
import { profile } from '../../data/profile'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

const copyFeedback = {
  idle: { icon: Copy, label: 'Copiar e-mail' },
  copied: { icon: Check, label: 'E-mail copiado' },
  error: { icon: TriangleAlert, label: 'Não foi possível copiar' },
}

export function Contact() {
  const { state, copy } = useCopyToClipboard()
  const feedback = copyFeedback[state]

  return (
    <Section
      id="contato"
      level="1-6"
      eyebrow="Contato"
      title="Continue?"
      description="Estou aberto a conversar sobre oportunidades e projetos. O caminho mais rápido é o e-mail."
      className="bg-bg-soft"
    >
      <Reveal>
        <div className="card p-6 sm:p-10">
          <p className="label text-subtle">
            <span className="blink text-accent" aria-hidden="true">
              ▶{' '}
            </span>
            E-mail
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-3 block break-all text-2xl font-semibold hover:text-accent sm:text-4xl"
          >
            {profile.email}
          </a>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={`mailto:${profile.email}`} icon={Send}>
              Escrever e-mail
            </Button>
            <Button variant="secondary" icon={feedback.icon} onClick={() => copy(profile.email)}>
              {feedback.label}
            </Button>
            <span className="sr-only" role="status">
              {state === 'idle' ? '' : feedback.label}
            </span>
          </div>

          <div className="mt-10 flex flex-wrap gap-4 border-t-4 border-dotted border-line-strong pt-8">
            <Button href={profile.linkedin} variant="secondary" icon={LinkedinIcon}>
              LinkedIn
            </Button>
            <Button href={profile.github} variant="secondary" icon={GithubIcon}>
              GitHub
            </Button>
            <Button href={profile.resumeUrl} download={profile.resumeFileName} variant="secondary" icon={Download}>
              Currículo em PDF
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
