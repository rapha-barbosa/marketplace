import Link from 'next/link'
import { db } from '@/lib/db'
import { products, platforms } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { deleteProduct } from '@/lib/actions'
import { Plus, Trash2, ExternalLink } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  const rows = await db
    .select({
      id: products.id,
      name: products.name,
      price: products.price,
      affiliateLink: products.affiliateLink,
      platform: platforms.name,
    })
    .from(products)
    .leftJoin(platforms, eq(products.platformId, platforms.id))
    .orderBy(products.createdAt)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Novo produto
          </Link>
        </Button>
      </div>

      {rows.length === 0 ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed text-muted-foreground">
          Nenhum produto cadastrado ainda.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Plataforma</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Link</TableHead>
              <TableHead className="w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>
                  {p.platform ? <Badge variant="secondary">{p.platform}</Badge> : '—'}
                </TableCell>
                <TableCell>
                  {p.price
                    ? Number(p.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                    : '—'}
                </TableCell>
                <TableCell>
                  <a
                    href={p.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                  >
                    Ver <ExternalLink className="h-3 w-3" />
                  </a>
                </TableCell>
                <TableCell>
                  <form action={deleteProduct.bind(null, p.id)}>
                    <button type="submit" className="text-destructive hover:opacity-70">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
