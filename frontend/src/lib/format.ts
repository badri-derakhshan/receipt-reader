export function formatNumber(
  value: number,
  locale: string,
  maximumFractionDigits = 2,
): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits }).format(value)
}

export function formatCurrency(value: number, currency: string, locale: string): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      currencyDisplay: 'narrowSymbol',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  } catch {
    return `${currency} ${value.toFixed(2)}`
  }
}

export function formatDate(value: string, locale: string): string {
  const date = new Date(`${value}T12:00:00Z`)
  if (Number.isNaN(date.getTime())) {
    return value
  }
  try {
    return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(date)
  } catch {
    return value
  }
}

export function formatBytes(bytes: number, locale: string): string {
  if (bytes < 1024 * 1024) {
    return `${formatNumber(bytes / 1024, locale, 0)} KB`
  }
  return `${formatNumber(bytes / (1024 * 1024), locale, 1)} MB`
}
