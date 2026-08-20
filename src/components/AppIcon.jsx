/**
 * The app icon as SVG, so it stays crisp in the nav at any density. Unlike the
 * .icns render it fills the whole frame — the macOS icon grid leaves a margin
 * that only wastes pixels here.
 */
export default function AppIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Super Mission Control">
      <defs>
        <linearGradient id="smc-bg" x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#3f79e0" />
          <stop offset="12%" stopColor="#2159cb" />
          <stop offset="60%" stopColor="#1c49b0" />
          <stop offset="100%" stopColor="#16326f" />
        </linearGradient>
        <linearGradient id="smc-panel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdfdfe" />
          <stop offset="100%" stopColor="#eceef4" />
        </linearGradient>
        <linearGradient id="smc-pill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#343437" />
          <stop offset="100%" stopColor="#232325" />
        </linearGradient>
      </defs>

      <rect width="64" height="64" rx="14.3" fill="url(#smc-bg)" />

      <g fill="url(#smc-panel)">
        <rect x="6.8" y="7.2" width="28.4" height="18" rx="3.2" />
        <rect x="38.1" y="7.2" width="19.2" height="18" rx="3.2" />
        <rect x="6.8" y="27.9" width="50.5" height="27.2" rx="3.2" />
      </g>

      <g transform="translate(8.3 29.4)">
        <rect width="28.7" height="10.3" rx="5.15" fill="url(#smc-pill)" />
        <circle cx="5.7" cy="5.15" r="2.7" fill="#ee4038" />
        <circle cx="14.3" cy="5.15" r="2.7" fill="#f9b418" />
        <circle cx="22.8" cy="5.15" r="2.7" fill="#2ec04d" />
      </g>

      <rect
        x="0.4"
        y="0.4"
        width="63.2"
        height="63.2"
        rx="13.9"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.22"
        strokeWidth="0.8"
      />
    </svg>
  )
}
