import { ChevronDown, Globe2 } from 'lucide-react'

import { LANGUAGES } from '../i18n/languages'
import type { UIStrings } from '../i18n/ui'
import type { LanguageCode } from '../types'

interface LanguageSelectProps {
  language: LanguageCode
  onChange: (language: LanguageCode) => void
  t: UIStrings
}

export function LanguageSelect({ language, onChange, t }: LanguageSelectProps) {
  return (
    <label className="relative flex items-center gap-2 rounded-full border border-line bg-card/90 py-2 pe-8 ps-3 shadow-sm transition hover:border-accent/40 focus-within:border-accent/60 focus-within:ring-2 focus-within:ring-accent/15">
      <Globe2 className="size-4 shrink-0 text-accent" aria-hidden="true" />
      <span className="sr-only">{t.language}</span>
      <select
        aria-label={t.language}
        value={language}
        onChange={(event) => onChange(event.target.value as LanguageCode)}
        className="max-w-[9.5rem] cursor-pointer appearance-none bg-transparent text-sm font-medium text-ink outline-none sm:max-w-[13rem]"
      >
        {LANGUAGES.map((option) => (
          <option key={option.code} value={option.code} title={option.label}>
            {option.nativeLabel}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute end-2.5 size-4 text-muted"
        aria-hidden="true"
      />
    </label>
  )
}
