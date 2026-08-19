/**
 * Every number, link and string the sales page needs to change when the product
 * does. Edit here, not in the components.
 */
export const config = {
  name: 'Super Mission Control',
  // Shown under the headline in the hero — keep it to one descriptive line.
  tagline: 'Close, minimize and zoom any window straight from Mission Control and App Exposé.',
  version: '1.0',

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
    downloadUrl: '#download',
    sizeMB: 3.1,
  },

  // --- Checkout ----------------------------------------------------------
  // Lemon Squeezy checkout URL for the license product. Their hosted checkout
  // link works as a plain href; no script tag needed on the page.
  checkoutUrl: '#buy',

  requirements: {
    minMacOS: '14',
    minMacOSName: 'Sonoma',
    latestTested: '27',
    latestTestedName: 'Tahoe',
    architectures: 'Apple silicon and Intel',
  },

  links: {
    support: 'mailto:support@supermissioncontrol.app',
    privacy: '#privacy',
    changelog: '#changelog',
  },

  copyright: `© ${new Date().getFullYear()} Pablo Monteserín. Not affiliated with Apple Inc.`,
}

export const priceLabel = `${config.price.symbol}${config.price.amount}`
