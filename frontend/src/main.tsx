import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { DadosProvider } from './context/DadosContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <DadosProvider>
        <App />
      </DadosProvider>
    </BrowserRouter>
  </StrictMode>,
)