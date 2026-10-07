import type { Product } from '../types/product'
import ProductCard from './ProductCard'

interface ProductListProps {
  products: Product[]
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <section>
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Products
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Select products to add to your basket
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
          {products.length} items
        </span>
      </div>

      <div className="px-6">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  )
}

export default ProductList