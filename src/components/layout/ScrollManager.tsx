import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Rola até a âncora da URL ou, ao trocar de página, volta ao topo. */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (!target) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }
    target.scrollIntoView()
  }, [pathname, hash, key])

  return null
}
