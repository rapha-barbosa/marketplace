'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export async function getProducts({
  search,
  category,
}: {
  search?: string
  category?: string
} = {}) {
  let query = supabase
    .from('products')
    .select('id, name, description, price, image_url, affiliate_link, category, platforms(name)')
    .order('created_at', { ascending: false })

  if (search) {
    query = query.ilike('name', `%${search}%`)
  }

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query

  if (error) throw new Error(error.message)

  return (data ?? []).map((p: any) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    imageUrl: p.image_url,
    affiliateLink: p.affiliate_link,
    category: p.category,
    platform: p.platforms?.name ?? null,
  }))
}

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = formData.get('price') as string
  const imageUrl = formData.get('imageUrl') as string
  const affiliateLink = formData.get('affiliateLink') as string
  const platformId = formData.get('platformId') as string

  const { error } = await supabase.from('products').insert({
    name,
    description: description || null,
    price: price || null,
    image_url: imageUrl || null,
    affiliate_link: affiliateLink,
    platform_id: platformId ? parseInt(platformId) : null,
  })

  if (error) throw new Error(error.message)

  revalidatePath('/admin/products')
  revalidatePath('/')
  redirect('/admin/products')
}

export async function deleteProduct(id: number) {
  await supabase.from('products').delete().eq('id', id)
  revalidatePath('/admin/products')
  revalidatePath('/')
}

export async function createPlatform(formData: FormData) {
  const name = formData.get('name') as string
  await supabase.from('platforms').insert({ name })
  revalidatePath('/admin/platforms')
}

export async function deletePlatform(id: number) {
  await supabase.from('platforms').delete().eq('id', id)
  revalidatePath('/admin/platforms')
}
