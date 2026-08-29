import { config } from './config'

/**
 * Abre la compra en una capa encima de la página, en vez de irse a otro sitio.
 *
 * **Un escuchador delegado y no un `onClick` por botón.** Los botones de comprar son
 * cuatro —cabecera, héroe, precio y llamada final— y el día que haya un quinto nadie
 * se acordará de engancharlo. Escuchando en el documento, cualquier enlace que vaya a
 * la tienda queda cubierto sin tocar nada.
 *
 * **El script se descarga al primer clic, no al cargar la página.** Puesto con
 * `data-auto-init`, como sugiere su documentación, el navegador de *todos* los
 * visitantes contacta con un CDN de terceros para un botón que la mayoría no pulsa —
 * en una web cuyo argumento es la privacidad, eso es un cambio de carácter. Así, quien
 * no compra no lo toca nunca.
 *
 * **Y si algo falla, se navega.** Es el camino del dinero: no puede depender de que un
 * CDN esté vivo, de que el script no haya cambiado, ni de que el navegador permita
 * cargarlo. Ante cualquier duda, el enlace hace lo que siempre hizo.
 */

const SCRIPT = 'https://cdn.jsdelivr.net/npm/@polar-sh/checkout@0.1/dist/embed.global.js'

let loading = null

function load() {
  if (window.Polar?.EmbedCheckout) return Promise.resolve()
  if (loading) return loading
  loading = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = SCRIPT
    script.async = true
    script.onload = () => (window.Polar?.EmbedCheckout ? resolve() : reject(new Error('no API')))
    script.onerror = () => reject(new Error('failed to load'))
    document.head.appendChild(script)
  })
  // Un fallo no se queda cacheado: el siguiente clic vuelve a intentarlo, porque el
  // motivo más probable es una red que iba mal en ese momento.
  loading.catch(() => {
    loading = null
  })
  return loading
}

export function installCheckoutOverlay() {
  if (!config.checkoutUrl) return

  document.addEventListener('click', (event) => {
    // Sin modificadores: ⌘-clic, clic central y demás siguen abriendo en otra pestaña,
    // que es lo que quien los usa espera. Interceptarlos sería quitarle al usuario algo
    // que el navegador ya le daba.
    if (event.defaultPrevented || event.button !== 0) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    const link = event.target.closest?.('a[href]')
    if (!link || link.href !== config.checkoutUrl) return

    event.preventDefault()
    load()
      .then(() => window.Polar.EmbedCheckout.create(link.href, 'dark'))
      .catch(() => {
        window.location.href = link.href
      })
  })
}
