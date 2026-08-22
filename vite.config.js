import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      // Dos páginas de verdad, no un router: /release-notes/ es su propio HTML, y
      // Cloudflare lo sirve directamente en vez de caer al respaldo de SPA.
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        releaseNotes: resolve(import.meta.dirname, 'release-notes/index.html'),
        privacy: resolve(import.meta.dirname, 'privacy/index.html'),
      },
    },
  },
})
