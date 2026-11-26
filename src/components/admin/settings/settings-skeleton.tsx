export function SettingsSkeleton() {
  return (
    <div className="flex flex-wrap items-start gap-6" aria-busy="true">
      <div className="flex flex-[0_1_260px] flex-col gap-1 rounded-xl bg-card p-3 max-[900px]:flex-[1_1_100%]">
        {Array.from({ length: 6 }, (_, index) => (
          <span key={index} className="h-11.5 rounded-[12px] skel" />
        ))}
      </div>
      <div className="flex flex-[1_1_600px] flex-col gap-6 rounded-xl bg-card p-[30px] max-[900px]:p-4.5">
        <div className="flex flex-col gap-2">
          <span className="h-5 w-32 rounded-[6px] skel" />
          <span className="h-3 w-72 rounded-[6px] skel" />
        </div>
        <div className="flex gap-5">
          <span className="size-30 rounded-[14px] skel" />
          <span className="size-18 rounded-[14px] skel" />
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-5">
          {Array.from({ length: 8 }, (_, index) => (
            <span key={index} className="flex flex-col gap-2">
              <span className="h-3.5 w-24 rounded-[6px] skel" />
              <span className="h-10.5 rounded-[10px] skel" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
