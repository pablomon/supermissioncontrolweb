/**
 * The three macOS window buttons. `size` is the diameter in pixels.
 * `dim` draws them the way an inactive window does: grey, no color.
 */
export default function TrafficLight({ size = 6, dim = false, buttons = ['close', 'min', 'zoom'] }) {
  const color = {
    close: 'bg-light-red',
    min: 'bg-light-yellow',
    zoom: 'bg-light-green',
  }

  return (
    <div className="flex items-center" style={{ gap: size * 0.65 }}>
      {['close', 'min', 'zoom'].map((b) => (
        <span
          key={b}
          className={`rounded-full ${
            !buttons.includes(b) ? 'bg-white/10' : dim ? 'bg-white/25' : color[b]
          }`}
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  )
}
