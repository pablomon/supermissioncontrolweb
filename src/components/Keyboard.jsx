import { config } from '../config'
import { Eyebrow, Heading, Kbd, Lead, Section } from './ui'

const SHORTCUTS = [
  { keys: ['⌘', 'W'], label: 'Close the window you are pointing at' },
  { keys: ['⌘', 'M'], label: 'Minimize it' },
  { keys: ['⌃', '⌘', 'F'], label: 'Send it full screen' },
  { keys: ['⌘', 'Q'], label: 'Quit the whole app behind it' },
  { keys: ['←', '→', '↑', '↓'], label: 'Walk the grid without the mouse' },
  { keys: ['↩'], label: 'Bring the selected window to the front' },
]

export default function Keyboard() {
  return (
    <Section id="keyboard" className="py-24 sm:py-32">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <Eyebrow>Keyboard</Eyebrow>
          <Heading>Windows shortcuts you know, applied to thumbnails.</Heading>
          <Lead className="mt-5">
            {config.name} applies your keyboard shortcuts directly to the window under your cursor. No need to aim at a control a few pixels across—just point and press.
          </Lead>
        </div>

        <ul className="divide-y divide-white/8 rounded-2xl bg-ink-900 ring-1 ring-white/8">
          {SHORTCUTS.map((s) => (
            <li key={s.label} className="flex items-center gap-5 px-6 py-4">
              <span className="flex shrink-0 gap-1">
                {s.keys.map((k) => (
                  <Kbd key={k}>{k}</Kbd>
                ))}
              </span>
              <span className="text-[0.9375rem] text-pretty text-ink-300">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
