import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      // Páginas de verdad, no un router: cada una es su propio HTML, y Cloudflare
      // lo sirve directamente en vez de caer al respaldo de SPA.
      //
      // Rutas relativas y sin importar nada de Node. Wrangler analiza este fichero
      // para detectar si se usa su plugin de Vite, y su analizador no traga con
      // todo: con `fileURLToPath` el build de Vite pasaba y **el despliegue
      // fallaba después**, dejando publicada la versión anterior sin que nada en el
      // sitio lo delatara.
      input: {
        main: 'index.html',
        releaseNotes: 'release-notes/index.html',
        privacy: 'privacy/index.html',
      },
    },
  },
})
