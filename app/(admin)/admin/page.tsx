export const dynamic = 'force-dynamic'

import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, MousePointerClick } from 'lucide-react'

export default async function AdminPage() {
  const [{ count: productCount }, { count: clickCount }] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('clicks').select('*', { count: 'exact', head: true }),
  ])

  const stats = [
    { title: 'Total de Produtos', value: productCount ?? 0, icon: Package },
    { title: 'Total de Cliques', value: clickCount ?? 0, icon: MousePointerClick },
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
