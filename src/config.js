/**
 * Every number, link and string the sales page needs to change when the product
 * does. Edit here, not in the components.
 */
export const config = {
  name: 'Super Mission Control',
  // Shown under the headline in the hero — keep it to one descriptive line.
  tagline: 'Close, minimize and zoom any window straight from Mission Control and App Exposé.',
  // La versión mayor a secas, no la exacta. Es lo único que el visitante necesita
  // saber —qué generación compra, que es lo que cubre su licencia— y evita que
  // cada parche de la app obligue a tocar y desplegar la web para no mentir.
  version: '1',

  // --- Price -------------------------------------------------------------
  // `amount` is what gets rendered; keep `currency` and `symbol` in sync.
  // En dólares, y es una decisión, no un descuido: el número contra el que va a
  // comparar el visitante es el 9,99 $ de Mission Control Plus, y un precio en
  // euros no se compara con ese sin calculadora. Al comprador europeo no le cambia
  // nada — el merchant of record le cobra en euros con su IVA incluido; la moneda
  // que se muestra y la que se cobra son ajustes distintos. Ver PLAN.md §Licencia.
  price: {
    amount: 7.99,
    currency: 'USD',
    symbol: '$',
    // Shown struck through next to the price. Set to null to hide it.
    compareAt: null,
    // Appears under the price. One line.
    note: '$7.99 · Lifetime license · Up to 5 Macs',
  },

  trial: {
    days: 14,
    // Direct link to the signed, notarized .dmg.
    //
    // **Deliberately not live yet.** The build is ready and notarised, but the
    // store is not: buying leads nowhere until Lemon Squeezy verifies the account.
    // Handing out the trial before then is worse than handing out nothing — the
    // trial start is kept in the Keychain and the oldest date wins, precisely so
    // deleting the app cannot reset it, so anyone who tries it now burns their
    // fourteen days, finds a dead checkout, and **cannot try again** on the day
    // there is something to buy.
    //
    // **Encendida el 2026-08-29**, y no antes: hasta ese día no se había visto
    // completarse un pedido de verdad, y quien empezara la prueba se habría quedado
    // con la quincena quemada y sin poder pagar. El circuito entero —comprar,
    // activar, validar y liberar— quedó recorrido contra Polar esa madrugada.
    downloadUrl: '/SuperMissionControl.dmg',
    sizeMB: 2.7,
  },

  // --- Checkout ----------------------------------------------------------
  // Enlace de compra de Polar. Funciona como href a secas, sin script en la página.
  //
  // **Es de Polar y no de Lemon Squeezy**: la verificación de identidad de estos
  // últimos lleva semanas sin llegar, y sin ella no se puede cobrar. Ver
  // `StoreConfig.gateway` en la app, que es donde se dice por cuál de las dos se
  // cobra.
  checkoutUrl: 'https://buy.polar.sh/polar_cl_wUySEEf6UwWRLb5Hx5xUqp0YVhgYaeWIhT7AC0K9sBT',

  // What a button says when what it leads to is not ready. Shown instead of its
  // label, not beside it: a button reading "Buy a license" that cannot sell one is
  // the kind of small lie a visitor generalises to the whole product.
  unavailableLabel: 'Available soon',

  requirements: {
    minMacOS: '14',
    minMacOSName: 'Sonoma',
    latestTested: '27',
    latestTestedName: 'Golden Gate',
    architectures: 'Apple silicon and Intel',
  },

  // Dónde va quien quiere comprar y todavía no puede. Mientras `checkoutUrl` sea
  // null, la sección de precio no ofrece nada: quien la prueba hoy y decide pagar
  // no tiene forma de decirlo, y para cuando exista la tienda ya se olvidó. Esto no
  // recupera su prueba —la fecha del trial se guarda y gana la más antigua— pero sí
  // su dirección, que es lo único que hace falta para avisarle.
  notify: {
    address: 'support@supermissioncontrol.com',
    subject: 'Tell me when Super Mission Control is on sale',
  },

  links: {
    support: 'mailto:support@supermissioncontrol.com',
    privacy: '/privacy/',
    changelog: '/release-notes/',
  },

  copyright: `© ${new Date().getFullYear()} Pablo Monteserín. Not affiliated with Apple Inc.`,
}

export const priceLabel = `${config.price.symbol}${config.price.amount}`

/**
 * Qué hace el botón principal, decidido en un solo sitio.
 *
 * Estaba resuelto tres veces y mal: el héroe y la sección de precio miraban
 * `checkoutUrl` para caer en «Available soon», pero el nav y la llamada final
 * pintaban «Buy — $7.99» sin mirar nada, así que la web ofrecía comprar y el botón
 * no llevaba a ningún sitio. Un botón que promete cobrar y no cobra es la clase de
 * mentira pequeña que el visitante generaliza al producto entero.
 *
 * Sin tienda, todos llevan al formulario de aviso, que es lo único que sí se puede
 * cumplir hoy.
 */
export const buyAction = config.checkoutUrl
  ? { href: config.checkoutUrl, label: `Buy a license — ${priceLabel}`, short: `Buy — ${priceLabel}` }
  : { href: '#pricing', label: 'Tell me when it’s on sale', short: 'Get notified' }

/** La descarga, o nada: no hay forma honesta de ofrecer una prueba que no existe. */
export const trialAction = config.trial.downloadUrl
  ? { href: config.trial.downloadUrl, label: 'Download free trial' }
  : null
