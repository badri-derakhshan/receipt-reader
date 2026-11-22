import { getCategoryLabel } from '../i18n/categories'
import { getUi } from '../i18n/ui'
import type { AnalyzeResponse, LanguageCode, Receipt } from '../types'

const EXPORT_HEADERS: Record<LanguageCode, string[]> = {
  en: ['Category', 'Item', 'Original', 'Qty', 'Unit price', 'Line total', 'Currency'],
  fi: ['Kategoria', 'Nimike', 'Alkuperäinen', 'Määrä', 'Yksikköhinta', 'Rivisumma', 'Valuutta'],
  fa: ['دسته', 'قلم', 'متن اصلی', 'تعداد', 'قیمت واحد', 'جمع ردیف', 'واحد پول'],
  ar: ['الفئة', 'العنصر', 'النص الأصلي', 'الكمية', 'سعر الوحدة', 'إجمالي السطر', 'العملة'],
  es: ['Categoría', 'Artículo', 'Original', 'Cantidad', 'Precio ud.', 'Total línea', 'Moneda'],
  fr: ['Catégorie', 'Article', 'Original', 'Qté', 'Prix unit.', 'Total ligne', 'Devise'],
  de: ['Kategorie', 'Artikel', 'Original', 'Menge', 'Einzelpreis', 'Zeilensumme', 'Währung'],
  zh: ['分类', '商品', '原文', '数量', '单价', '小计', '货币'],
}

function csvCell(value: string | number): string {
  return `"${String(value).replaceAll('"', '""')}"`
}

function price(value: number): string {
  return value.toFixed(2)
}

export function buildCsv(receipt: Receipt, language: LanguageCode): string {
  const headers = EXPORT_HEADERS[language]
  const t = getUi(language)
  const rows = receipt.items.map((item) =>
    [
      getCategoryLabel(item.category, language),
      item.translated_name,
      item.original_name,
      item.quantity,
      price(item.unit_price),
      price(item.line_total),
      receipt.currency,
    ]
      .map(csvCell)
      .join(','),
  )

  const totals = [
    ['', t.subtotal, '', '', '', price(receipt.subtotal), receipt.currency],
    ['', t.vat, '', '', '', price(receipt.tax), receipt.currency],
    ['', t.total, '', '', '', price(receipt.total), receipt.currency],
  ].map((row) => row.map(csvCell).join(','))

  return `\uFEFF${[headers.map(csvCell).join(','), ...rows, ...totals].join('\r\n')}\r\n`
}

export function buildJson(response: AnalyzeResponse): string {
  return JSON.stringify(
    {
      app: 'Receipt Reader',
      exported_at: new Date().toISOString(),
      ...response,
    },
    null,
    2,
  )
}

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'receipt'
  )
}

function filename(receipt: Receipt, extension: string): string {
  return `${slugify(receipt.merchant.original)}-${receipt.date}.${extension}`
}

function triggerDownload(content: string, name: string, type: string): void {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = name
  anchor.rel = 'noopener'
  document.body.append(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

export function downloadCsv(receipt: Receipt, language: LanguageCode): void {
  triggerDownload(
    buildCsv(receipt, language),
    filename(receipt, 'csv'),
    'text/csv;charset=utf-8;',
  )
}

export function downloadJson(response: AnalyzeResponse): void {
  triggerDownload(buildJson(response), filename(response.receipt, 'json'), 'application/json')
}
