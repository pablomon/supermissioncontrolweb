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
          One click, and the application behind it is gone — even when it stopped
          answering long ago.
        </Lead>
        <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-400">
          It sits behind a held key on purpose: this closes the whole app rather
          than one window, and nothing unsaved survives it. Let go of <Kbd>⌥</Kbd>{' '}
          and the ordinary buttons come straight back.
        </p>
      </div>
    </Section>
  )
}
