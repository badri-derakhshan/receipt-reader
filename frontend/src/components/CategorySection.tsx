import {
  Apple,
  Beef,
  Cookie,
  Croissant,
  CupSoda,
  Egg,
  Package,
  Pill,
  Shapes,
  Snowflake,
  Sparkles,
  SprayCan,
  UtensilsCrossed,
  Wine,
  AlertTriangle,
  type LucideIcon,
} from 'lucide-react'

import { getCategoryLabel } from '../i18n/categories'
import { formatItemCount, type UIStrings } from '../i18n/ui'
import type { CategoryGroup } from '../lib/grouping'
import { formatCurrency, formatNumber } from '../lib/format'
import type { CategoryKey, LanguageCode } from '../types'

const CATEGORY_ICONS: Record<CategoryKey, LucideIcon> = {
  produce: Apple,
  dairy_eggs: Egg,
  meat_seafood: Beef,
  bakery: Croissant,
  pantry: Package,
  frozen: Snowflake,
  beverages: CupSoda,
  snacks_sweets: Cookie,
  alcohol: Wine,
  household: SprayCan,
  personal_care: Sparkles,
  health: Pill,
  restaurant: UtensilsCrossed,
  other: Shapes,
}

const LOW_CONFIDENCE = 0.75

interface CategorySectionProps {
  group: CategoryGroup
  language: LanguageCode
  locale: string
  currency: string
  t: UIStrings
  index: number
}

export function CategorySection({
  group,
  language,
  locale,
  currency,
  t,
  index,
}: CategorySectionProps) {
  const Icon = CATEGORY_ICONS[group.key]
  const countLabel = formatItemCount(group.items.length, locale, t)

  return (
    <section
      className="rise-in overflow-hidden rounded-[1.75rem] border border-line bg-card shadow-card"
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      <header className="flex flex-wrap items-center gap-3 border-b border-line/70 px-5 py-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
          <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-ink">
            {getCategoryLabel(group.key, language)}
          </h3>
          <p className="mt-0.5 text-xs text-muted">{countLabel}</p>
        </div>
        <div className="text-end">
          <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-muted">
            {t.categorySubtotal}
          </p>
          <p className="font-mono text-sm font-semibold text-ink">
            {formatCurrency(group.subtotal, currency, locale)}
          </p>
        </div>
      </header>

      <div className="divide-y divide-line/50">
        {group.items.map((item) => {
          const lowConfidence = item.confidence < LOW_CONFIDENCE
          return (
            <div
              key={item.id}
              className="flex items-start justify-between gap-4 px-5 py-3.5"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <p className="text-sm font-medium leading-snug text-ink">
                    {item.translated_name}
                  </p>
                  {lowConfidence ? (
                    <span
                      title={t.lowConfidenceHint}
                      className="inline-flex items-center gap-1 rounded-full bg-warn-soft px-2 py-0.5 text-[10px] font-medium text-warn"
                    >
                      <AlertTriangle className="size-3" aria-hidden="true" />
                      {t.lowConfidence}
                    </span>
                  ) : null}
                </div>

                {item.original_name !== item.translated_name ? (
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">
                    <span className="text-muted/70">{t.original}: </span>
                    {item.original_name}
                  </p>
                ) : null}

                <p className="mt-1 font-mono text-[11px] text-muted">
                  {formatNumber(item.quantity, locale)} ×{' '}
                  {formatCurrency(item.unit_price, currency, locale)}
                </p>
              </div>

              <p className="shrink-0 pt-0.5 font-mono text-sm font-semibold text-ink">
                {formatCurrency(item.line_total, currency, locale)}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
