import { useEffect, useState } from 'react'
import { useGame } from '../../game/GameContext'
import { coin } from '../../game/sprites'
import { PixelSprite } from '../game/PixelSprite'

const MAX_SCROLL_SCORE = 9000

/** Avanço da rolagem pela página, de 0 a 1. */
function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return progress
}

/**
 * Placar no estilo de jogo: os pontos sobem conforme a página é percorrida,
 * as moedas vêm dos blocos do cenário e a fase é a seção em que o visitante está.
 */
export function Hud({ stage }: { stage: string }) {
  const { coins } = useGame()
  const progress = useScrollProgress()
  const score = Math.round((progress * MAX_SCROLL_SCORE) / 100) * 100 + coins * 100

  return (
    <div aria-hidden="true" className="border-t-2 border-line bg-surface-2">
      <div className="label mx-auto flex h-7 w-full max-w-6xl items-center justify-between gap-3 px-4 text-xs sm:px-8 sm:text-[0.8125rem]">
        <span>
          <span className="text-subtle">Pontos </span>
          {String(score).padStart(6, '0')}
        </span>
        <span className="flex items-center gap-1.5">
          <PixelSprite sprite={coin} pixel={2} />×{String(coins).padStart(2, '0')}
        </span>
        <span>
          <span className="text-subtle">Fase </span>
          <span className="text-accent">{stage}</span>
        </span>
      </div>
    </div>
  )
}
