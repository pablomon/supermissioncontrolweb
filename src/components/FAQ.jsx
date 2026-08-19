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
    q: 'Does it work in App Exposé?',
    a: 'Yes — the single-app view you reach from a Dock icon or Control-Down. It behaves the same there, with the same control and the same shortcuts.',
  },
  {
    q: 'What about multiple monitors and desktops?',
    a: 'Both are supported. It has been tested with displays at different scale factors, with a second display positioned to the left of the main one, and across several Spaces. Inside a full-screen app’s own Space, Mission Control shows no windows, so nothing is drawn.',
  },
  {
    q: 'Could a macOS update break it?',
    a: `It could. Anything that works inside Mission Control relies on behavior Apple doesn’t document, which is a constraint shared by every app of this kind — one long-standing alternative currently doesn’t run on the latest macOS. The commitment on this side is to keep up with releases, and to refund you if a macOS version ever leaves ${config.name} unusable.`,
  },
  {
    q: 'Is it on the Mac App Store?',
    a: 'No. App Store apps have to be sandboxed, and the sandbox does not permit controlling another app’s windows, which is the whole function. The version sold here is signed with a Developer ID, notarized by Apple, and updates itself.',
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
