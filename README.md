# Super Mission Control — sales site

Landing page for the macOS app. React 19 + Vite + Tailwind v4. No backend.

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the build
```

## What to edit

**`src/config.js` holds everything that changes when the product does** — price,
currency, trial length, download URL, checkout URL, supported macOS versions,
support email. The components read from it; don't hardcode any of that in JSX.

The two links that are placeholders today:

| Field | Put here |
|---|---|
| `checkoutUrl` | The Lemon Squeezy checkout link for the license product |
| `trial.downloadUrl` | The signed, notarized `.dmg` |

## Structure

`src/components/`, rendered in this order by `App.jsx`:

| File | Section |
|---|---|
| `Nav` | Sticky header, goes solid on scroll |
| `Hero` | Headline, both CTAs, and the interactive demo |
| `MissionControlDemo` | **The centerpiece.** A playable Mission Control: hover a thumbnail, the pill appears over its traffic light, the three buttons really close / minimize / zoom. Green plays out the same two beats as the app — Mission Control steps aside first, then the window goes full screen. |
| `Problem` | Closing three windows today, step by step, vs. with the app |
| `Keyboard` | ⌘W / ⌘M / ⌃⌘F / ⌘Q and arrow navigation |
| `Features` | Two cards: the single control, and App Exposé |
| `Install` | Three setup steps + compatibility facts |
| `Pricing` | Single card, one-time price from config |
| `FAQ` | Native `<details>` accordion |
| `CTA`, `Footer` | Closing pitch and links |

Design tokens (traffic-light colors, the neutral ramp, fonts) live in the
`@theme` block of `src/index.css`.

## En marcha desde el 2026-08-29

La tienda está abierta (Polar), la descarga de la prueba encendida y el circuito de
licencias recorrido entero con una compra real. La lista de «antes de lanzar» que había
aquí queda cumplida: URLs reales en `src/config.js`, precio y condiciones cuadrando,
build firmada y notarizada, iconos y `og.png` puestos, y `support@` comprobado desde un
remitente externo.

## El vídeo del héroe

Va en `src/assets/` y **no en `public/`**, para que Vite le ponga un hash del
contenido. Con una ruta fija, sustituirlo mantiene el nombre y navegador y caché
siguen sirviendo el anterior: se despliega, todo responde 200, y lo que se ve es el de
antes. Para cambiarlo basta con dejar los ficheros ahí y compilar.

Una grabación de pantalla de macOS sale en 4K a 60 fps y pesa unos 40 MB. La receta que
la deja en poco más de 1 MB sin que se note:

```sh
FILT="scale=1920:-2:flags=lanczos,fps=30,tpad=stop_mode=clone:stop_duration=1.5"
ffmpeg -i grabacion.mov -vf "$FILT" -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 \
  -deadline good -cpu-used 2 -an src/assets/demo.webm
ffmpeg -i grabacion.mov -vf "$FILT" -c:v libx264 -preset slow -crf 26 \
  -profile:v high -pix_fmt yuv420p -g 60 -movflags +faststart -an src/assets/demo.mp4
ffmpeg -i grabacion.mov -vf "scale=1920:-2:flags=lanczos" -frames:v 1 -q:v 6 \
  src/assets/demo-poster.jpg
```

Por qué cada cosa:

- **1920 y no menos.** Se muestra a unos 1100 px CSS y los clientes están todos en
  pantallas Retina. Bajar a 800 ahorra medio mega y deja borrosa la interfaz de una
  herramienta de interfaz, que es justo donde se juzga si esto está cuidado.
- **30 fps.** Se lleva un tercio del peso y en una grabación de interfaz no se nota: no
  hay movimiento rápido, solo animaciones de ventana y el cursor.
- **`tpad`** congela el último fotograma segundo y medio. En bucle y sin esa pausa, el
  salto al principio se lee como parte del movimiento. En VP9 no cuesta nada.
- **Los dos formatos.** VP9 pesa un tercio menos; el MP4 está para quien no lo admita.
