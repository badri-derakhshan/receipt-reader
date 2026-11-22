export type LanguageCode = 'en' | 'fi' | 'fa' | 'ar' | 'es' | 'fr' | 'de' | 'zh'

export type Direction = 'ltr' | 'rtl'

export const CATEGORY_KEYS = [
  'produce',
  'dairy_eggs',
  'meat_seafood',
  'bakery',
  'pantry',
  'frozen',
  'beverages',
  'snacks_sweets',
  'alcohol',
  'household',
  'personal_care',
  'health',
  'restaurant',
  'other',
] as const

export type CategoryKey = (typeof CATEGORY_KEYS)[number]

export interface Merchant {
  original: string
  translated: string
}

export interface ReceiptItem {
  id: string
  original_name: string
  translated_name: string
  quantity: number
  unit_price: number
  line_total: number
  category: CategoryKey
  confidence: number
}

export interface Receipt {
  id: string
  merchant: Merchant
  date: string
  currency: string
  source_language: LanguageCode
  output_language: LanguageCode
  items: ReceiptItem[]
  subtotal: number
  tax: number
  total: number
  warnings: string[]
}

export interface AnalyzeMeta {
  file_name: string
  file_type: string
  file_size: number
  processing_ms: number
  analyzer: string
  is_mock: boolean
}

export interface AnalyzeResponse {
  receipt: Receipt
  meta: AnalyzeMeta
}

export type FileErrorCode = 'unsupportedFile' | 'tooLarge' | 'invalidFile'

export interface AppError {
  code: string
}
