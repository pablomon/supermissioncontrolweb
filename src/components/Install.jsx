import { config } from '../config'
import { Eyebrow, Heading, Section } from './ui'

const STEPS = [
  {
    n: '1',
    title: 'Drag it to Applications',
    body: `A signed disk image of ${config.trial.sizeMB} MB, with no installer and no helper tool. Removing ${config.name} later is a matter of moving it to the Trash.`,
  },
  {
    n: '2',
    title: 'Grant the Accessibility permission',
    body: `Pressing the buttons of another app’s window requires it, and macOS only lets you grant it by hand in System Settings. ${config.name} waits for the switch and continues as soon as you turn it on, without a restart.`,
  },
  {
    n: '3',
    title: 'Open Mission Control',
    body: 'Point at any window and the control appears over its traffic light. Launch at login is a menu bar option you can turn on later, or leave off.',
  },
]

export default function Install() {
  return (
    <Section id="install" className="py-24 sm:py-32">
      <div className="max-w-2xl">
        <Eyebrow>Setup</Eyebrow>
        <Heading>Installing it takes 2 seconds.</Heading>
        <p className="mt-5 text-lg text-pretty text-ink-300">
          There is one permission to grant, and no configuration to work through afterwards.
        </p>
      </div>

      <ol className="mt-14 grid gap-4 md:grid-cols-3">
        {STEPS.map((s) => (
          <li key={s.n} className="rounded-2xl bg-ink-900 p-7 ring-1 ring-white/8">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent-soft ring-1 ring-accent/30">
              {s.n}
            </span>
            <h3 className="mt-5 text-lg font-semibold text-white">{s.title}</h3>
            <p className="mt-2.5 leading-relaxed text-pretty text-ink-300">{s.body}</p>
          </li>
        ))}
      </ol>

      <div
        id="compatibility"
        className="mt-4 grid gap-4 rounded-2xl bg-ink-900 p-7 ring-1 ring-white/8 sm:grid-cols-3"
      >
        <Fact
          label="macOS"
          value={`${config.requirements.minMacOS} – ${config.requirements.latestTested}`}
          detail={`${config.requirements.minMacOSName} through ${config.requirements.latestTestedName}, tested on each`}
        />
        <Fact
          label="Macs"
          value={config.requirements.architectures}
          detail="Universal binary, native on both"
        />
        <Fact
          label="Privacy"
          value="No network, no accounts"
          detail="Nothing is collected or sent, and it runs offline"
        />
      </div>
    </Section>
  )
}

function Fact({ label, value, detail }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.14em] text-ink-400 uppercase">{label}</p>
      <p className="mt-2 text-lg font-medium text-white">{value}</p>
      <p className="mt-1 text-sm text-pretty text-ink-400">{detail}</p>
    </div>
  )
}
