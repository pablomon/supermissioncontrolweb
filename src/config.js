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
  price: {
    amount: 7.99,
    currency: 'USD',
    symbol: '$',
    // Shown struck through next to the price. Set to null to hide it.
    compareAt: null,
    // Appears under the price. One line.
    note: '$7.99 · Lifetime license · Up to 6 Macs',
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
    // Put '/SuperMissionControl.dmg' back the day the store works.
    downloadUrl: null,
    sizeMB: 2.7,
  },

  // --- Checkout ----------------------------------------------------------
  // Lemon Squeezy checkout URL for the license product. Their hosted checkout
  // link works as a plain href; no script tag needed on the page.
  //
  // **Null until Lemon Squeezy verifies the store.** Same reasoning as the trial
  // download above: an offer to buy that leads nowhere costs more than no offer.
  checkoutUrl: null,

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

  links: {
    support: 'mailto:support@supermissioncontrol.com',
    privacy: '/privacy/',
    changelog: '/release-notes/',
  },

  copyright: `© ${new Date().getFullYear()} Pablo Monteserín. Not affiliated with Apple Inc.`,
}

export const priceLabel = `${config.price.symbol}${config.price.amount}`
