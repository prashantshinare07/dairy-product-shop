import type { Product } from '../types/product'
import { selectCartItems } from '../features/cart/cartSelectors'
import { useAppSelector } from '../store/hooks'
import { calculateItemSavings } from '../utils/pricing'
import BasketItem from './BasketItem'

interface BasketProps {
  products: Product[]
}

const Basket = ({ products }: BasketProps) => {
  const cartItems = useAppSelector(selectCartItems)

  const getProduct = (productId: Product['id']) => {
    return products.find(product => product.id === productId)
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Basket Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xl">
            🛒
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Basket
            </h2>

            <p className="text-xs text-slate-500">
              Your selected products
            </p>
          </div>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
          {cartItems.reduce(
            (total, item) => total + item.quantity,
            0,
          )}{' '}
          items
        </span>
      </div>

      {/* Empty Basket */}
      {cartItems.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <div className="text-4xl">🛒</div>

          <p className="mt-3 font-medium text-slate-700">
            Your basket is empty
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Add products to get started.
          </p>
        </div>
      ) : (
        <div className="px-6">
          {cartItems.map(item => {
            const product = getProduct(item.productId)

            if (!product) {
              return null
            }

            const savings = calculateItemSavings(
              item.productId,
              item.quantity,
              cartItems,
              products,
            )

            return (
              <BasketItem
                key={item.productId}
                product={product}
                quantity={item.quantity}
                savings={savings}
              />
            )
          })}
        </div>
      )}
    </section>
  )
}

export default Basket