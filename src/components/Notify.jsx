import { useState } from 'react'
import { config } from '../config'
import { Button } from './ui'

/**
 * Lo que ocupa el sitio del botón de compra mientras no hay tienda.
 *
 * **Una sección de precio que no vende nada tiene un coste.** Alguien prueba la
 * app, decide pagar, y se encuentra un botón apagado: no perdió la evaluación,
 * perdiste la venta por no poder cobrar el día que querían pagarte. Y sin una
 * dirección no hay forma de volver a hablar con esa persona — para cuando exista
 * la tienda, hace semanas que la desinstaló.
 *
 * **Va por `mailto` y no por un formulario de verdad.** Guardar direcciones pide un
 * endpoint, y el despliegue de este sitio se configura fuera del repo: adivinarlo
 * ya dejó publicada la versión anterior durante cinco commits sin que nada lo
 * delatara. Esto funciona hoy y no puede romper el despliegue. El coste es que
 * abre el cliente de correo, así que se le pide el envío en dos pasos claros en
 * lugar de fingir un formulario que no lo es.
 */
export default function Notify() {
  const [email, setEmail] = useState('')
  const href =
    `mailto:${config.notify.address}` +
    `?subject=${encodeURIComponent(config.notify.subject)}` +
    `&body=${encodeURIComponent(email ? `${email}\n` : '')}`

  return (
    <form
      className="mt-9"
      onSubmit={(event) => {
        // El botón es un enlace mailto; el submit solo existe para que Return en el
        // campo haga lo mismo que pulsarlo.
        event.preventDefault()
        window.location.href = href
      }}
    >
      <p className="text-[0.9375rem] text-pretty text-ink-200">
        Not on sale yet. Leave your email and you’ll hear the day it is — once, and
        nothing else.
      </p>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        aria-label="Your email address"
        className="mt-4 w-full rounded-xl bg-ink-950 px-4 py-3 text-[0.9375rem] text-white
                   ring-1 ring-white/10 outline-none placeholder:text-ink-500
                   focus:ring-2 focus:ring-white/25"
      />
      <Button href={href} className="mt-3 w-full">
        Email us to be told
      </Button>
      <p className="mt-3 text-center text-xs text-ink-400">
        Opens your mail app with the message ready — you still have to send it.
      </p>
    </form>
  )
}
