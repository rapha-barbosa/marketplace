export const dynamic = 'force-dynamic'

import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { createPlatform, deletePlatform } from '@/lib/actions'
import { Trash2 } from 'lucide-react'

export default async function AdminPlatformsPage() {
  const { data: platforms } = await supabase.from('platforms').select('id, name').order('name')

  return (
    <div className="max-w-xl space-y-8">
      <h1 className="text-2xl font-bold">Plataformas</h1>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Cadastradas</h2>
        {!platforms?.length ? (
          <p className="text-sm text-muted-foreground">Nenhuma plataforma ainda.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {platforms.map((p) => (
              <div key={p.id} className="flex items-center gap-1">
                <Badge variant="secondary" className="text-sm">{p.name}</Badge>
                <form action={deletePlatform.bind(null, p.id)}>
                  <button type="submit" className="text-destructive hover:opacity-70">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>

      <form action={createPlatform} className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Nova plataforma</h2>
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" name="name" placeholder="Ex: Shopee" required />
        </div>
        <Button type="submit">Adicionar</Button>
      </form>
    </div>
  )
}
