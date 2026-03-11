import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// 1. Garante que a plataforma Shopee existe
const { data: existing } = await supabase.from('platforms').select('id').eq('name', 'Shopee').single()

let platformId = existing?.id
if (!platformId) {
  const { data } = await supabase.from('platforms').insert({ name: 'Shopee' }).select('id').single()
  platformId = data.id
}

console.log('Platform ID:', platformId)

// 2. Produtos
const products = [
  {
    name: 'Suporte para Celular / Produto Shopee',
    description: null,
    price: null,
    image_url: null,
    affiliate_link: 'https://s.shopee.com.br/9pZV8NObts',
    platform_id: platformId,
  },
  {
    name: 'Mouse Pad Gamer — Vários Modelos',
    description: 'Mouse pad gamer com diversos modelos e designs populares.',
    price: null,
    image_url: null,
    affiliate_link: 'https://s.shopee.com.br/4LEYaLYSDp',
    platform_id: platformId,
  },
  {
    name: 'Mini Impressora Térmica Sem Fio Portátil',
    description: 'Impressora térmica portátil para fotos e desenhos animados. Compatível com Android e iOS.',
    price: null,
    image_url: null,
    affiliate_link: 'https://s.shopee.com.br/1VuNDAMZV2',
    platform_id: platformId,
  },
  {
    name: 'Mesa para Notebook Dobrável e Portátil',
    description: 'Mesa suporte dobrável e portátil para notebook, ideal para home office.',
    price: null,
    image_url: null,
    affiliate_link: 'https://s.shopee.com.br/6Kzcy4cl8F',
    platform_id: platformId,
  },
  {
    name: 'Protetor de Câmera — Tampa de Webcam Anti-espião',
    description: 'Tampa protetora para câmera de notebook e celular. Kit com 1 a 5 unidades.',
    price: null,
    image_url: null,
    affiliate_link: 'https://s.shopee.com.br/5L75mGFZ9v',
    platform_id: platformId,
  },
  {
    name: 'Kit Teclado e Mouse Bluetooth 5.2',
    description: 'Kit teclado e mouse sem fio Bluetooth 5.2. Compatível com PC, iPhone e Android.',
    price: null,
    image_url: null,
    affiliate_link: 'https://s.shopee.com.br/8V47Y6l6VC',
    platform_id: platformId,
  },
]

const { data, error } = await supabase.from('products').insert(products).select()

if (error) {
  console.error('Erro:', error.message)
} else {
  console.log(`✓ ${data.length} produtos inseridos com sucesso!`)
  data.forEach(p => console.log(' -', p.name))
}
