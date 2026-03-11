import Link from 'next/link'
import { Input } from '@/components/ui/input'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link href="/" className="text-xl font-bold shrink-0">
          Marketplace
        </Link>
        <Input
          type="search"
          placeholder="Buscar produtos..."
          className="max-w-sm"
        />
        <nav className="ml-auto flex items-center gap-4 text-sm">
          <Link href="/products" className="text-muted-foreground hover:text-foreground">
            Produtos
          </Link>
          <Link href="/admin" className="text-muted-foreground hover:text-foreground">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  )
}
