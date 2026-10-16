import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
      className="btn btn-primary fixed bottom-5 right-5 z-40 size-12 !p-0 sm:bottom-8 sm:right-8"
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </button>
  )
}
