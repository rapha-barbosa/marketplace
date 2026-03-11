import { ProductCard } from './ProductCard'

type Product = {
  id: number
  name: string
  description: string | null
  price: string | null
  imageUrl: string | null
  affiliateLink: string
  platform: string | null
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-muted-foreground">
        Nenhum produto encontrado.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
