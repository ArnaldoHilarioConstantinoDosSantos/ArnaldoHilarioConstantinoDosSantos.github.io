import { Download, Mail, MapPin, Play } from 'lucide-react'
import { motion } from 'motion/react'
import { profile } from '../../data/profile'
import { CodeBlock } from '../game/CodeBlock'
import { GroundStrip, Sky } from '../game/HeroScene'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { Button } from '../ui/Button'

// Tecnologias da linha de destaque do currículo.
const blocks = ['React', 'TS', 'Node', 'SQL']

const [firstName, lastName] = profile.name.split(' ')

const socialClass = 'btn btn-secondary size-12 !p-0'

export function Hero() {
  return (
    <>
      <section aria-labelledby="hero-titulo" className="hero-sky relative overflow-hidden pt-32 sm:pt-36">
        <Sky />

        <div className="relative mx-auto grid w-full max-w-6xl items-end gap-12 px-5 pb-10 sm:px-8 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            className="card min-w-0 p-6 sm:p-9"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <p className="label mb-5 flex items-center gap-2 text-muted">
              <MapPin className="size-3.5 text-accent-2" aria-hidden="true" />
              {profile.location}
            </p>

            <h1 id="hero-titulo" className="pixel-shadow text-[1.75rem] leading-[1.35] sm:text-5xl sm:leading-[1.3]">
              <span className="block">{firstName}</span>
              <span className="block">{lastName}</span>
            </h1>
            <p className="label pixel-shadow mt-5 text-lg text-accent sm:text-xl">{profile.role}</p>

            <p className="mt-6 text-xl leading-snug text-fg">{profile.headline}</p>
            <p className="mt-3 leading-relaxed text-muted">{profile.intro}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button to="/#projetos" icon={Play}>
                Ver projetos
              </Button>
              <Button href={profile.resumeUrl} download={profile.resumeFileName} variant="secondary" icon={Download}>
                Baixar currículo
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button to="/#contato" variant="ghost" icon={Mail}>
                Entrar em contato
              </Button>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={socialClass}>
                <LinkedinIcon className="size-5" />
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={socialClass}>
                <GithubIcon className="size-5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            className="flex min-w-0 flex-col items-center gap-12 pt-6 lg:pb-16 lg:pt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="label blink pixel-shadow text-center text-white">▼ Bata nos blocos ▼</p>
            <div className="flex gap-3 sm:gap-4">
              {blocks.map((label) => (
                <CodeBlock key={label} label={label} />
              ))}
            </div>
          </motion.div>
        </div>

        <GroundStrip />
      </section>

      <dl className="mx-auto grid w-full max-w-6xl gap-5 px-5 pt-14 sm:grid-cols-3 sm:px-8">
        {profile.highlights.map((highlight) => (
          <div key={highlight.value} className="border-l-4 border-accent py-1 pl-4">
            <dt className="label text-xs text-fg">{highlight.value}</dt>
            <dd className="mt-2 leading-snug text-muted">{highlight.label}</dd>
          </div>
        ))}
      </dl>
    </>
  )
}
