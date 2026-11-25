export function BannersSkeleton() {
  return (
    <section className="flex flex-col gap-5 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5" aria-busy="true">
      <div className="flex flex-wrap items-center gap-3">
        {Array.from({ length: 4 }, (_, index) => (
          <span key={index} className="h-9.5 w-32 animate-pulse rounded-[10px] bg-surface-2" />
        ))}
        <span className="flex-1" />
        <span className="h-10 w-32 animate-pulse rounded-[10px] bg-surface-2" />
      </div>
      <span className="h-4 w-96 max-w-full animate-pulse rounded-md bg-surface-2" />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(380px,100%),1fr))] gap-5">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="flex flex-col overflow-hidden rounded-xl bg-surface-2">
            <span className="h-47.5 animate-pulse bg-surface-3" />
            <div className="flex flex-col gap-2 px-4 py-3.5">
              <span className="h-4 w-1/2 animate-pulse rounded-md bg-surface-3" />
              <span className="h-3 w-1/3 animate-pulse rounded-md bg-surface-3" />
            </div>
            <span className="mx-4 mb-4 h-9 animate-pulse rounded-[9px] bg-surface-3" />
          </div>
        ))}
      </div>
    </section>
  );
}
