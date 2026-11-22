import { ReceiptText } from 'lucide-react'

import type { UIStrings } from '../i18n/ui'
import type { LanguageCode } from '../types'
import { LanguageSelect } from './LanguageSelect'

interface AppHeaderProps {
  language: LanguageCode
  onLanguageChange: (language: LanguageCode) => void
  t: UIStrings
}

export function AppHeader({ language, onLanguageChange, t }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-paper/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-accent text-card shadow-card">
            <ReceiptText className="size-5" strokeWidth={2.2} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-lg font-semibold leading-none tracking-tight">
              Receipt Reader
            </p>
            <p className="mt-1 hidden max-w-[20rem] text-[10px] font-medium leading-tight text-muted sm:block">
              {t.tagline}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border border-accent/20 bg-accent-soft/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-accent sm:inline-flex">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            {t.mockBadge}
          </span>
          <LanguageSelect language={language} onChange={onLanguageChange} t={t} />
        </div>
      </div>
    </header>
  )
}
