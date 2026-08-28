import { buyAction, config, trialAction } from '../config'
import { Button, Section } from './ui'

export default function CTA() {
  return (
    <Section className="pb-24 sm:pb-32">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink-800 to-ink-900 px-6 py-16 text-center ring-1 ring-white/10 sm:px-12 sm:py-20">
        {/* El origen va en el borde inferior de la tarjeta, no en el borde superior
            de esta caja: allí el degradado se recortaba de golpe y dejaba una línea
            recta atravesando la tarjeta justo encima de los botones. Naciendo abajo,
            sube y se apaga sin que ningún corte quede dentro de lo visible. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-96 bg-[radial-gradient(60%_100%_at_50%_100%,rgba(109,141,255,0.22),transparent)]" />

        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
            Try it on your Mac.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-pretty text-ink-300">
            The trial lasts {config.trial.days} days and behaves exactly like the paid version. If
            you decide against it, moving {config.name} to the Trash removes it completely.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {trialAction && <Button href={trialAction.href}>{trialAction.label}</Button>}
            <Button href={buyAction.href} variant={trialAction ? 'secondary' : undefined}>
              {buyAction.label}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
