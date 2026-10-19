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
      number="06"
      eyebrow="Contato"
      title="Vamos conversar?"
      description="Estou aberto a conversar sobre oportunidades e projetos. O caminho mais rápido é o e-mail."
    >
      <Reveal>
        <div className="card p-6 sm:p-10">
          <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-60" />
          <div aria-hidden="true" className="glow pointer-events-none absolute -right-32 -top-32 -z-10 size-[28rem]" />

          <p className="eyebrow text-subtle">E-mail</p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-3 block text-xl font-semibold tracking-tight [overflow-wrap:anywhere] transition-colors hover:text-accent sm:text-4xl"
          >
            {/* Se precisar quebrar, que seja antes do @, e não no meio do domínio. */}
            {profile.email.split('@')[0]}
            <wbr />@{profile.email.split('@')[1]}
          </a>

          <div className="mt-8 flex flex-wrap gap-3">
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

          <div className="mt-10 flex flex-wrap gap-3 border-t border-line pt-8">
            <Button href={profile.linkedin} variant="ghost" icon={LinkedinIcon}>
              LinkedIn
            </Button>
            <Button href={profile.github} variant="ghost" icon={GithubIcon}>
              GitHub
            </Button>
            <Button href={profile.resumeUrl} download={profile.resumeFileName} variant="ghost" icon={Download}>
              Currículo em PDF
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
