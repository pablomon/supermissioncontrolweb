import { useEffect, useRef, useState } from 'react'
import TrafficLight from './TrafficLight'
import WindowSkeleton from './WindowSkeleton'

/**
 * A playable miniature of Mission Control. Hovering a thumbnail brings up the
 * pill exactly the way the app does: anchored over that window's own traffic
 * light, replacing it rather than sitting next to it. Only the buttons a
 * window actually has are drawn — see the dialog in the bottom row.
 */

const WINDOWS = [
  { id: 'safari', name: 'Safari', kind: 'browser', accent: '#4a9eff', weight: 5, row: 0 },
  { id: 'code', name: 'Xcode', kind: 'code', accent: '#7f8cff', weight: 4, row: 0 },
  { id: 'term', name: 'Terminal', kind: 'terminal', accent: '#3ddc84', weight: 3, row: 0 },
  { id: 'music', name: 'Music', kind: 'music', accent: '#fc3c58', weight: 3, row: 1 },
  { id: 'notes', name: 'Notes', kind: 'notes', accent: '#ffc93c', weight: 4, row: 1 },
  { id: 'finder', name: 'Finder', kind: 'files', accent: '#4a9eff', weight: 3, row: 1 },
  {
    id: 'dialog',
    name: 'About This Mac',
    kind: 'dialog',
    accent: '#8e94a8',
    weight: 2,
    row: 1,
    compact: true,
    // A dialog has no minimize and no zoom. The pill won't offer them.
    buttons: ['close'],
  },
]

const ACTION_LABEL = {
  close: 'Close window',
  min: 'Minimize window',
  zoom: 'Full screen',
}

