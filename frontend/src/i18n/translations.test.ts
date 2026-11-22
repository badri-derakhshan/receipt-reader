import { describe, expect, it } from 'vitest'

import { CATEGORY_LABELS } from './categories'
import { LANGUAGES } from './languages'
import { formatItemCount, UI_STRINGS } from './ui'
import { CATEGORY_KEYS } from '../types'

describe('translations', () => {
  it('has a complete UI translation for every language', () => {
    const referenceKeys = Object.keys(UI_STRINGS.en).sort()

    for (const language of LANGUAGES) {
      const strings = UI_STRINGS[language.code]
      expect(Object.keys(strings).sort()).toEqual(referenceKeys)
      for (const value of Object.values(strings)) {
        expect(value.trim().length).toBeGreaterThan(0)
      }
    }
  })

  it('has a label for every category in every language', () => {
    for (const language of LANGUAGES) {
      for (const category of CATEGORY_KEYS) {
        expect(CATEGORY_LABELS[category][language.code].trim().length).toBeGreaterThan(0)
      }
    }
  })

  it('uses a singular item label for exactly one item', () => {
    expect(formatItemCount(1, 'en-US', UI_STRINGS.en)).toBe('1 item')
    expect(formatItemCount(2, 'en-US', UI_STRINGS.en)).toBe('2 items')
  })

  it('marks Persian and Arabic as right-to-left', () => {
    const rtl = LANGUAGES.filter((language) => language.dir === 'rtl').map(
      (language) => language.code,
    )
    expect(rtl).toEqual(['fa', 'ar'])
  })
})
