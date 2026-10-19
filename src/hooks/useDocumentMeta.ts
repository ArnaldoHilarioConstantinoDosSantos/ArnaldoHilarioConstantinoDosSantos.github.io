import { useEffect } from 'react'

function setMeta(selector: string, content: string) {
  document.querySelector(selector)?.setAttribute('content', content)
}

/** Atualiza título, descrição e endereço canônico da página e os restaura ao sair dela. */
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    const previousTitle = document.title
    const previousDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''
    const canonical = document.querySelector('link[rel="canonical"]')
    const previousCanonical = canonical?.getAttribute('href') ?? ''

    document.title = title
    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:title"]', title)
    setMeta('meta[property="og:description"]', description)
    canonical?.setAttribute('href', window.location.origin + window.location.pathname)

    return () => {
      document.title = previousTitle
      setMeta('meta[name="description"]', previousDescription)
      setMeta('meta[property="og:title"]', previousTitle)
      setMeta('meta[property="og:description"]', previousDescription)
      canonical?.setAttribute('href', previousCanonical)
    }
  }, [title, description])
}
