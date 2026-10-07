import type { Product } from '../types/product'
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../features/cart/cartSlice'
import { useAppDispatch } from '../store/hooks'

interface BasketItemProps {
  product: Product
  quantity: number
  savings: number
}

const BasketItem = ({
  product,
  quantity,
  savings,
}: BasketItemProps) => {
  const dispatch = useAppDispatch()

  const itemPrice = product.price * quantity
  const itemCost = itemPrice - savings

  return (
    <div className="border-b border-slate-200 py-5 last:border-b-0">

      {/* Top row */}
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">
            {product.name}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            £{(product.price / 100).toFixed(2)} each
          </p>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => dispatch(decreaseQuantity(product.id))}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-400 bg-white text-lg font-medium text-blue-600 transition hover:bg-blue-50"
            aria-label={`Decrease ${product.name} quantity`}
          >
            −
          </button>

          <span className="flex h-9 w-8 items-center justify-center text-sm font-semibold text-slate-700">
            {quantity}
          </span>

          <button
            type="button"
            onClick={() => dispatch(increaseQuantity(product.id))}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-lg font-medium text-white transition hover:bg-blue-600"
            aria-label={`Increase ${product.name} quantity`}
          >
            +
          </button>
        </div>
      </div>

      {/* Item price */}
      <div className="mt-4 flex justify-between text-sm">
        <span className="text-slate-500">
          Item price
        </span>

        <span className="text-slate-600">
          £{(product.price / 100).toFixed(2)} × {quantity} = £
          {(itemPrice / 100).toFixed(2)}
        </span>
      </div>

      {/* Savings */}
      {savings > 0 && (
        <div className="mt-2 flex justify-between text-sm">
          <span className="font-medium text-emerald-600">
            Savings
          </span>

          <span className="font-semibold text-emerald-600">
            £{(savings / 100).toFixed(2)}
          </span>
        </div>
      )}

      {/* Item cost */}
      <div className="mt-2 flex justify-between text-sm">
        <span className="font-semibold text-slate-700">
          Item cost
        </span>

        <span className="font-bold text-slate-900">
          £{(itemCost / 100).toFixed(2)}
        </span>
      </div>

      {/* Remove */}
      <div className="mt-3 text-right">
        <button
          type="button"
          onClick={() => dispatch(removeFromCart(product.id))}
          className="text-xs font-semibold text-red-500 transition hover:text-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default BasketItem