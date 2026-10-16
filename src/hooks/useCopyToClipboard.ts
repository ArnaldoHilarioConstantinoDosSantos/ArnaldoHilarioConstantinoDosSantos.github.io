import { useCallback, useEffect, useRef, useState } from 'react'

export type CopyState = 'idle' | 'copied' | 'error'

function legacyCopy(text: string): boolean {
  const field = document.createElement('textarea')
  field.value = text
  field.setAttribute('readonly', '')
  field.style.position = 'fixed'
  field.style.opacity = '0'
  document.body.appendChild(field)
  field.select()
  try {
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    field.remove()
  }
}

export function useCopyToClipboard(resetAfterMs = 2500) {
  const [state, setState] = useState<CopyState>('idle')
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = useCallback(
    async (text: string) => {
      let ok: boolean
      try {
        await navigator.clipboard.writeText(text)
        ok = true
      } catch {
        ok = legacyCopy(text)
      }
      setState(ok ? 'copied' : 'error')
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setState('idle'), resetAfterMs)
    },
    [resetAfterMs],
  )

  return { state, copy }
}
