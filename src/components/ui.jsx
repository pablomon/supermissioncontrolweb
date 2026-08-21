export function Kbd({ children }) {
  return (
    <kbd className="inline-flex min-w-[1.6rem] items-center justify-center rounded-md border-b-2 border-black/50 bg-ink-700 px-1.5 py-1 font-sans text-[0.8125rem] leading-none font-medium text-ink-100 shadow-sm">
      {children}
    </kbd>
  )
}

export function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </section>
  )
}

export function Eyebrow({ children }) {
  return (
    <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-accent-soft uppercase">
      {children}
    </p>
  )
}

export function Heading({ children, className = '' }) {
  return (
    <h2
      className={`text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl ${className}`}
    >
      {children}
    </h2>
  )
}

export function Lead({ children, className = '' }) {
  return (
    <p className={`text-lg leading-relaxed text-pretty text-ink-300 ${className}`}>{children}</p>
  )
}

export function Button({ href, variant = 'primary', className = '', children, ...rest }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[0.9375rem] font-semibold transition duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

  const styles = {
    primary:
      'bg-white text-ink-950 shadow-lg shadow-black/30 hover:bg-ink-100 active:translate-y-px',
    secondary: 'bg-ink-800 text-ink-100 ring-1 ring-white/10 hover:bg-ink-700 active:translate-y-px',
    ghost: 'text-ink-200 hover:text-white',
  }

  // No destination means the thing it leads to is not ready. It renders as plainly
  // unavailable rather than as a button that swallows the click: a control that
  // looks pressable and does nothing reads as a broken site, and the visitor who
  // concludes that does not come back to check later.
  if (!href) {
    return (
      <span
        aria-disabled="true"
        className={`${base} cursor-default bg-ink-800/60 text-ink-400 ring-1 ring-white/5 ${className}`}
      >
        {children}
      </span>
    )
  }

  return (
    <a href={href} className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </a>
  )
}
