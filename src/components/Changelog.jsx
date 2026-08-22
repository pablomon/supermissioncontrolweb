import { Eyebrow, Heading, Kbd, Section } from './ui'

// Lo mismo que Sparkle enseña al ofrecer cada actualización, que vive en
// App/build/releases/<versión>.html. Son dos sitios y hay que tocar los dos: si
// alguna vez divergen, manda el fichero, porque es el que ve quien ya la tiene
// instalada.
const RELEASES = [
  {
    version: '1.1.1',
    title: 'Added explanation of force quit in welcome panel',
  },
  {
    version: '1.1',
    title: 'Added force quit functionality.',
    body: (
      <>Holding ⌥ turns the close button into a force quit button. Closes the application outright.</>
    ),
  },
  {
    version: '1.0',
    title: 'First release',
    body: (
      <>
        Window controls drawn over Mission Control’s thumbnails: close, minimize and zoom
        whichever window you point at, without leaving the overview. The shortcuts you
        already know apply to it, the arrow keys walk the grid, and it behaves the same in
        App Exposé and across several displays.
      </>
    ),
  },
]

export default function Changelog() {
  return (
    <Section id="changelog" className="py-24 sm:py-32">
      <div className="max-w-2xl">
        <Eyebrow>Release notes</Eyebrow>
        <Heading>What has changed.</Heading>
      </div>

      <ol className="mt-12 space-y-px overflow-hidden rounded-2xl bg-ink-900 ring-1 ring-white/8">
        {RELEASES.map((r) => (
          <li key={r.version} className="border-b border-white/8 px-6 py-6 last:border-0 sm:px-8">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="rounded-md bg-ink-800 px-2 py-0.5 font-mono text-xs text-ink-300 ring-1 ring-white/10">
                {r.version}
              </span>
              <p className="text-[0.9375rem] font-medium text-white">{r.title}</p>
            </div>
            {r.body && (
              <p className="mt-3 max-w-3xl text-[0.9375rem] leading-relaxed text-pretty text-ink-400">
                {r.body}
              </p>
            )}
          </li>
        ))}
      </ol>
    </Section>
  )
}
