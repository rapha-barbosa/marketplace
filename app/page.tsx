export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { getProducts } from '@/lib/actions'
import { ProductGrid } from '@/components/shared/ProductGrid'
import { ProductGridSkeleton } from '@/components/shared/ProductCardSkeleton'

const CATEGORIES = [
  'Todos',
  'Eletrônicos',
  'Moda',
  'Casa',
  'Beleza',
  'Esportes',
  'Games',
  'Livros',
]

type SearchParams = {
  q?: string
  category?: string
}

async function ProductsSection({ search, category }: { search?: string; category?: string }) {
  const products = await getProducts({ search, category })
  return <ProductGrid products={products} />
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { q: search, category } = searchParams

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-orange-400 to-yellow-400 px-6 py-16 text-white sm:py-24 mb-12">
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            As melhores ofertas,<br className="hidden sm:block" /> em um só lugar.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/80">
            Produtos selecionados de Shopee, Mercado Livre e muito mais.
          </p>
          <form action="/" method="GET" className="mt-8 flex items-center gap-3 rounded-2xl bg-white p-2 shadow-xl max-w-md mx-auto">
            <Search className="ml-2 h-5 w-5 text-muted-foreground shrink-0" />
            <input
              type="search"
              name="q"
              defaultValue={search ?? ''}
              placeholder="O que você está procurando?"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none py-1"
            />
            <button
              type="submit"
              className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Buscar
            </button>
          </form>
        </div>

        {/* Decoração de fundo */}
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
      </section>

      {/* Pills de categoria */}
      <section className="mb-8 -mx-1">
        <div className="flex flex-wrap gap-2 px-1">
          {CATEGORIES.map((cat) => {
            const isAll = cat === 'Todos'
            const isActive = isAll ? !category : category === cat
            const href = isAll ? (search ? `/?q=${encodeURIComponent(search)}` : '/') : `/?category=${encodeURIComponent(cat)}${search ? `&q=${encodeURIComponent(search)}` : ''}`

            return (
              <Link
                key={cat}
                href={href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-muted text-muted-foreground hover:bg-orange-100 hover:text-orange-700'
                }`}
              >
                {cat}
              </Link>
            )
          })}
        </div>
      </section>

      {/* Produtos */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold sm:text-2xl">
            {search
              ? `Resultados para "${search}"`
              : category
              ? category
              : 'Produtos em destaque'}
          </h2>
        </div>
        <Suspense fallback={<ProductGridSkeleton count={8} />}>
          <ProductsSection search={search} category={category} />
        </Suspense>
      </section>
    </div>
  )
}
