import { LoaderCircle } from 'lucide-react'

import type { UIStrings } from '../i18n/ui'

interface AnalyzeProgressProps {
  t: UIStrings
  onCancel: () => void
}

export function AnalyzeProgress({ t, onCancel }: AnalyzeProgressProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-4 overflow-hidden rounded-[2rem] border border-line bg-card shadow-card"
    >
      <div className="h-1.5 overflow-hidden bg-accent-soft">
        <div className="scan-bar h-full w-1/3 rounded-full bg-accent" />
      </div>

      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
            <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">{t.analyzing}</p>
            <p className="mt-0.5 text-xs text-muted">{t.mockHint}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="self-start rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-muted transition hover:border-ink/20 hover:text-ink sm:self-auto"
        >
          {t.cancel}
        </button>
      </div>

      <div className="space-y-2 px-5 pb-5" aria-hidden="true">
        {[0, 1, 2].map((row) => (
          <div
            key={row}
            className="h-10 animate-pulse rounded-xl bg-paper"
            style={{ animationDelay: `${row * 140}ms` }}
          />
        ))}
      </div>
    </div>
  )
}
