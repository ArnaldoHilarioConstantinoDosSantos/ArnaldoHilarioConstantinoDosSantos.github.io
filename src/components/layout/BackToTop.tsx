import { ArrowUp } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0 })}
          aria-label="Voltar ao topo"
          title="Voltar ao topo"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-5 right-5 z-40 grid size-11 place-items-center rounded-full border border-line-strong bg-surface/80 text-fg shadow-lg backdrop-blur-md hover:bg-surface-2 sm:bottom-8 sm:right-8"
        >
          <ArrowUp className="size-4" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
