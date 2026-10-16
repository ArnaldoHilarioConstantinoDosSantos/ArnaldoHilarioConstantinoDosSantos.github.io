import { bush, cloud, devStand, devStep } from '../../game/sprites'
import { PixelSprite } from './PixelSprite'

const stars = [
  { top: '12%', left: '8%', delay: '0s' },
  { top: '22%', left: '31%', delay: '0.7s' },
  { top: '9%', left: '52%', delay: '1.3s' },
  { top: '30%', left: '68%', delay: '0.4s' },
  { top: '15%', left: '86%', delay: '1.8s' },
  { top: '42%', left: '17%', delay: '1.1s' },
  { top: '48%', left: '93%', delay: '0.2s' },
]

/** Céu do cenário: estrelas (à noite) e nuvens, atrás do conteúdo. */
export function Sky() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <span key={star.left} className="star-dot" style={{ top: star.top, left: star.left, animationDelay: star.delay }} />
      ))}
      <span className="cloud left-[6%] top-[14%]" style={{ animationDuration: '18s' }}>
        <PixelSprite sprite={cloud} pixel={6} />
      </span>
      <span className="cloud left-[58%] top-[7%]" style={{ animationDuration: '26s' }}>
        <PixelSprite sprite={cloud} pixel={8} />
      </span>
      <span className="cloud left-[80%] top-[38%] hidden sm:block" style={{ animationDuration: '22s' }}>
        <PixelSprite sprite={cloud} pixel={5} />
      </span>
    </div>
  )
}

/** Faixa do chão: arbustos, cano e o personagem caminhando sobre os tijolos. */
export function GroundStrip() {
  return (
    <div aria-hidden="true">
      <div className="relative mx-auto h-24 max-w-[100rem] overflow-hidden">
        <PixelSprite sprite={bush} pixel={6} className="absolute bottom-0 left-[4%]" />
        <PixelSprite sprite={bush} pixel={4} className="absolute bottom-0 left-[46%] hidden sm:block" />

        <div className="absolute bottom-0 right-[8%] flex w-20 flex-col items-center">
          <div className="pipe-cap h-7 w-20" />
          <div className="pipe-body -mt-1 h-12 w-16" />
        </div>

        <div className="walker">
          <PixelSprite sprite={devStand} pixel={4} />
          <PixelSprite sprite={devStep} pixel={4} />
        </div>
      </div>
      <div className="ground h-16" />
    </div>
  )
}
