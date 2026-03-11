export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import { ProductGrid } from '@/components/shared/ProductGrid'
import { ProductGridSkeleton } from '@/components/shared/ProductCardSkeleton'

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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Produtos em destaque</h1>
        <p className="text-muted-foreground">Encontre as melhores ofertas dos nossos parceiros.</p>
      </div>
      <Suspense fallback={<ProductGridSkeleton count={8} />}>
        <ProductsSection />
      </Suspense>
    </div>
  )
}
