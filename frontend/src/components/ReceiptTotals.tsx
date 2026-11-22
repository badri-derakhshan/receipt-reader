import { ReceiptText } from 'lucide-react'

import { formatItemCount, type UIStrings } from '../i18n/ui'
import { formatCurrency } from '../lib/format'
import type { Receipt } from '../types'

interface ReceiptTotalsProps {
  receipt: Receipt
  locale: string
  t: UIStrings
}

export function ReceiptTotals({ receipt, locale, t }: ReceiptTotalsProps) {
  const countLabel = formatItemCount(receipt.items.length, locale, t)

  return (
    <div className="rounded-[1.75rem] border border-line bg-card p-5 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
          <ReceiptText className="size-3.5" aria-hidden="true" />
          {t.receiptDetails}
        </div>
        <span className="rounded-full bg-paper px-2.5 py-1 text-[10px] font-medium text-muted">
          {countLabel}
        </span>
      </div>

      <dl className="mt-5 space-y-3">
        <div className="flex items-center justify-between gap-4 text-sm">
          <dt className="text-muted">{t.subtotal}</dt>
          <dd className="font-mono text-ink">
            {formatCurrency(receipt.subtotal, receipt.currency, locale)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm">
          <dt className="text-muted">{t.vat}</dt>
          <dd className="font-mono text-muted">
            {formatCurrency(receipt.tax, receipt.currency, locale)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-dashed border-line pt-3">
          <dt className="font-semibold text-ink">{t.total}</dt>
          <dd className="font-mono text-xl font-semibold tracking-tight text-accent-strong">
            {formatCurrency(receipt.total, receipt.currency, locale)}
          </dd>
        </div>
      </dl>
    </div>
  )
}
