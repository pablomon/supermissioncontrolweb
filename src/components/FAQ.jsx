import { config } from '../config'
import { Eyebrow, Heading, Section } from './ui'

const QUESTIONS = [
  {
    q: 'Why does it need the Accessibility permission?',
    a: `Because pressing the buttons of another app’s window is something macOS puts behind that permission. It is the only one ${config.name} requests, you grant it by hand in System Settings, and you can revoke it at any time. It asks for no access to your files, camera or network.`,
  },
  {
    q: 'Aren’t there already traffic lights on every thumbnail?',
    a: 'What you see is a picture of them. Mission Control draws each thumbnail as an image of the window, so those buttons aren’t buttons: clicking one selects the window like clicking anywhere else on it. In App Exposé the thumbnails are close to full size, which makes them look even more like the real thing. This app places a working control over them.',
  },
  {
    q: 'What if a window refuses to close?',
    a: `Some windows have no close button at all, and some belong to an app that has stopped answering — the two cases where a close button would be useless anyway. Hold ⌥ over the thumbnail and the red button turns black, with a warning mark: one click forces that application to quit. It does not ask the app first and nothing unsaved is kept, which is the point of it, so it takes a held key to reach.`,
  },
  {
    q: 'Does it work in App Exposé?',
    a: 'Yes — the single-app view you reach from a Dock icon or Control-Down. It behaves the same there, with the same control and the same shortcuts.',
  },
  {
    q: 'Is it on the Mac App Store?',
    a: 'No, and it can’t be. Apps in the App Store are kept walled off from one another, and reaching into another app’s windows is the whole of what this one does. Apple still checks every version before it reaches you, and the app keeps itself up to date.',
  },
  {
    q: 'Will I notice it running?',
    a: 'It runs from the menu bar, with no Dock icon and no window of its own. It only does any work while Mission Control is open, and has no noticeable effect on performance or battery.',
  },
  {
    q: 'How many Macs does one license cover?',
    a: 'Each license can be activated on up to 6 Macs. If you reach the limit, you can deactivate a Mac you no longer use and activate another.',
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
            If something isn’t covered here,{' '}
            <a
              href={config.links.support}
              className="text-accent-soft underline underline-offset-4 hover:text-white"
            >
              send me an email
            </a>{' '}
            and I’ll answer it.
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
      </div>
    </Section>
  )
}
