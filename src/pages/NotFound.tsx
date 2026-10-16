import { RotateCcw } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function NotFound() {
  useDocumentMeta('Página não encontrada — Arnaldo Hilario', 'O endereço acessado não existe neste portfólio.')

  return (
    <section className="mx-auto flex min-h-[80vh] w-full max-w-6xl flex-col items-center justify-center px-5 pt-32 text-center sm:px-8">
      <p className="label text-accent">Erro 404</p>
      <h1 className="pixel-shadow mt-4 text-3xl sm:text-5xl">Game over</h1>
      <p className="mt-6 text-xl text-fg">Página não encontrada</p>
      <p className="mt-2 max-w-md text-muted">O endereço acessado não existe ou foi movido.</p>
      <Button to="/" icon={RotateCcw} className="mt-9">
        Continuar
      </Button>
    </section>
  )
}
