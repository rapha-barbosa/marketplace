'use client'

import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRef } from 'react'

export function HeaderSearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const q = inputRef.current?.value.trim()
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    router.push(q ? `/?${params.toString()}` : '/')
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        ref={inputRef}
        type="search"
        name="q"
        defaultValue={searchParams.get('q') ?? ''}
        placeholder="Buscar produtos..."
        className="w-full rounded-full border border-border bg-muted/50 py-2 pl-9 pr-4 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
      />
    </form>
  )
}
