import { config, priceLabel } from '../config'
import { Button, Eyebrow, Heading, Section } from './ui'

const INCLUDED = [
  'One license, active on up to 5 Macs at a time',
  'Mission Control and App Exposé, by mouse and by keyboard',
  'Updates throughout the 1.x line',
  'No account, no subscription and no telemetry',
  'Refundable within 30 days',
]

export default function Pricing() {
  return (
    <Section id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>Pricing</Eyebrow>
        <Heading>A one-time purchase.</Heading>
        <p className="mt-5 text-lg text-pretty text-ink-300">
          The trial runs for {config.trial.days} days with every feature enabled, and doesn’t ask
          for an email address.
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-lg">
        <div className="relative overflow-hidden rounded-3xl bg-ink-900 p-8 ring-1 ring-white/10 sm:p-10">
          {/* Mismo arreglo que en el CTA, en espejo: el origen iba en el borde
              inferior de esta caja, o sea 96 px por dentro de la tarjeta, y ahí el
              degradado se cortaba en seco dejando una línea recta. Naciendo en el
              borde superior, cae y se apaga sin corte visible. */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(109,141,255,0.18),transparent)]" />

          <div className="relative">
            <p className="text-sm font-medium text-ink-300">{config.name} license</p>

            <p className="mt-3 flex items-baseline gap-3">
              <span className="text-5xl font-semibold tracking-tight text-white">{priceLabel}</span>
              {config.price.compareAt && (
                <span className="text-xl text-ink-400 line-through">
                  {config.price.symbol}
                  {config.price.compareAt}
                </span>
              )}
              <span className="text-sm text-ink-400">one time</span>
            </p>
            <p className="mt-2 text-sm text-ink-400">{config.price.note}</p>

            <ul className="mt-8 space-y-3.5">
              {INCLUDED.map((item) => (
                <li key={item} className="flex gap-3 text-[0.9375rem] text-pretty text-ink-200">
                  <Check />
                  {item}
                </li>
              ))}
            </ul>

            <Button href={config.checkoutUrl} className="mt-9 w-full">
              {config.checkoutUrl ? `Buy a license — ${priceLabel}` : config.unavailableLabel}
            </Button>
            <Button href={config.trial.downloadUrl} variant="secondary" className="mt-3 w-full">
              {config.trial.downloadUrl ? 'Download the free trial' : config.unavailableLabel}
            </Button>

            <p className="mt-5 text-center text-xs text-ink-400">
              Sold directly rather than through the Mac App Store, whose sandbox does not allow an
              app to control another app’s windows.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 text-light-green" aria-hidden="true">
      <path
        d="m3 8.5 3.2 3.2L13 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
