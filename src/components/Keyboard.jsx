import { config } from '../config'
import { Eyebrow, Heading, Kbd, Lead, Section } from './ui'

const SHORTCUTS = [
  { keys: ['⌘', 'W'], label: 'Close the window you are pointing at' },
  { keys: ['⌘', 'M'], label: 'Minimize it' },
  { keys: ['⌃', '⌘', 'F'], label: 'Send it full screen' },
  { keys: ['⌘', 'Q'], label: 'Quit the whole app behind it' },
  { keys: ['←', '→', '↑', '↓'], label: 'Walk the grid without the mouse' },
  { keys: ['↩'], label: 'Bring the selected window to the front' },
  { keys: ['⌥'], label: 'Hold to force quit an app that has stopped responding' },
]

export default function Keyboard() {
  return (
    <Section id="keyboard" className="py-14 sm:py-32">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <Eyebrow>Keyboard</Eyebrow>
          <Heading>Windows shortcuts you know, applied to thumbnails.</Heading>
          <Lead className="mt-5">
            {config.name} applies your keyboard shortcuts to the window under your cursor. No need to click a tiny button — just point and press.
          </Lead>
        </div>

        <ul className="divide-y divide-white/8 rounded-2xl bg-ink-900 ring-1 ring-white/8">
          {SHORTCUTS.map((s) => (
            // En móvil las teclas quedan a la izquierda y el texto pegado a la
            // derecha: con la lista entera alineada a la izquierda, los renglones de
            // una y dos líneas dejaban un borde derecho roto que alarga la lista a la
            // vista. Y las filas van más juntas, que siete de ellas con aire de
            // escritorio ocupaban pantalla y cuarto.
            <li
              key={s.label}
              className="flex items-center justify-between gap-4 px-5 py-3 sm:justify-start sm:gap-5 sm:px-6 sm:py-4"
            >
              <span className="flex shrink-0 gap-1">
                {s.keys.map((k) => (
                  <Kbd key={k}>{k}</Kbd>
                ))}
              </span>
              <span className="text-right text-[0.9375rem] text-pretty text-ink-300 sm:text-left">
                {s.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
