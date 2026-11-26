export function NotificationsSkeleton() {
  return (
    <section className="flex flex-col gap-5 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5" aria-busy="true">
      <div className="flex flex-wrap items-center gap-3">
        <span className="h-10 w-64 rounded-[12px] skel" />
        <span className="h-9 w-32 rounded-[10px] skel" />
        <span className="flex-1" />
        <span className="h-10 w-36 rounded-[10px] skel" />
        <span className="h-10 w-40 rounded-[10px] skel" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="my-1 h-3 w-14 rounded-[6px] skel" />
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="flex gap-3.5 rounded-[14px] p-4 pl-6 shadow-[inset_0_0_0_1px_var(--line)]">
            <span className="size-14 flex-none rounded-[36%] skel" />
            <span className="flex flex-1 flex-col gap-2 pt-0.5">
              <span className="h-3.5 w-2/5 rounded-[6px] skel" />
              <span className="h-3 w-3/5 rounded-[6px] skel" />
              <span className="h-3 w-20 rounded-[6px] skel" />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
