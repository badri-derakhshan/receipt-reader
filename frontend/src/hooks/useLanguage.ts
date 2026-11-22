import { useEffect, useState } from 'react'

import {
  DEFAULT_LANGUAGE,
  getLanguage,
  isLanguageCode,
} from '../i18n/languages'
import type { LanguageCode } from '../types'

const STORAGE_KEY = 'receipt-reader.language'

function readStoredLanguage(): LanguageCode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return isLanguageCode(stored) ? stored : DEFAULT_LANGUAGE
  } catch {
    return DEFAULT_LANGUAGE
  }
}

export function useLanguage() {
  const [language, setLanguage] = useState<LanguageCode>(readStoredLanguage)
  const meta = getLanguage(language)

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = meta.dir
    try {
      localStorage.setItem(STORAGE_KEY, language)
    } catch {
      // Storage can be unavailable in private mode; language still works in memory.
    }
  }, [language, meta.dir])

  return { language, setLanguage, meta }
}
