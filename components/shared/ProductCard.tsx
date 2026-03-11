import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

type Product = {
  id: number
  name: string
  description: string | null
  price: string | null
  imageUrl: string | null
  affiliateLink: string
  platform: string | null
}

export function ProductCard({ product }: { product: Product }) {
  const formattedPrice = product.price
    ? Number(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : null

  return (
    <a
      href={product.affiliateLink}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-border/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Imagem */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-4xl">🛍️</span>
          </div>
        )}
        {product.platform && (
          <div className="absolute top-2 left-2">
            <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
              {product.platform}
            </span>
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-sm font-semibold leading-snug line-clamp-2 text-foreground">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-2">
          {formattedPrice ? (
            <span className="text-lg font-bold text-primary">{formattedPrice}</span>
          ) : (
            <span className="text-sm text-muted-foreground">Ver preço</span>
          )}
          <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
            Ver oferta <ExternalLink className="h-3 w-3" />
          </span>
        </div>
      </div>
    </a>
  )
}
