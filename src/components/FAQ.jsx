import { config } from '../config'
import { Eyebrow, Heading, Section } from './ui'

const QUESTIONS = [
  {
    q: 'Why does it need the Accessibility permission?',
    a: `Because pressing the buttons of another app’s window is something macOS puts behind that permission. It is the only one ${config.name} requests, you grant it by hand in System Settings, and you can revoke it at any time. It asks for no access to your files, camera or network.`,
  },
  {
    q: 'Aren’t there already traffic lights on every thumbnail?',
    a: 'What you see is a picture, not real buttons. Mission Control draws each thumbnail as a static image, so clicking a "button" just selects the window — same as clicking anywhere else on it. In App Exposé the thumbnails are almost full size, so this is easy to miss. This app adds working buttons on top.',
  },
  {
    q: 'What if a window refuses to close?',
    a: `Some windows have no close button. Others belong to an app that has stopped responding, so the close button does nothing. Hold ⌥ over the thumbnail and the red button turns black with a warning mark — one click force quits that app. It doesn’t ask first, and any unsaved work is lost. That’s the point: it’s a last resort, which is why it takes a held key to reach.`,
  },
  {
    q: 'Does it work in App Exposé?',
    a: 'Yes — the single-app view you reach from a Dock icon or Control-Down. It behaves the same there, with the same control and the same shortcuts.',
  },
  {
    q: 'Is it on the Mac App Store?',
    a: 'No, and it can’t be. App Store apps are kept isolated from each other, and controlling another app’s windows is this app’s entire purpose. Apple still reviews every version before it reaches you, and the app updates itself automatically.',
  },
  {
    q: 'Will I notice it running?',
    a: 'It runs from the menu bar, with no Dock icon and no window of its own. It only does any work while Mission Control is open, and has no noticeable effect on performance or battery.',
  },
  {
    q: 'How many Macs does one license cover?',
    a: 'Five at a time. If you reach the limit, you don’t need to buy again — deactivate a Mac you no longer use, and that spot opens up for another one.',
  },
]

export default function FAQ() {
  return (
    <Section id="faq" className="py-24 sm:py-32">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
        <div>
          <Eyebrow>Questions</Eyebrow>
          <Heading>Common questions.</Heading>
          <p className="mt-5 leading-relaxed text-ink-400">
            Other questions?{' '}
            <a
              href={config.links.support}
              className="text-accent-soft underline underline-offset-4 hover:text-white"
            >
              Get in touch
            </a>
            .
          </p>
        </div>

        <div className="divide-y divide-white/8 border-y border-white/8">
          {QUESTIONS.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center gap-4 text-[1.0625rem] font-medium text-pretty text-white marker:hidden">
                {item.q}
                <svg
                  viewBox="0 0 16 16"
                  className="ml-auto h-4 w-4 shrink-0 text-ink-400 transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                >
                  <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </summary>
              <p className="mt-3 max-w-2xl leading-relaxed text-pretty text-ink-300">{item.a}</p>
            </details>
          ))}
        </div>


        {/* La segunda, y a propósito. Arriba está antes de las preguntas y abajo
            después de leerlas: repetirlo es barato, y en una utilidad barata de un
            desarrollador que nadie conoce, ver dos veces que hay alguien detrás
            pesa más que la elegancia de no repetirse. */}
        <p className="mt-10 text-[0.9375rem] text-ink-400 lg:col-start-2">
          Need support?{' '}
          <a
            href={config.links.support}
            className="font-medium text-white underline decoration-white/25 underline-offset-4 transition hover:decoration-white"
          >
            Get in touch
          </a>
          .
        </p>
      </div>
    </Section>
  )
}
