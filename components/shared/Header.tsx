'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search, Menu, X, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => setMobileOpen(false)}>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary">
            <ShoppingBag className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight hidden sm:block">Ofertaê</span>
        </Link>

        {/* Search bar — centro */}
        <div className="flex flex-1 items-center justify-center px-2 sm:px-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Buscar produtos..."
              className="w-full rounded-full border border-border bg-muted/50 py-2 pl-9 pr-4 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-1 shrink-0">
          <Link href="/" className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground">
            Produtos
          </Link>
          <Link href="/admin" className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground">
            Admin
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="flex md:hidden items-center justify-center h-9 w-9 rounded-full border border-border text-muted-foreground hover:bg-muted transition"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 py-4 space-y-1">
          <Link href="/" onClick={() => setMobileOpen(false)}
            className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted transition">
            Produtos
          </Link>
          <Link href="/admin" onClick={() => setMobileOpen(false)}
            className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted transition">
            Admin
          </Link>
        </div>
      )}
    </header>
  )
}
