import { ProfileCard } from "./profile-card";

export function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-6 max-[900px]:gap-4" aria-busy="true">
      <section className="overflow-hidden rounded-xl bg-card">
        <div className="h-33 skel" />
        <div className="px-7 pb-6">
          <div className="relative -mt-13 flex flex-wrap items-end gap-5">
            <span className="size-28 flex-none rounded-[30px] border-5 border-surface skel" />
            <div className="flex min-w-60 flex-1 flex-col gap-3 pb-1">
              <span className="h-7 w-64 max-w-full rounded-[8px] skel" />
              <span className="h-3.5 w-96 max-w-full rounded-[6px] skel" />
            </div>
            <span className="mb-1 h-10 w-32 rounded-[10px] skel" />
          </div>
        </div>
      </section>

      <div className="flex gap-1.5 self-start rounded-[14px] bg-card p-1.5">
        <span className="h-9.5 w-32 rounded-[10px] skel" />
        <span className="h-9.5 w-24 rounded-[10px] skel" />
      </div>

      <div className="flex flex-wrap items-start gap-6">
        <div className="flex min-w-0 flex-[2_1_600px] flex-col gap-6">
          <ProfileCard className="gap-6">
            <div className="flex flex-col gap-2">
              <span className="h-5 w-48 rounded-[6px] skel" />
              <span className="h-3 w-72 max-w-full rounded-[6px] skel" />
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-5">
              {Array.from({ length: 4 }, (_, index) => (
                <span key={index} className="flex flex-col gap-2">
                  <span className="h-3.5 w-24 rounded-[6px] skel" />
                  <span className="h-10.5 rounded-[10px] skel" />
                </span>
              ))}
            </div>
            <div className="flex justify-end gap-2.5 border-t border-dashed border-line-dash pt-4.5">
              <span className="h-10 w-24 rounded-[10px] skel" />
              <span className="h-10 w-36 rounded-[10px] skel" />
            </div>
          </ProfileCard>
        </div>

        <aside className="flex min-w-0 flex-[1_1_320px] flex-col gap-6">
          {[3, 5, 2].map((rows, card) => (
            <ProfileCard key={card} className="gap-4">
              <span className="h-5 w-36 rounded-[6px] skel" />
              {Array.from({ length: rows }, (_, index) => (
                <span key={index} className="h-3.5 rounded-[6px] skel" />
              ))}
            </ProfileCard>
          ))}
        </aside>
      </div>
    </div>
  );
}
