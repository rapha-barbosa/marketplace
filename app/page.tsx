export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import { ProductGrid } from '@/components/shared/ProductGrid'
import { ProductGridSkeleton } from '@/components/shared/ProductCardSkeleton'
import { Search } from 'lucide-react'

async function ProductsSection() {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, description, price, image_url, affiliate_link, platforms(name)')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  const products = (data ?? []).map((p: any) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    imageUrl: p.image_url,
    affiliateLink: p.affiliate_link,
    platform: p.platforms?.name ?? null,
  }))

  return <ProductGrid products={products} />
}

export default function HomePage() {
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
          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-white p-2 shadow-xl max-w-md mx-auto">
            <Search className="ml-2 h-5 w-5 text-muted-foreground shrink-0" />
            <input
              type="search"
              placeholder="O que você está procurando?"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none py-1"
            />
            <button className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
              Buscar
            </button>
          </div>
        </div>

        {/* Decoração de fundo */}
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
      </section>

      {/* Produtos */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold sm:text-2xl">Produtos em destaque</h2>
        </div>
        <Suspense fallback={<ProductGridSkeleton count={8} />}>
          <ProductsSection />
        </Suspense>
      </section>
    </div>
  )
}
