import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import type { Config } from 'drizzle-kit'

expand(config({ path: '.env.local' }))

export default {
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config
