import { ProductCard } from './ProductCard'
import { ShoppingBag } from 'lucide-react'

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
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-border bg-muted/30 text-center px-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
        </div>
        <div>
          <p className="font-semibold text-foreground">Nenhum produto ainda</p>
          <p className="text-sm text-muted-foreground mt-1">
            Acesse o painel admin para cadastrar os primeiros produtos.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
