import { config } from '../config'
import AppIcon from './AppIcon'

export default function Footer() {
  return (
    <footer className="border-t border-white/8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:px-8">
        <div className="flex items-center gap-2.5">
          <AppIcon className="h-6 w-6" />
          <span className="text-sm font-medium text-ink-200">{config.name}</span>
          <span className="text-sm text-ink-500">v{config.version}</span>
        </div>

        <nav className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-ink-400 sm:ml-auto">
          <a href={config.links.changelog} className="transition hover:text-white">
            Release notes
          </a>
          <a href={config.links.privacy} className="transition hover:text-white">
            Privacy
          </a>
          <a href={config.links.support} className="transition hover:text-white">
            Support
          </a>
        </nav>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-10 text-xs text-ink-500 sm:px-8">
        {config.copyright}
      </div>
    </footer>
  )
}
