import type { Direction, LanguageCode } from '../types'

export interface LanguageMeta {
  code: LanguageCode
  label: string
  nativeLabel: string
  locale: string
  dir: Direction
}

export const LANGUAGES: readonly LanguageMeta[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', locale: 'en-US', dir: 'ltr' },
  { code: 'fi', label: 'Finnish', nativeLabel: 'Suomi', locale: 'fi-FI', dir: 'ltr' },
  { code: 'fa', label: 'Persian', nativeLabel: 'فارسی', locale: 'fa-IR', dir: 'rtl' },
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية', locale: 'ar', dir: 'rtl' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español', locale: 'es-ES', dir: 'ltr' },
  { code: 'fr', label: 'French', nativeLabel: 'Français', locale: 'fr-FR', dir: 'ltr' },
  { code: 'de', label: 'German', nativeLabel: 'Deutsch', locale: 'de-DE', dir: 'ltr' },
  { code: 'zh', label: 'Chinese (Simplified)', nativeLabel: '中文', locale: 'zh-CN', dir: 'ltr' },
]

export const DEFAULT_LANGUAGE: LanguageCode = 'en'

export function isLanguageCode(value: string | null): value is LanguageCode {
  return LANGUAGES.some((language) => language.code === value)
}

export function getLanguage(code: LanguageCode): LanguageMeta {
  return LANGUAGES.find((language) => language.code === code) ?? LANGUAGES[0]
}
