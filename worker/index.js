/**
 * Lo único que este sitio necesita que no sea un fichero estático: recoger la
 * dirección de quien quiere comprar y todavía no puede.
 *
 * Todo lo demás lo sirve el binding de assets. Este script solo existe para
 * `/api/notify`, y `run_worker_first` en la configuración es lo que hace que esa
 * ruta llegue hasta aquí en vez de caer en el respaldo de página no encontrada.
 */

/** Un correo plausible. No se valida de verdad —eso solo lo hace enviarlo— pero
 *  para de golpe la basura y los envíos vacíos. */
const LOOKS_LIKE_EMAIL = /^[^@\s]+@[^@\s.]+\.[^@\s]{2,}$/

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname !== '/api/notify') {
      return env.ASSETS.fetch(request)
    }
    if (request.method !== 'POST') {
      return json({ error: 'Use POST.' }, 405)
    }

    let email
    try {
      email = String((await request.json()).email || '').trim().toLowerCase()
    } catch {
      return json({ error: 'Send JSON with an email field.' }, 400)
    }

    // El límite corta una dirección absurda antes de guardarla; el formato corta
    // los envíos en blanco, que es lo que más llega cuando alguien pulsa dos veces.
    if (email.length > 254 || !LOOKS_LIKE_EMAIL.test(email)) {
      return json({ error: 'That does not look like an email address.' }, 400)
    }

    // La dirección **es** la clave, así que apuntarse dos veces no crea dos
    // entradas ni hace falta comprobar antes si ya estaba. El valor guarda cuándo
    // fue, que es lo único que hará falta el día que haya que escribirles.
    await env.NOTIFY.put(email, JSON.stringify({ at: new Date().toISOString() }))

    return json({ ok: true })
  },
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  })
}
