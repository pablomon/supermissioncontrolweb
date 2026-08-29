import { config } from '../config'
import { Eyebrow, Heading, Kbd, Lead, Section } from './ui'
import DemoVideo from './DemoVideo'
import hungWebm from '../assets/hung.webm'
import hungMp4 from '../assets/hung.mp4'
import hungPoster from '../assets/hung-poster.jpg'

export default function ForceQuit() {
  return (
    <Section id="force-quit" className="py-14 sm:py-32">
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

      {/* Debajo del texto y no al lado: la bola de playa girando sobre una ventana
          muerta es la parte que no se puede contar con palabras, pero solo significa
          algo si antes se ha leído que ⌥ cambia lo que hace el botón rojo. */}
      <DemoVideo
        className="mt-14 sm:mt-16"
        webm={hungWebm}
        mp4={hungMp4}
        poster={hungPoster}
        label="Force quitting an unresponsive app from Mission Control by holding Option"
      />
    </Section>
  )
}
