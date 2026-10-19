import { ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function NotFound() {
  useDocumentMeta('Página não encontrada — Arnaldo Hilario', 'O endereço acessado não existe neste portfólio.')

  return (
    <section className="relative mx-auto flex min-h-[80vh] w-full max-w-6xl flex-col items-center justify-center px-5 pt-32 text-center sm:px-8">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <p className="eyebrow relative text-accent">Erro 404</p>
      <h1 className="text-gradient relative mt-4 font-mono text-7xl tracking-tighter sm:text-9xl">404</h1>
      <p className="relative mt-6 text-xl text-fg">Página não encontrada</p>
      <p className="relative mt-2 max-w-md text-muted">O endereço acessado não existe ou foi movido.</p>
      <Button to="/" icon={ArrowLeft} className="relative mt-9">
        Voltar ao início
      </Button>
    </section>
  )
}
