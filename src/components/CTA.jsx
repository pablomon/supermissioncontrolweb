import { config, priceLabel } from '../config'
import { Button, Section } from './ui'

export default function CTA() {
  return (
    <Section className="pb-24 sm:pb-32">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink-800 to-ink-900 px-6 py-16 text-center ring-1 ring-white/10 sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute inset-x-0 -bottom-32 h-64 bg-[radial-gradient(50%_60%_at_50%_0%,rgba(109,141,255,0.25),transparent)]" />

        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
            Try it with your own windows.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-pretty text-ink-300">
            The trial lasts {config.trial.days} days and behaves exactly like the paid version. If
            you decide against it, moving {config.name} to the Trash removes it completely.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={config.trial.downloadUrl}>Download free trial</Button>
            <Button href={config.checkoutUrl} variant="secondary">
              Buy now — {priceLabel}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
