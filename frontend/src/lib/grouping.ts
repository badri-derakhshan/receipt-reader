import { CATEGORY_KEYS, type CategoryKey, type ReceiptItem } from '../types'

export interface CategoryGroup {
  key: CategoryKey
  items: ReceiptItem[]
  subtotal: number
}

export function sumMoney(values: number[]): number {
  return Math.round(values.reduce((sum, value) => sum + value, 0) * 100) / 100
}

export function groupItems(items: ReceiptItem[]): CategoryGroup[] {
  const buckets = new Map<CategoryKey, ReceiptItem[]>()

  for (const item of items) {
    const key: CategoryKey = (CATEGORY_KEYS as readonly string[]).includes(item.category)
      ? item.category
      : 'other'
    const bucket = buckets.get(key)
    if (bucket) {
      bucket.push(item)
    } else {
      buckets.set(key, [item])
    }
  }

  return CATEGORY_KEYS.flatMap((key) => {
    const bucket = buckets.get(key)
    if (!bucket || bucket.length === 0) {
      return []
    }
    return [
      {
        key,
        items: bucket,
        subtotal: sumMoney(bucket.map((item) => item.line_total)),
      },
    ]
  })
}
