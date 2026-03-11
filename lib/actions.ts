'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { products, platforms } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = formData.get('price') as string
  const imageUrl = formData.get('imageUrl') as string
  const affiliateLink = formData.get('affiliateLink') as string
  const platformId = formData.get('platformId') as string

  await db.insert(products).values({
    name,
    description: description || null,
    price: price || null,
    imageUrl: imageUrl || null,
    affiliateLink,
    platformId: platformId ? parseInt(platformId) : null,
  })

  revalidatePath('/admin/products')
  revalidatePath('/')
  redirect('/admin/products')
}

export async function deleteProduct(id: number) {
  await db.delete(products).where(eq(products.id, id))
  revalidatePath('/admin/products')
  revalidatePath('/')
}

export async function createPlatform(formData: FormData) {
  const name = formData.get('name') as string
  await db.insert(platforms).values({ name })
  revalidatePath('/admin/platforms')
}

export async function deletePlatform(id: number) {
  await db.delete(platforms).where(eq(platforms.id, id))
  revalidatePath('/admin/platforms')
}
