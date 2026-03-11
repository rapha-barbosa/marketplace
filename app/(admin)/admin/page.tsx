import { db } from '@/lib/db'
import { products, clicks } from '@/drizzle/schema'
import { sql } from 'drizzle-orm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, MousePointerClick } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const [productCount, clickCount] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(products),
    db.select({ count: sql<number>`count(*)` }).from(clicks),
  ])

  const stats = [
    {
      title: 'Total de Produtos',
      value: productCount[0].count,
      icon: Package,
    },
    {
      title: 'Total de Cliques',
      value: clickCount[0].count,
      icon: MousePointerClick,
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
