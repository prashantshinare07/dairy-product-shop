import { useEffect, useState } from 'react'
import Basket from './components/Basket'
import BillSummary from './components/BillSummary'
import ProductList from './components/ProductList'
import { getProducts } from './services/productService'
import type { Product } from './types/product'

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch {
        setError('Unable to load products.')
      } finally {
        setLoading(false)
      }
    }

    void loadProducts()
  }, [])

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">Loading products...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-red-600">{error}</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

        {/* Header */}
        <header className="mb-5 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Dairy Product Shop
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Fresh Dairy • Better Life
            </p>
          </div>

          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
            🛒
          </div>
        </header>

        {/* Hero */}
        <section className="mb-5 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-sky-100 px-6 py-8 shadow-sm sm:px-8">
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Fresh every day
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Fresh & Healthy Dairy Products
            </h2>

            <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
              Choose your favourite products and enjoy our special offers.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                ✓ Fresh Quality
              </span>

              <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                ✓ Best Prices
              </span>

              <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                ✓ Special Offers
              </span>
            </div>
          </div>
        </section>

        {/* Main Layout */}
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_420px]">

          {/* Products */}
          <section className="min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <ProductList products={products} />
          </section>

          {/* Right Side */}
          <aside className="space-y-5">
          <Basket products={products} />
          <BillSummary products={products} />
          </aside>
        </div>
      </div>
    </main>
  )
}

export default App