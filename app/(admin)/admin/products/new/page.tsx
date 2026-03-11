export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createProduct } from '@/lib/actions'
import { ArrowLeft } from 'lucide-react'

export default async function NewProductPage() {
  const { data: platforms } = await supabase.from('platforms').select('id, name').order('name')

  return (
    <div className="max-w-xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/products"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <h1 className="text-2xl font-bold">Novo Produto</h1>
      </div>

      <form action={createProduct} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome *</Label>
          <Input id="name" name="name" placeholder="Ex: Fone Bluetooth JBL" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea id="description" name="description" placeholder="Descreva o produto..." rows={3} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Preço (R$)</Label>
          <Input id="price" name="price" type="number" step="0.01" placeholder="199.90" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="imageUrl">URL da Imagem</Label>
          <Input id="imageUrl" name="imageUrl" type="url" placeholder="https://..." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="affiliateLink">Link de Afiliado *</Label>
          <Input id="affiliateLink" name="affiliateLink" type="url" placeholder="https://shopee.com.br/..." required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="platformId">Plataforma</Label>
          {!platforms?.length ? (
            <p className="text-sm text-muted-foreground">
              Nenhuma plataforma cadastrada.{' '}
              <Link href="/admin/platforms" className="underline">Cadastre uma primeiro.</Link>
            </p>
          ) : (
            <Select name="platformId">
              <SelectTrigger>
                <SelectValue placeholder="Selecione a plataforma" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((p) => (
                  <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <Button type="submit" className="w-full">Cadastrar produto</Button>
      </form>
    </div>
  )
}
