import { ArrowRight, Download, Mail } from 'lucide-react'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { profile } from '../../data/profile'
import { skillGroups } from '../../data/skills'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { Button } from '../ui/Button'

// Tecnologias do dia a dia, na faixa que rola abaixo do topo.
const mainSkills = skillGroups.flatMap((group) => group.skills.filter((skill) => skill.level === 'principal'))

const ease = [0.22, 1, 0.36, 1] as const

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.8, delay, ease },
  }
}

/* Cores do realce de sintaxe do cartão de código. */
const Key = ({ children }: { children: ReactNode }) => <span className="text-sky">{children}</span>
const Str = ({ children }: { children: ReactNode }) => <span className="text-accent">'{children}'</span>
const Num = ({ children }: { children: ReactNode }) => <span className="text-amber">{children}</span>
const Punct = ({ children }: { children: ReactNode }) => <span className="text-subtle">{children}</span>

function StrList({ items }: { items: string[] }) {
  return (
    <>
      <Punct>[</Punct>
      {items.map((item, index) => (
        <span key={item}>
          <Str>{item}</Str>
          {index < items.length - 1 && <Punct>, </Punct>}
        </span>
      ))}
      <Punct>]</Punct>
    </>
  )
}

/** Resumo do perfil escrito como um objeto TypeScript. */
function CodeCard() {
  return (
    <div className="card overflow-hidden shadow-[0_24px_80px_-24px_var(--glow)]">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-rose/70" />
        <span className="size-2.5 rounded-full bg-amber/70" />
        <span className="size-2.5 rounded-full bg-accent/70" />
        <span className="ml-3 font-mono text-xs text-subtle">perfil.ts</span>
      </div>
      {/* tabIndex: no celular o código rola para o lado, e assim também rola pelo teclado. */}
      <pre
        tabIndex={0}
        aria-label="Resumo do perfil em TypeScript"
        className="overflow-x-auto p-5 font-mono text-xs leading-7 sm:p-6 sm:text-[0.8125rem]"
      >
        <code>
          <span className="text-rose">const</span> <span className="text-fg">arnaldo</span> <Punct>=</Punct> <Punct>{'{'}</Punct>
          {'\n  '}
          <Key>cargo</Key>
          <Punct>: </Punct>
          <Str>{profile.role}</Str>
          <Punct>,</Punct>
          {'\n  '}
          <Key>empresa</Key>
          <Punct>: </Punct>
          <Str>Ceasa/PE</Str>
          <Punct>,</Punct>
          {'\n  '}
          <Key>desde</Key>
          <Punct>: </Punct>
          <Num>2024</Num>
          <Punct>,</Punct>
          {'\n  '}
          <Key>stack</Key>
          <Punct>: </Punct>
          <StrList items={['React', 'Node.js', 'PostgreSQL']} />
          <Punct>,</Punct>
          {'\n  '}
          <Key>linguagem</Key>
          <Punct>: </Punct>
          <Str>TypeScript</Str>
          <Punct>,</Punct>
          {'\n  '}
          <Key>integra</Key>
          <Punct>: </Punct>
          <StrList items={['Pix', 'PagBank', 'ERP Sankhya']} />
          <Punct>,</Punct>
          {'\n  '}
          <Key>formacao</Key>
          <Punct>: </Punct>
          <Str>Ciência da Computação</Str>
          <Punct>,</Punct>
          {'\n'}
          <Punct>{'}'}</Punct>
        </code>
      </pre>
    </div>
  )
}

export function Hero() {
  return (
    <>
      <section aria-labelledby="hero-titulo" className="relative overflow-hidden pt-36 sm:pt-44">
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
        <div aria-hidden="true" className="glow pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2" />

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 pb-20 sm:px-8 lg:grid-cols-[1.25fr_1fr]">
          <div className="min-w-0">
            <motion.p
              {...fadeUp(0)}
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 pl-3 pr-4 text-sm text-muted backdrop-blur"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              <span className="hidden sm:inline">{profile.role} · </span>
              {profile.location}
            </motion.p>

            <motion.h1
              {...fadeUp(0.08)}
              id="hero-titulo"
              className="text-gradient mt-7 text-5xl leading-[1.05] tracking-[-0.04em] sm:text-7xl"
            >
              {profile.name}
            </motion.h1>

            <motion.p {...fadeUp(0.16)} className="mt-6 max-w-xl text-xl leading-snug text-fg sm:text-2xl">
              {profile.headline}
            </motion.p>
            <motion.p {...fadeUp(0.22)} className="mt-4 max-w-xl leading-relaxed text-muted">
              {profile.intro}
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="mt-9 flex flex-wrap items-center gap-3">
              <Button to="/#projetos" icon={ArrowRight} iconPosition="right">
                Ver projetos
              </Button>
              <Button href={profile.resumeUrl} download={profile.resumeFileName} variant="secondary" icon={Download}>
                Baixar currículo
              </Button>
              <div className="flex items-center gap-1 sm:ml-2">
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="icon-btn">
                  <LinkedinIcon className="size-[1.125rem]" />
                </a>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="icon-btn">
                  <GithubIcon className="size-[1.125rem]" />
                </a>
                <Link to="/#contato" aria-label="Contato" className="icon-btn">
                  <Mail className="size-[1.125rem]" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div {...fadeUp(0.35)} className="min-w-0">
            <CodeCard />
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {profile.highlights.map((highlight) => (
              <div key={highlight.value} className="bg-bg p-6">
                <dt className="text-2xl font-semibold tracking-tight text-fg">{highlight.value}</dt>
                <dd className="mt-1.5 text-sm leading-snug text-muted">{highlight.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div aria-hidden="true" className="marquee mt-16 overflow-hidden border-y border-line py-5">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {mainSkills.map((skill) => (
                <li key={skill.name} className="flex items-center gap-8 pr-8 font-mono text-sm text-subtle">
                  {skill.name}
                  <span className="size-1 rounded-full bg-line-strong" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </>
  )
}
