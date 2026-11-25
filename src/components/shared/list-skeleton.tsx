export function ListSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <section className="flex flex-col gap-5 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5" aria-busy="true">
      <div className="flex flex-wrap items-center gap-3">
        <span className="h-10.5 w-70 animate-pulse rounded-[10px] bg-surface-2" />
        <span className="h-9 w-36 animate-pulse rounded-[10px] bg-surface-2" />
        <span className="flex-1" />
        <span className="h-10 w-32 animate-pulse rounded-[10px] bg-surface-2" />
      </div>
      <div className="flex flex-col">
        <span className="h-11 animate-pulse rounded-[10px] bg-surface-2" />
        {Array.from({ length: rows }, (_, index) => (
          <div key={index} className="flex items-center gap-3 border-b border-line p-4">
            <span className="size-11 animate-pulse rounded-full bg-surface-2" />
            <span className="flex flex-1 flex-col gap-2">
              <span className="h-3.5 w-1/4 animate-pulse rounded-md bg-surface-2" />
              <span className="h-3 w-20 animate-pulse rounded-md bg-surface-2" />
            </span>
            <span className="h-5.5 w-10 animate-pulse rounded-full bg-surface-2" />
          </div>
        ))}
      </div>
    </section>
  );
}
