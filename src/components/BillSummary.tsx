import type { Product } from '../types/product'
import { selectCartItems } from '../features/cart/cartSelectors'
import { useAppSelector } from '../store/hooks'
import { calculatePricing } from '../utils/pricing'

interface BillSummaryProps {
  products: Product[]
}

const formatPrice = (priceInPence: number) => {
  return `£${(priceInPence / 100).toFixed(2)}`
}

const BillSummary = ({ products }: BillSummaryProps) => {
  const cartItems = useAppSelector(selectCartItems)

  const { subtotal, savings, total } = calculatePricing(
    cartItems,
    products,
  )

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xl">
          🧾
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Bill Summary
          </h2>

          <p className="text-xs text-slate-500">
            Your final order amount
          </p>
        </div>
      </div>

      <div className="px-6 py-5">
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">
              Subtotal
            </span>

            <span className="font-semibold text-slate-700">
              {formatPrice(subtotal)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="font-semibold text-emerald-600">
              Savings
            </span>

            <span className="font-semibold text-emerald-600">
              -{formatPrice(savings)}
            </span>
          </div>
        </div>

        <div className="my-5 border-t border-slate-200" />

        <div className="flex items-end justify-between">
          <span className="text-xl font-bold text-slate-900">
            Total
          </span>

          <span className="text-3xl font-bold text-slate-900">
            {formatPrice(total)}
          </span>
        </div>

        <button
          type="button"
          className="mt-6 w-full rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-600 active:scale-[0.99]"
        >
          Proceed to Checkout →
        </button>
      </div>
    </section>
  )
}

export default BillSummary