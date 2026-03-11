export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import { db } from '@/lib/db'
import { products, platforms } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import { ProductGrid } from '@/components/shared/ProductGrid'
import { ProductGridSkeleton } from '@/components/shared/ProductCardSkeleton'

async function ProductsSection() {
  const rows = await db
    .select({
      id: products.id,
      name: products.name,
      description: products.description,
      price: products.price,
      imageUrl: products.imageUrl,
      affiliateLink: products.affiliateLink,
      platform: platforms.name,
    })
    .from(products)
    .leftJoin(platforms, eq(products.platformId, platforms.id))
    .orderBy(products.createdAt)

  return <ProductGrid products={rows} />
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
