export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-white border border-border/60 shadow-sm animate-pulse">
      <div className="aspect-square bg-muted" />
      <div className="flex flex-col gap-2 p-4">
        <div className="h-3 w-16 rounded-full bg-muted" />
        <div className="h-4 w-full rounded-full bg-muted" />
        <div className="h-4 w-3/4 rounded-full bg-muted" />
        <div className="mt-2 h-5 w-24 rounded-full bg-muted" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
