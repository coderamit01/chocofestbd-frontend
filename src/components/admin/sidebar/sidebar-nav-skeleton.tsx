const SKELETON_WIDTHS = ["72%", "58%", "66%", "50%", "62%", "70%", "54%"];

export function SidebarNavSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-[3px]" aria-hidden="true">
      {SKELETON_WIDTHS.map((width) => (
        <div key={width} className="flex h-[46px] items-center gap-3.5 px-3.5">
          <span className="size-5 flex-none rounded-[6px] skel" />
          <span className="skel h-3 rounded-[6px]" style={{ width }} />
        </div>
      ))}
    </div>
  );
}
