import type { AnalyzeResponse, LanguageCode, ReceiptItem } from '../types'

const ITEM_NAMES: Record<LanguageCode, string[]> = {
  en: ['Milk', 'Banana', 'Dark chocolate', 'Hand soap'],
  fi: ['Maitoa', 'Banaani', 'Tumma suklaa', 'Käsisaipua'],
  fa: ['شیر', 'موز', 'شکلات تلخ', 'صابون دست'],
  ar: ['حليب', 'موز', 'شوكولاتة داكنة', 'صابون يدين'],
  es: ['Leche', 'Plátano', 'Chocolate negro', 'Jabón de manos'],
  fr: ['Lait', 'Banane', 'Chocolat noir', 'Savon pour les mains'],
  de: ['Milch', 'Banane', 'Zartbitterschokolade', 'Handseife'],
  zh: ['牛奶', '香蕉', '黑巧克力', '洗手液'],
}

const ORIGINAL_NAMES = ['Maitoa', 'Banaani', 'Tumma suklaa', 'Käsisaipua']

export function makeItems(language: LanguageCode): ReceiptItem[] {
  const names = ITEM_NAMES[language]
  const prices = [1.29, 0.45, 2.19, 1.1]
  const categories = ['dairy_eggs', 'produce', 'snacks_sweets', 'household'] as const
  const confidences = [0.98, 0.91, 0.62, 0.95]

  return names.map((name, index) => ({
    id: `item-${index + 1}`,
    original_name: ORIGINAL_NAMES[index],
    translated_name: name,
    quantity: 1,
    unit_price: prices[index],
    line_total: prices[index],
    category: categories[index],
    confidence: confidences[index],
  }))
}

export function makeResponse(language: LanguageCode = 'en'): AnalyzeResponse {
  return {
    receipt: {
      id: 'receipt-test',
      merchant: {
        original: 'K-Market Ruoholahti',
        translated: `K-Market (${language})`,
      },
      date: '2026-11-18',
      currency: 'EUR',
      source_language: 'fi',
      output_language: language,
      items: makeItems(language),
      subtotal: 5.03,
      tax: 0.7,
      total: 5.03,
      warnings: [],
    },
    meta: {
      file_name: 'receipt.jpg',
      file_type: 'image/jpeg',
      file_size: 128,
      processing_ms: 12,
      analyzer: 'mock',
      is_mock: true,
    },
  }
}
