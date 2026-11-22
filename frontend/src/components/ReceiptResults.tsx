import {
  ArrowRight,
  CalendarDays,
  FlaskConical,
  Languages,
  Plus,
} from 'lucide-react'

import { getLanguage } from '../i18n/languages'
import { formatItemCount, getErrorMessage, type UIStrings } from '../i18n/ui'
import { formatDate } from '../lib/format'
import { groupItems } from '../lib/grouping'
import type { AnalyzeResponse, AppError, LanguageCode } from '../types'
import { CategorySection } from './CategorySection'
import { ErrorNotice } from './ErrorNotice'
import { ExportButtons } from './ExportButtons'
import { ReceiptTotals } from './ReceiptTotals'

interface ReceiptResultsProps {
  response: AnalyzeResponse
  language: LanguageCode
  locale: string
  t: UIStrings
  isRefreshing: boolean
  error: AppError | null
  onRetry: () => void
  onNewReceipt: () => void
}

export function ReceiptResults({
  response,
  language,
  locale,
  t,
  isRefreshing,
  error,
  onRetry,
  onNewReceipt,
}: ReceiptResultsProps) {
  const { receipt, meta } = response
  const groups = groupItems(receipt.items)
  const sourceLanguage = getLanguage(receipt.source_language)
  const outputLanguage = getLanguage(receipt.output_language)
  const itemsLabel = formatItemCount(receipt.items.length, locale, t)

  return (
    <section className="pt-8 sm:pt-12">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {meta.is_mock ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent-soft/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent">
                <FlaskConical className="size-3" aria-hidden="true" />
                {t.mockBadge}
              </span>
            ) : null}
            <span className="text-xs text-muted">{itemsLabel}</span>
          </div>

          <h1 className="mt-3 break-words font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {receipt.merchant.translated}
          </h1>
          {receipt.merchant.original !== receipt.merchant.translated ? (
            <p className="mt-1 text-sm text-muted">{receipt.merchant.original}</p>
          ) : null}

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5" aria-hidden="true" />
              {formatDate(receipt.date, locale)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Languages className="size-3.5" aria-hidden="true" />
              <span>{sourceLanguage.nativeLabel}</span>
              <ArrowRight className="size-3 rtl:rotate-180" aria-hidden="true" />
              <span>{outputLanguage.nativeLabel}</span>
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onNewReceipt}
          className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full border border-line bg-card px-4 py-2.5 text-sm font-medium text-ink shadow-sm transition hover:border-accent/40 hover:bg-accent-soft/40 sm:self-auto"
        >
          <Plus className="size-4" aria-hidden="true" />
          {t.newReceipt}
        </button>
      </div>

      {isRefreshing ? (
        <div
          role="status"
          className="mt-5 flex items-center gap-3 text-xs font-medium text-accent"
        >
          <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-accent-soft">
            <span className="scan-bar absolute inset-y-0 w-1/3 rounded-full bg-accent" />
          </span>
          <span className="shrink-0">{t.analyzing}</span>
        </div>
      ) : null}

      {error ? (
        <ErrorNotice
          className="mt-5"
          title={t.errorTitle}
          message={getErrorMessage(error.code, t)}
          retryLabel={t.tryAgain}
          onRetry={onRetry}
        />
      ) : null}

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(17rem,1fr)]">
        <div>
          <div className="mb-3">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
              {t.resultsTitle}
            </h2>
          </div>

          <div className="space-y-4">
            {groups.map((group, index) => (
              <CategorySection
                key={group.key}
                group={group}
                language={language}
                locale={locale}
                currency={receipt.currency}
                t={t}
                index={index}
              />
            ))}
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <ReceiptTotals receipt={receipt} locale={locale} t={t} />
          <ExportButtons response={response} language={language} t={t} />

          <div className="rounded-2xl border border-dashed border-accent/30 bg-accent-soft/40 p-4">
            <div className="flex gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-card/70 text-accent">
                <FlaskConical className="size-4" aria-hidden="true" />
              </span>
              <p className="text-xs leading-relaxed text-accent">{t.mockNote}</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
