import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Nav from './components/Nav'
import Privacy from './components/Privacy'
import Footer from './components/Footer'

// Fuera de la portada a propósito: esto es material de consulta, no de venta.
// Nadie lo lee mientras decide comprar — lo busca cuando duda si conceder el
// permiso, y entonces quiere encontrarlo entero y solo.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Nav />
    <main>
      <Privacy />
    </main>
    <Footer />
  </StrictMode>,
)
