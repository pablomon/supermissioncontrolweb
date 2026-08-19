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

## Before going live

- [ ] Real checkout and download URLs in `src/config.js`
- [ ] Confirm the price, and that `price.note` still matches the license terms
- [ ] The page claims the build is **Developer ID signed and notarized** and that
      the trial is **14 days** — both need to be true at launch, or reword them
- [ ] Replace the placeholder `AppIcon` component and `public/favicon.svg` with
      renders of the real `.icns`
- [ ] Add `public/og.png` (1200×630); `index.html` already references it
- [ ] Point `links.support` at a mailbox you actually read
