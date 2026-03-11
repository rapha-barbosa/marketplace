'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'

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
