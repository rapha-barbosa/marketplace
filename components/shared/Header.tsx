'use client'

import Link from 'next/link'
import { useState, Suspense } from 'react'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HeaderSearchForm } from '@/components/shared/HeaderSearchForm'

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
          <Suspense fallback={null}>
            <HeaderSearchForm />
          </Suspense>
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
