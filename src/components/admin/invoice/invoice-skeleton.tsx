export function InvoiceSkeleton() {
  return (
    <div aria-busy="true" className="flex flex-col gap-6 overflow-x-auto">
      <div className="mx-auto flex w-full max-w-198.5 items-center justify-between">
        <span className="h-4 w-28 animate-pulse rounded-md bg-surface-2" />
        <span className="h-10 w-36 animate-pulse rounded-[10px] bg-surface-3" />
      </div>
      <div className="mx-auto flex h-280.75 w-198.5 flex-none flex-col gap-6 bg-white p-14">
        <span className="h-12 w-64 animate-pulse rounded-md bg-surface-2" />
        <span className="h-24 w-full animate-pulse rounded-md bg-surface-2" />
        <span className="h-64 w-full animate-pulse rounded-md bg-surface-2" />
      </div>
    </div>
  );
}
