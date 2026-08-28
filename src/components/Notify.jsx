import { useState } from 'react'
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
 * Las direcciones las guarda el Worker en KV, con la dirección como clave: quien se
 * apunte dos veces no aparece dos veces.
 */
export default function Notify() {
  const [email, setEmail] = useState('')
  // 'idle' | 'sending' | 'done' | el texto del error.
  const [state, setState] = useState('idle')

  async function submit(event) {
    event.preventDefault()
    if (state === 'sending') return
    setState('sending')
    try {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (response.ok) {
        setState('done')
        return
      }
      const body = await response.json().catch(() => ({}))
      setState(body.error || 'Something went wrong. Try again in a moment.')
    } catch {
      // Sin red no se pierde la dirección en silencio: se dice, y el campo sigue
      // lleno para poder reintentar sin volver a escribirla.
      setState('Could not reach the server. Check your connection and try again.')
    }
  }

  if (state === 'done') {
    return (
      <p className="mt-9 rounded-xl bg-ink-950 px-4 py-4 text-center text-[0.9375rem]
                    text-ink-200 ring-1 ring-white/10">
        Noted. You’ll hear from us the day it goes on sale, and not before.
      </p>
    )
  }

  const failed = state !== 'idle' && state !== 'sending'

  return (
    <form className="mt-9" onSubmit={submit}>
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
        required
        className="mt-4 w-full rounded-xl bg-ink-950 px-4 py-3 text-[0.9375rem] text-white
                   ring-1 ring-white/10 outline-none placeholder:text-ink-500
                   focus:ring-2 focus:ring-white/25"
      />
      <Button type="submit" className="mt-3 w-full" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Tell me when it’s on sale'}
      </Button>
      {failed && (
        <p role="alert" className="mt-3 text-center text-xs text-red-400">
          {state}
        </p>
      )}
      <p className="mt-3 text-center text-xs text-ink-400">
        One email, then nothing. No account, no list, no sharing.
      </p>
    </form>
  )
}
