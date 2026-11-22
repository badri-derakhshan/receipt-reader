import { Braces, Download } from 'lucide-react'

import type { UIStrings } from '../i18n/ui'
import { downloadCsv, downloadJson } from '../lib/export'
import type { AnalyzeResponse, LanguageCode } from '../types'

interface ExportButtonsProps {
  response: AnalyzeResponse
  language: LanguageCode
  t: UIStrings
}

export function ExportButtons({ response, language, t }: ExportButtonsProps) {
  return (
    <div className="grid gap-2">
      <button
        type="button"
        onClick={() => downloadCsv(response.receipt, language)}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-paper shadow-sm transition hover:bg-accent-strong"
      >
        <Download className="size-4" aria-hidden="true" />
        {t.exportCsv}
      </button>
      <button
        type="button"
        onClick={() => downloadJson(response)}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-card px-4 py-2.5 text-sm font-medium text-ink shadow-sm transition hover:border-accent/40 hover:bg-accent-soft/40"
      >
        <Braces className="size-4" aria-hidden="true" />
        {t.exportJson}
      </button>
    </div>
  )
}
