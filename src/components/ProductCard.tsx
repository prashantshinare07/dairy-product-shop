import type { Product } from '../types/product'
import { useAppDispatch } from '../store/hooks'
import { addToCart } from '../features/cart/cartSlice'

interface ProductCardProps {
  product: Product
}

const getOffer = (productId: Product['id']) => {
  switch (productId) {
    case 'cheese':
      return 'Buy 1 Get 1 Free'

    case 'soup':
      return 'Bread 50% Off'

    case 'butter':
      return '1/3 Off'

    default:
      return null
  }
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch()
  const offer = getOffer(product.id)

  return (
    <div className="group flex min-h-24 items-center gap-4 border-b border-slate-100 py-5 last:border-b-0">
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
          {product.name}
        </h3>

        {offer && (
          <span className="mt-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
            {offer}
          </span>
        )}
      </div>

      <div className="text-right">
        <p className="text-base font-semibold text-slate-700 sm:text-lg">
          £{(product.price / 100).toFixed(2)}
        </p>
      </div>

      <button
        type="button"
        onClick={() => dispatch(addToCart(product.id))}
        className="rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600 active:scale-95"
      >
        Add
      </button>
    </div>
  )
}

export default ProductCard