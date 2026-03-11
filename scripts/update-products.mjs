import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const updates = [
  {
    affiliate_link: 'https://s.shopee.com.br/9pZV8NObts',
    image_url: 'https://down-br.img.susercontent.com/file/sg-11134201-7rbmf-lpnphojym28ufb@resize_w900_nl.webp',
    price: '1299.01',
  },
  {
    affiliate_link: 'https://s.shopee.com.br/4LEYaLYSDp',
    image_url: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-lp9tj4vdnuqd2e@resize_w900_nl.webp',
    price: '34.99',
  },
  {
    affiliate_link: 'https://s.shopee.com.br/1VuNDAMZV2',
    image_url: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m2kwdl1iss9fb0@resize_w900_nl.webp',
    price: '49.98',
  },
  {
    affiliate_link: 'https://s.shopee.com.br/6Kzcy4cl8F',
    image_url: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m172z40friha1e@resize_w900_nl.webp',
    price: '49.99',
  },
  {
    affiliate_link: 'https://s.shopee.com.br/5L75mGFZ9v',
    image_url: 'https://down-br.img.susercontent.com/file/5455a0d33a60c3ea3cfc23d42a7abef0@resize_w900_nl.webp',
    price: '6.99',
  },
  {
    affiliate_link: 'https://s.shopee.com.br/8V47Y6l6VC',
    image_url: 'https://down-br.img.susercontent.com/file/sg-11134201-7rcc9-ltsds6lm8ww36b@resize_w900_nl.webp',
    price: '32.66',
  },
]

for (const u of updates) {
  const { error } = await supabase
    .from('products')
    .update({ image_url: u.image_url, price: u.price })
    .eq('affiliate_link', u.affiliate_link)

  if (error) console.error('Erro em', u.affiliate_link, ':', error.message)
  else console.log('✓', u.affiliate_link)
}

console.log('\nConcluído!')
