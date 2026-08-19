import { useEffect, useState } from 'react'
import { config, priceLabel } from '../config'
import AppIcon from './AppIcon'

const LINKS = [
  { href: '#keyboard', label: 'Keyboard' },
  { href: '#faq', label: 'FAQ' },
  { href: '#pricing', label: 'Pricing' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-white/8 bg-ink-950/80 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-3.5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5 font-semibold text-white">
          <AppIcon className="h-7 w-7" />
          <span className="text-[0.9375rem] tracking-tight">{config.name}</span>
        </a>

        <ul className="ml-auto hidden items-center gap-7 text-sm text-ink-300 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition hover:text-white">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={config.checkoutUrl}
          className="ml-auto rounded-lg bg-white px-4 py-2 text-sm font-semibold text-ink-950 transition hover:bg-ink-100 md:ml-0"
        >
          Buy — {priceLabel}
        </a>
      </nav>
    </header>
  )
}
