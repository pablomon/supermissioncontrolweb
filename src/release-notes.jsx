import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Nav from './components/Nav'
import Changelog from './components/Changelog'
import Footer from './components/Footer'

// Página aparte y no sección, porque esto solo crece: una lista que se alarga con
// cada versión no puede vivir dentro de una página de venta. Se compila como
// entrada propia de Vite —sin router ni dependencias— así que /release-notes/ es un
// HTML de verdad que Cloudflare sirve directamente.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Nav />
    <main>
      <Changelog />
    </main>
    <Footer />
  </StrictMode>,
)
