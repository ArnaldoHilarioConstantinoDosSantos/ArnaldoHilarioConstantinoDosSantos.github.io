import '@fontsource-variable/pixelify-sans'
import '@fontsource/press-start-2p'
import { MotionConfig } from 'motion/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { GameProvider } from './game/GameContext'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* reducedMotion="user" desliga os deslocamentos para quem pede menos movimento no sistema. */}
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <GameProvider>
          <App />
        </GameProvider>
      </BrowserRouter>
    </MotionConfig>
  </StrictMode>,
)
