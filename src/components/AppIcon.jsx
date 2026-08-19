/**
 * Stand-in app icon: the Mission Control grid with a traffic light sitting on
 * one of the thumbnails. Swap for the real .icns render when there is one.
 */
export default function AppIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Super Mission Control">
      <defs>
        <linearGradient id="smc-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b4a7a" />
          <stop offset="100%" stopColor="#1b1c2e" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#smc-bg)" />
      <rect x="0.5" y="0.5" width="63" height="63" rx="13.5" fill="none" stroke="#ffffff" strokeOpacity="0.14" />

      <g fill="#ffffff" fillOpacity="0.22">
        <rect x="11" y="14" width="20" height="14" rx="2.5" />
        <rect x="34" y="14" width="19" height="14" rx="2.5" />
        <rect x="11" y="31" width="19" height="14" rx="2.5" />
        <rect x="33" y="31" width="20" height="14" rx="2.5" />
      </g>

      <g transform="translate(24 44)">
        <rect x="0" y="0" width="30" height="12" rx="6" fill="#0b0c10" fillOpacity="0.92" />
        <circle cx="8" cy="6" r="3" fill="#ff5f57" />
        <circle cx="15" cy="6" r="3" fill="#febc2e" />
        <circle cx="22" cy="6" r="3" fill="#28c840" />
      </g>
    </svg>
  )
}
