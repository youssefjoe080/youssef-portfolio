export default function Loading() {
  return (
    <div className="container-app py-8 md:py-12">
      <div className="mb-6 h-8 w-56 animate-pulse rounded-lg bg-ink-800" />
      <div className="mb-6 h-16 w-full animate-pulse rounded-xl3 bg-ink-800" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-xl3 border border-ink-700 bg-ink-850">
            <div className="aspect-[4/3] w-full animate-pulse bg-ink-800" />
            <div className="space-y-3 p-5">
              <div className="h-5 w-2/3 animate-pulse rounded bg-ink-800" />
              <div className="h-4 w-1/3 animate-pulse rounded bg-ink-800" />
              <div className="h-8 w-1/2 animate-pulse rounded bg-ink-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
