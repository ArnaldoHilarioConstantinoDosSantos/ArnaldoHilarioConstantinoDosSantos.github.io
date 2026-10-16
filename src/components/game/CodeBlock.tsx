import { useState } from 'react'
import { useGame } from '../../game/GameContext'
import { coin } from '../../game/sprites'
import { PixelSprite } from './PixelSprite'

/** Bloco do cenário: ao ser acionado, pula e solta uma moeda. */
export function CodeBlock({ label }: { label: string }) {
  const { addCoin } = useGame()
  // Cada batida troca a chave e reinicia as duas animações.
  const [hits, setHits] = useState(0)

  const hit = () => {
    setHits((value) => value + 1)
    addCoin()
  }

  return (
    <button
      type="button"
      onClick={hit}
      aria-label={`Bloco ${label}: bater para ganhar uma moeda`}
      className="relative"
    >
      {hits > 0 && (
        <span key={`coin-${hits}`} className="coin-pop pointer-events-none absolute -top-9 left-1/2">
          <PixelSprite sprite={coin} pixel={4} />
        </span>
      )}
      <span
        key={hits}
        className={`qblock label grid size-16 place-items-center sm:size-[72px] ${hits > 0 ? 'bump' : ''}`}
      >
        {label}
      </span>
    </button>
  )
}
