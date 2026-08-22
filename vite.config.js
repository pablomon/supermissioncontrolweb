import { fileURLToPath } from 'node:url'
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
      // Las rutas se resuelven con fileURLToPath y no con `import.meta.dirname`,
      // que necesita Node 20.11 y no está garantizado en la imagen de compilación
      // de Cloudflare: allí el build fallaría y se seguiría publicando la versión
      // anterior, en silencio y sin que nada en el sitio lo delate.
      input: {
        main: fileURLToPath(new URL('index.html', import.meta.url)),
        releaseNotes: fileURLToPath(new URL('release-notes/index.html', import.meta.url)),
        privacy: fileURLToPath(new URL('privacy/index.html', import.meta.url)),
      },
    },
  },
})
