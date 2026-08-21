import { config, priceLabel } from '../config'
import MissionControlDemo from './MissionControlDemo'
import { Button } from './ui'

const TRUST_ITEMS = [
  'Native macOS app',
  'No subscription',
  'Lightweight',
  'Privacy-focused',
  'Apple notarized',
]

export default function Hero() {
  return (
    <div id="top" className="relative overflow-hidden">
      {/* Ambient light */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-[38rem] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(109,141,255,0.22),transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-20 sm:px-8 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <a
            href="#compatibility"
            className="inline-flex items-center gap-2 rounded-full bg-ink-800/80 px-3.5 py-1.5 text-xs font-medium text-ink-200 ring-1 ring-white/10 transition hover:bg-ink-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-light-green" />
            Built and tested on macOS {config.requirements.latestTested}
          </a>

          <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance text-white sm:text-6xl">
            Mission Control,
            <br className="hidden sm:block" /> finally with control buttons.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-ink-300 sm:text-xl">
            {config.tagline}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={config.trial.downloadUrl}>
              {config.trial.downloadUrl && <DownloadIcon />}
              {config.trial.downloadUrl ? 'Download free trial' : config.unavailableLabel}
            </Button>
            <Button href={config.checkoutUrl} variant="secondary">
              {config.checkoutUrl ? `Buy a license — ${priceLabel}` : config.unavailableLabel}
            </Button>
          </div>

          <p className="mt-5 text-sm font-medium text-accent-soft">Use it on up to 6 Macs</p>

          <p className="mt-4 text-sm text-ink-400">
            {config.trial.days}-day trial, no account. macOS {config.requirements.minMacOS}+ ·{' '}
            {config.requirements.architectures} · {config.trial.sizeMB} MB
          </p>
          <p className="mt-1 text-sm text-ink-400">{config.price.note}</p>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-ink-300">
            {TRUST_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <CheckIcon />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 sm:mt-16">
          <MissionControlDemo />
        </div>
      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-light-green" fill="none" aria-hidden="true">
      <path
        d="M3.5 8.5 6.5 11.5 12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M8 1.5v9m0 0 3.2-3.2M8 10.5 4.8 7.3M2 12.5v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
