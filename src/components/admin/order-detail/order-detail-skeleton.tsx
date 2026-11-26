const block = "skel";

function CardSkeleton({ rows = 4, className = "" }: { rows?: number; className?: string }) {
  return (
    <div className={`flex flex-col gap-4 rounded-xl bg-card px-6 py-5.5 ${className}`}>
      <span className={`${block} rounded-[6px] h-5 w-36`} />
      {Array.from({ length: rows }, (_, index) => (
        <span key={index} className={`${block} rounded-[6px] h-4 w-full`} />
      ))}
    </div>
  );
}

export function OrderDetailSkeleton() {
  return (
    <div aria-busy="true" className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span className={`${block} rounded-[6px] h-4 w-28`} />
          <span className={`${block} rounded-[6px] h-8 w-80`} />
          <span className={`${block} rounded-[6px] h-4 w-64`} />
        </div>
        <span className={`${block} h-10 w-72 rounded-[10px]`} />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="flex flex-wrap items-start gap-6">
        <CardSkeleton rows={8} className="flex-[2_1_600px]" />
        <CardSkeleton rows={8} className="flex-[1_1_320px]" />
      </div>
    </div>
  );
}
