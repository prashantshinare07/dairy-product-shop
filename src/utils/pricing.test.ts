import { describe, expect, it } from 'vitest'
import { products } from '../data/products'
import { calculatePricing } from './pricing'

describe('calculatePricing', () => {
  it('calculates the subtotal for products without offers', () => {
    const result = calculatePricing(
      [
        { productId: 'milk', quantity: 2 },
        { productId: 'soup', quantity: 1 },
      ],
      products,
    )

    expect(result.subtotal).toBe(160)
    expect(result.savings).toBe(0)
    expect(result.total).toBe(160)
  })

  it('applies buy one get one free offer on cheese', () => {
    const result = calculatePricing(
      [{ productId: 'cheese', quantity: 4 }],
      products,
    )

    expect(result.subtotal).toBe(360)
    expect(result.savings).toBe(180)
    expect(result.total).toBe(180)
  })

  it('applies 50 percent discount to bread for each soup', () => {
    const result = calculatePricing(
      [
        { productId: 'soup', quantity: 2 },
        { productId: 'bread', quantity: 2 },
      ],
      products,
    )

    expect(result.subtotal).toBe(340)
    expect(result.savings).toBe(110)
    expect(result.total).toBe(230)
  })

  it('does not discount more bread than the number of soups', () => {
    const result = calculatePricing(
      [
        { productId: 'soup', quantity: 1 },
        { productId: 'bread', quantity: 3 },
      ],
      products,
    )

    expect(result.subtotal).toBe(390)
    expect(result.savings).toBe(55)
    expect(result.total).toBe(335)
  })

  it('applies one third discount to butter', () => {
    const result = calculatePricing(
      [{ productId: 'butter', quantity: 2 }],
      products,
    )

    expect(result.subtotal).toBe(240)
    expect(result.savings).toBe(80)
    expect(result.total).toBe(160)
  })

  it('applies multiple offers together', () => {
    const result = calculatePricing(
      [
        { productId: 'cheese', quantity: 2 },
        { productId: 'soup', quantity: 1 },
        { productId: 'bread', quantity: 1 },
        { productId: 'butter', quantity: 1 },
      ],
      products,
    )

    expect(result.subtotal).toBe(470)
    expect(result.savings).toBe(185)
    expect(result.total).toBe(285)
  })

  it('returns zero for an empty cart', () => {
    const result = calculatePricing([], products)

    expect(result.subtotal).toBe(0)
    expect(result.savings).toBe(0)
    expect(result.total).toBe(0)
  })
})