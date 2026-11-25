export function DeliveriesSkeleton() {
  return (
    <div aria-busy="true" className="mx-auto flex w-full max-w-97.5 flex-col max-[900px]:-mx-4 max-[900px]:w-auto max-[900px]:max-w-none">
      <div className="flex flex-col gap-4 px-4.5 pt-5 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="size-11 animate-pulse rounded-[12px] bg-surface-3" />
            <span className="flex flex-col gap-2">
              <span className="h-4 w-32 animate-pulse rounded-md bg-surface-3" />
              <span className="h-3 w-40 animate-pulse rounded-md bg-surface-3" />
            </span>
          </div>
          <span className="size-11 animate-pulse rounded-[12px] bg-surface" />
        </div>
        <div className="grid grid-cols-[1.6fr_1fr] gap-2.5">
          <span className="h-24 animate-pulse rounded-xl bg-brand-100" />
          <span className="h-24 animate-pulse rounded-xl bg-surface" />
        </div>
        <span className="h-12 animate-pulse rounded-[12px] bg-surface" />
      </div>
      <div className="flex flex-col gap-3 px-4 pb-6">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="flex flex-col gap-3.5 rounded-[18px] bg-surface p-4">
            <span className="h-4 w-1/3 animate-pulse rounded-md bg-surface-2" />
            <span className="h-4 w-1/2 animate-pulse rounded-md bg-surface-2" />
            <span className="h-3.5 w-3/4 animate-pulse rounded-md bg-surface-2" />
            <span className="h-11 animate-pulse rounded-[12px] bg-surface-2" />
            <span className="h-13 animate-pulse rounded-[10px] bg-surface-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
