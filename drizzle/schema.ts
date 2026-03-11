import { pgTable, serial, text, numeric, integer, uuid, timestamp } from 'drizzle-orm/pg-core'

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey(),
  fullName: text('full_name'),
  role: text('role').default('user').notNull(),
})

export const platforms = pgTable('platforms', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
})

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: numeric('price', { precision: 10, scale: 2 }),
  imageUrl: text('image_url'),
  affiliateLink: text('affiliate_link').notNull(),
  platformId: integer('platform_id').references(() => platforms.id),
  category: text('category'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const clicks = pgTable('clicks', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').references(() => products.id),
  userId: uuid('user_id'),
  createdAt: timestamp('created_at').defaultNow(),
})
