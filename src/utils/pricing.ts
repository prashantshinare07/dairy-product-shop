import type { CartItem, Product } from '../types/product'

export interface PricingResult {
  subtotal: number
  savings: number
  total: number
}

const BREAD_DISCOUNT_RATE = 0.5
const BUTTER_DISCOUNT_RATE = 1 / 3

export const calculatePricing = (
  cartItems: CartItem[],
  products: Product[],
): PricingResult => {
  const productMap = new Map(
    products.map(product => [product.id, product]),
  )

  let subtotal = 0
  let savings = 0

  const quantities = new Map(
    cartItems.map(item => [item.productId, item.quantity]),
  )

  cartItems.forEach(item => {
    const product = productMap.get(item.productId)

    if (!product) {
      return
    }

    subtotal += product.price * item.quantity

    if (product.id === 'cheese') {
      const freeItems = Math.floor(item.quantity / 2)
      savings += freeItems * product.price
    }

    if (product.id === 'butter') {
      savings +=
        product.price *
        item.quantity *
        BUTTER_DISCOUNT_RATE
    }

    if (product.id === 'bread') {
      const soupQuantity = quantities.get('soup') ?? 0

      const discountedBreadQuantity = Math.min(
        item.quantity,
        soupQuantity,
      )

      savings +=
        discountedBreadQuantity *
        product.price *
        BREAD_DISCOUNT_RATE
    }
  })

  return {
    subtotal,
    savings,
    total: subtotal - savings,
  }
}

export const calculateItemSavings = (
  productId: Product['id'],
  quantity: number,
  cartItems: CartItem[],
  products: Product[],
): number => {
  const product = products.find(item => item.id === productId)

  if (!product) {
    return 0
  }

  if (productId === 'cheese') {
    const freeItems = Math.floor(quantity / 2)

    return freeItems * product.price
  }

  if (productId === 'butter') {
    return product.price * quantity * BUTTER_DISCOUNT_RATE
  }

  if (productId === 'bread') {
    const soup = cartItems.find(item => item.productId === 'soup')
    const soupQuantity = soup?.quantity ?? 0

    const discountedBreadQuantity = Math.min(
      quantity,
      soupQuantity,
    )

    return (
      discountedBreadQuantity *
      product.price *
      BREAD_DISCOUNT_RATE
    )
  }

  return 0
}