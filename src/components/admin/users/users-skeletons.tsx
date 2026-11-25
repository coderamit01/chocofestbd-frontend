import { Skeleton } from "@/components/ui/skeleton";

export function UsersToolbarSkeleton() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Skeleton className="h-10 w-72 rounded-xl" />
      <Skeleton className="h-9 w-full rounded-lg sm:w-72" />
    </div>
  );
}

export function UsersTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border px-4 py-3">
        <Skeleton className="h-4 w-1/3" />
      </div>
      {Array.from({ length: 6 }, (_, index) => (
        <div key={index} className="flex items-center gap-4 border-b border-border px-4 py-3 last:border-0">
          <Skeleton className="size-9 rounded-full" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-3.5 w-40" />
            <Skeleton className="h-3 w-56" />
          </div>
          <Skeleton className="hidden h-5 w-20 rounded-full md:block" />
          <Skeleton className="hidden h-5 w-16 rounded-full md:block" />
          <Skeleton className="size-7 rounded-md" />
        </div>
      ))}
    </div>
  );
}
