import { describe, expect, it } from 'vitest'

import { makeResponse } from '../test/fixtures'
import { buildCsv, buildJson } from './export'

describe('buildCsv', () => {
  it('builds a localized CSV with a UTF-8 BOM', () => {
    const response = makeResponse('fi')
    const csv = buildCsv(response.receipt, 'fi')

    expect(csv.startsWith('\uFEFF')).toBe(true)
    expect(csv).toContain('"Kategoria","Nimike","Alkuperäinen"')
    expect(csv).toContain('"Maitotuotteet ja kananmunat","Maitoa","Maitoa"')
    expect(csv).toContain('"","Välisumma","","","","5.03","EUR"')
    expect(csv).toContain('"","ALV (sisältyy)","","","","0.70","EUR"')
    expect(csv).toContain('"","Yhteensä","","","","5.03","EUR"')
    expect(csv).toContain('"EUR"')
  })

  it('escapes quotes in item names', () => {
    const receipt = makeResponse('en').receipt
    receipt.items[0].translated_name = 'Milk "lactose free"'
    const csv = buildCsv(receipt, 'en')

    expect(csv).toContain('"Milk ""lactose free"""')
  })
})

describe('buildJson', () => {
  it('includes app metadata and the full analysis', () => {
    const response = makeResponse('fa')
    const parsed = JSON.parse(buildJson(response)) as Record<string, unknown>

    expect(parsed.app).toBe('Receipt Reader')
    expect(typeof parsed.exported_at).toBe('string')
    expect(parsed.receipt).toMatchObject({
      output_language: 'fa',
      total: 5.03,
    })
    expect(parsed.meta).toMatchObject({ analyzer: 'mock', is_mock: true })
  })
})
