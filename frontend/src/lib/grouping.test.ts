import { describe, expect, it } from 'vitest'

import { makeItems } from '../test/fixtures'
import { groupItems, sumMoney } from './grouping'

describe('groupItems', () => {
  it('groups items in canonical category order', () => {
    const groups = groupItems(makeItems('en'))

    expect(groups.map((group) => group.key)).toEqual([
      'produce',
      'dairy_eggs',
      'snacks_sweets',
      'household',
    ])
    expect(groups.map((group) => group.subtotal)).toEqual([0.45, 1.29, 2.19, 1.1])
  })

  it('places unknown categories in other', () => {
    const items = makeItems('en').slice(0, 1)
    const unknown = { ...items[0], id: 'unknown', category: 'mystery' }
    const groups = groupItems([unknown as (typeof items)[number]])

    expect(groups).toHaveLength(1)
    expect(groups[0].key).toBe('other')
  })
})

describe('sumMoney', () => {
  it('rounds to two decimals', () => {
    expect(sumMoney([0.1, 0.2])).toBe(0.3)
  })
})
