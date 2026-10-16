import { useMemo } from 'react'
import type { Sprite } from '../../game/sprites'

interface PixelSpriteProps {
  sprite: Sprite
  /** Tamanho de cada pixel do sprite, em px de tela. */
  pixel?: number
  className?: string
}

/** Desenha um sprite como SVG, juntando pixels vizinhos da mesma cor em um retângulo. */
export function PixelSprite({ sprite, pixel = 4, className }: PixelSpriteProps) {
  const width = sprite.rows[0].length
  const height = sprite.rows.length

  const rects = useMemo(() => {
    const result: { x: number; y: number; w: number; fill: string }[] = []
    sprite.rows.forEach((row, y) => {
      let x = 0
      while (x < row.length) {
        const key = row[x]
        let end = x + 1
        while (end < row.length && row[end] === key) end++
        if (key !== '.') result.push({ x, y, w: end - x, fill: sprite.palette[key] })
        x = end
      }
    })
    return result
  }, [sprite])

  return (
    <svg
      data-sprite
      aria-hidden="true"
      className={className}
      width={width * pixel}
      height={height * pixel}
      viewBox={`0 0 ${width} ${height}`}
      shapeRendering="crispEdges"
    >
      {rects.map((rect) => (
        <rect key={`${rect.x}-${rect.y}`} x={rect.x} y={rect.y} width={rect.w} height={1} fill={rect.fill} />
      ))}
    </svg>
  )
}
