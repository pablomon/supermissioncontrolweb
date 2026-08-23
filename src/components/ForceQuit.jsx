import { config } from '../config'
import { Eyebrow, Heading, Kbd, Lead, Section } from './ui'

export default function ForceQuit() {
  return (
    <Section id="force-quit" className="py-24 sm:py-32">
      <div className="max-w-2xl">
        <Eyebrow>Stuck windows</Eyebrow>
        <Heading>Force quit apps straight from Mission Control.</Heading>
        <Lead className="mt-5">
          Hold <Kbd>⌥</Kbd> over any thumbnail to change what the red button does.
          One click quits the app behind it completely — even if it stopped
          responding a while ago.
        </Lead>
        <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-400">
          This is behind a held key on purpose: it closes the whole app, not just
          one window, and anything unsaved is lost. Let go of <Kbd>⌥</Kbd> and the
          normal buttons come back.
        </p>
      </div>
    </Section>
  )
}
