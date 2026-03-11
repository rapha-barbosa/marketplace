import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

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
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="relative aspect-square bg-muted">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
            Sem imagem
          </div>
        )}
      </div>
      <CardContent className="flex-1 p-4">
        {product.platform && (
          <Badge variant="secondary" className="mb-2">
            {product.platform}
          </Badge>
        )}
        <h3 className="font-semibold leading-tight line-clamp-2">{product.name}</h3>
        {product.description && (
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        )}
        {product.price && (
          <p className="mt-2 text-lg font-bold">
            {Number(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
            Ver oferta
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
