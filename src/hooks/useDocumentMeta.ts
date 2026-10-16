import { useEffect } from 'react'

function setMeta(selector: string, content: string) {
  document.querySelector(selector)?.setAttribute('content', content)
}

/** Atualiza título e descrição da página e os restaura ao sair dela. */
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    const previousTitle = document.title
    const previousDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''

    document.title = title
    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:title"]', title)
    setMeta('meta[property="og:description"]', description)

    return () => {
      document.title = previousTitle
      setMeta('meta[name="description"]', previousDescription)
      setMeta('meta[property="og:title"]', previousTitle)
      setMeta('meta[property="og:description"]', previousDescription)
    }
  }, [title, description])
}