export default function MissionControlDemo() {
  const [status, setStatus] = useState({}) // id -> 'closing' | 'minimizing' | 'gone'
  const [hovered, setHovered] = useState(null)
  const [phase, setPhase] = useState('grid') // 'grid' | 'exiting' | 'fullscreen'
  const [zoomed, setZoomed] = useState(null)
  const [touched, setTouched] = useState(false)
  const timers = useRef([])

  const after = (ms, fn) => timers.current.push(setTimeout(fn, ms))
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  // Only the thumbnail that currently owns the hover may clear it. Leaving one
  // thumbnail and entering the next fires leave-then-enter, but a blur can
  // arrive later than both — and an unconditional reset would then take down
  // the pill of the thumbnail the cursor had already moved on to.
  const clearHover = (id) => setHovered((h) => (h === id ? null : h))

  const perform = (action, id) => {
    setTouched(true)
    setHovered(null)

    if (action === 'zoom') {
      // The real app has to dismiss Mission Control before a window can go
      // full screen — the WindowServer drops the request otherwise. The demo
      // plays out the same two beats.
      setPhase('exiting')
      after(420, () => {
        setZoomed(id)
        setPhase('fullscreen')
      })
      return
    }

    setStatus((s) => ({ ...s, [id]: action === 'close' ? 'closing' : 'minimizing' }))
    after(420, () => setStatus((s) => ({ ...s, [id]: 'gone' })))
  }

  const restore = () => {
    setPhase('grid')
    setZoomed(null)
  }

  const reset = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setStatus({})
    setPhase('grid')
    setZoomed(null)
    setHovered(null)
  }

  const live = WINDOWS.filter((w) => status[w.id] !== 'gone')
  const dirty = live.length !== WINDOWS.length || phase !== 'grid'
  const zoomedWindow = WINDOWS.find((w) => w.id === zoomed)

  return (
    <div className="relative">
      {/* The screen */}
      <div className="relative overflow-hidden rounded-xl bg-ink-900 shadow-2xl shadow-black/60 ring-1 ring-white/10 sm:rounded-2xl">
        {/* Wallpaper */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1b2a55] via-[#3a2a5e] to-[#1a1730]" />
        <div className="absolute -top-1/4 left-1/3 h-2/3 w-2/3 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute -bottom-1/3 -left-1/4 h-2/3 w-2/3 rounded-full bg-[#ff6ba8]/15 blur-3xl" />

        {/* Menu bar — the pill is deliberately kept below it, so it can never
            cover the clock the way a shielding-level window would. */}
        <div className="relative flex h-5 items-center justify-between bg-black/25 px-3 text-[8px] font-medium text-white/70 backdrop-blur-sm sm:h-6 sm:text-[10px]">
          <span className="flex items-center gap-2">
            <span className="opacity-90"></span>
            <span className="hidden sm:inline">Finder</span>
          </span>
          <span className="tabular-nums opacity-80">9:41</span>
        </div>

        {/* Desktop */}
        <div className="relative aspect-[16/10]">
          <div
            className={`absolute inset-0 flex flex-col gap-[2%] p-[2.5%] transition-all duration-[400ms] ease-out ${
              phase === 'grid'
                ? 'scale-100 opacity-100'
                : 'pointer-events-none scale-[1.12] opacity-0'
            }`}
          >
            {[0, 1].map((row) => (
              <div key={row} className="flex min-h-0 flex-1">
                {WINDOWS.filter((w) => w.row === row).map((w) => (
                  <Thumbnail
                    key={w.id}
                    win={w}
                    status={status[w.id]}
                    hovered={hovered === w.id}
                    onHover={setHovered}
                    onLeave={clearHover}
                    onAction={perform}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Full screen result of the green button */}
          {phase === 'fullscreen' && zoomedWindow && (
            <div className="absolute inset-0 animate-rise p-[1.5%]">
              <div className="h-full overflow-hidden rounded-lg bg-ink-800/95 ring-1 ring-white/15">
                <div className="flex h-6 items-center justify-center border-b border-white/8 bg-white/5 text-[10px] text-white/70">
                  {zoomedWindow.name}
                </div>
                <div className="h-[calc(100%-1.5rem)] scale-[1.6] opacity-90">
                  <WindowSkeleton kind={zoomedWindow.kind} accent={zoomedWindow.accent} />
                </div>
              </div>
            </div>
          )}

          {/* Hint */}
          {!touched && phase === 'grid' && (
            <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
              <span className="animate-float rounded-full bg-black/55 px-3 py-1.5 text-[11px] font-medium text-white/85 backdrop-blur-sm">
                Hover any window
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Caption / controls */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-ink-400">
        {phase === 'fullscreen' ? (
          <>
            <span>
              <span className="text-ink-200">{zoomedWindow?.name}</span> is now full screen. Mission
              Control closes on its own first, without you having to do it.
            </span>
            <button
              onClick={restore}
              className="rounded-full bg-ink-700 px-3 py-1 text-xs font-medium text-ink-100 transition hover:bg-ink-600"
            >
              Back to Mission Control
            </button>
          </>
        ) : (
          <>
            <span>A working demo: point at a window and use the three buttons.</span>
            {dirty && (
              <button
                onClick={reset}
                className="rounded-full bg-ink-700 px-3 py-1 text-xs font-medium text-ink-100 transition hover:bg-ink-600"
              >
                Reopen the windows
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function Thumbnail({ win, status, hovered, onHover, onLeave, onAction }) {
  const buttons = win.buttons ?? ['close', 'min', 'zoom']
  const gone = status === 'gone'

  // `gone` needs a case of its own. Falling through to the default put the
  // thumbnail back at full opacity once the fade had finished, so it faded
  // back in every time something else on the screen animated. `invisible`
  // takes it out of the paint entirely until the demo is reset.
  const state =
    {
      closing: 'scale-90 opacity-0',
      minimizing: 'translate-y-[55%] scale-[0.35] opacity-0',
      gone: 'invisible scale-90 opacity-0',
    }[status] ?? 'scale-100 opacity-100'

  return (
    // The slot keeps its size when the window inside it goes. Re-flowing the
    // survivors into the gap looked good but was an invented behavior: how the
    // real grid re-packs after a close is the Dock's business, not ours, and
    // showing our own version of it would be selling something we haven't
    // matched. The demo is here to show the pill — it stays quiet about
    // everything else.
    //
    // No `overflow-hidden` either: it would clip the pill, which deliberately
    // sticks out past the thumbnail's top-left corner, and would slice the
    // thumbnail in half as it slides away on minimize.
    <div
      className={`flex min-w-0 items-center ${status ? 'pointer-events-none' : ''}`}
      style={{ flexGrow: win.weight, flexBasis: 0, padding: '0 1%' }}
    >
      <div
        tabIndex={gone ? -1 : 0}
        onMouseEnter={() => onHover(win.id)}
        // `mousemove` as well as `mouseenter`: after an action clears the hover
        // the cursor is usually still inside the same thumbnail, and no second
        // `mouseenter` is coming. Without this the pill stays away until you
        // leave and come back. Re-setting the same id is a no-op re-render.
        onMouseMove={() => onHover(win.id)}
        onMouseLeave={() => onLeave(win.id)}
        onFocus={() => onHover(win.id)}
        onBlur={() => onLeave(win.id)}
        className={`group relative w-full ${win.compact ? 'h-[70%]' : 'h-full'} rounded-md bg-ink-800/90 shadow-lg shadow-black/40 outline-none ring-1 ring-white/10 transition-all duration-[400ms] ease-out focus-visible:ring-2 focus-visible:ring-accent ${state}`}
      >
        {/* The window's own chrome. The pill lands right on top of it. */}
        <div className="flex h-4 items-center border-b border-white/8 px-2 sm:h-5">
          <TrafficLight size={6} dim buttons={buttons} />
          <span className="ml-auto truncate pr-1 text-[7px] text-white/40 sm:text-[8px]">
            {win.name}
          </span>
        </div>
        <div className="h-[calc(100%-1rem)] overflow-hidden sm:h-[calc(100%-1.25rem)]">
          <WindowSkeleton kind={win.kind} accent={win.accent} />
        </div>

        {/* The pill. Anchored so its red button lands on the window's own red
            button — the app aligns them the same way, which is what keeps it
            from being pushed off-screen by a window near the left edge. It
            grows from that corner, not from its center. */}
        <div
          className={`group/pill absolute -top-[5px] -left-[6px] z-10 flex origin-top-left items-center gap-[7px] rounded-full bg-ink-950/92 px-2.5 py-2 shadow-xl shadow-black/60 ring-1 ring-white/15 backdrop-blur-md transition-all duration-150 ${
            hovered ? 'scale-100 opacity-100' : 'pointer-events-none scale-75 opacity-0'
          }`}
        >
          {buttons.map((b) => (
            <PillButton key={b} kind={b} onClick={() => onAction(b, win.id)} />
          ))}
        </div>
      </div>
    </div>
  )
}

function PillButton({ kind, onClick }) {
  const style = {
    close: 'bg-light-red hover:brightness-110',
    min: 'bg-light-yellow hover:brightness-110',
    zoom: 'bg-light-green hover:brightness-110',
  }[kind]

  const glyph = { close: '✕', min: '−', zoom: '⤢' }[kind]

  return (
    <button
      onClick={onClick}
      aria-label={ACTION_LABEL[kind]}
      className={`flex h-3.5 w-3.5 items-center justify-center rounded-full text-[9px] leading-none font-bold text-black/60 transition ${style} focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none`}
    >
      <span className="opacity-0 transition-opacity duration-100 group-hover/pill:opacity-100">
        {glyph}
      </span>
    </button>
  )
}
