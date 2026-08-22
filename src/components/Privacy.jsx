import { config } from '../config'
import { Eyebrow, Heading, Lead, Section } from './ui'

// Lo que la app hace y lo que no, en los términos en que se pregunta la gente.
// Hay poco que contar, y eso es exactamente el argumento: la lista corta es la
// prueba.
const POINTS = [
  {
    title: 'What the Accessibility permission is for',
    body: 'Two things only: reading where Mission Control has put each thumbnail, and pressing the close, minimize and zoom buttons of the window you point at. It is the single permission the app asks for.',
  },
  {
    title: 'What it never does',
    body: 'It does not record what you type, take screenshots, read the contents of any window, or look at your files. The permission would technically allow some of that; the app does not do it, and there is nothing in it that would.',
  },
  {
    title: 'What leaves your Mac',
    body: 'Two requests, and nothing else. It asks this site whether a newer version exists, and — if you own a licence — it asks the store whether that licence is still valid. No analytics, no account, no profile, nothing that identifies you or your machine beyond the licence you bought.',
  },
  {
    title: 'What stays on your Mac',
    body: 'When your trial started, and your licence key once you have one. Both live in your keychain and in a file in your own Library folder. Deleting the app leaves them behind so that reinstalling does not hand out a second trial; nothing else is kept anywhere.',
  },
]

export default function Privacy() {
  return (
    <Section id="privacy" className="py-24 sm:py-32">
      <div className="max-w-2xl">
        <Eyebrow>Privacy</Eyebrow>
        <Heading>It asks for a lot of trust. Here is what it does with it.</Heading>
        <Lead className="mt-5">
          Granting Accessibility to an app means letting it act on other apps’ windows,
          and that is a reasonable thing to hesitate over. {config.name} needs it for one
          job and uses it for nothing else.
        </Lead>
      </div>

      <dl className="mt-12 grid gap-x-12 gap-y-9 sm:grid-cols-2">
        {POINTS.map((p) => (
          <div key={p.title}>
            <dt className="text-[0.9375rem] font-medium text-white">{p.title}</dt>
            <dd className="mt-2 text-[0.9375rem] leading-relaxed text-pretty text-ink-400">
              {p.body}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-10 text-sm text-ink-500">
        Questions about any of this?{' '}
        <a
          href={config.links.support}
          className="text-ink-300 underline decoration-white/20 underline-offset-4 transition hover:text-white"
        >
          Get in touch
        </a>
        .
      </p>
    </Section>
  )
}
