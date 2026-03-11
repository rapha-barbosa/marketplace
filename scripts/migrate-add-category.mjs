import postgres from 'postgres'
import { config } from 'dotenv'

config({ path: '.env.local' })

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  console.error('❌ DATABASE_URL não encontrado no .env.local')
  process.exit(1)
}

const sql = postgres(databaseUrl, { ssl: 'require' })

console.log('🔄 Adicionando coluna category à tabela products...')
await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS category text`
console.log('✅ Coluna category adicionada (ou já existia)!')

console.log('🔄 Atualizando categoria dos produtos sem categoria...')
const updated = await sql`
  UPDATE products
  SET category = 'Eletrônicos'
  WHERE category IS NULL
  RETURNING id, name
`
console.log(`✅ ${updated.length} produto(s) atualizados para "Eletrônicos":`)
updated.forEach(p => console.log('   -', p.name))

await sql.end()
