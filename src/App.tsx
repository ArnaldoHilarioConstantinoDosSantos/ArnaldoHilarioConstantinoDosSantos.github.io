import { Route, Routes } from 'react-router-dom'
import { BackToTop } from './components/layout/BackToTop'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { ScrollManager } from './components/layout/ScrollManager'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { ProjectPage } from './pages/ProjectPage'

export default function App() {
  return (
    <>
      <a
        href="#conteudo"
        className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
      >
        Pular para o conteúdo
      </a>
      <ScrollManager />
      <Header />
      <main id="conteudo">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projetos/:slug" element={<ProjectPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
