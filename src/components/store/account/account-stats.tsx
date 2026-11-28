import type { AccountStat } from "@/types/store-account";

export function AccountStats({ stats }: { stats: AccountStat[] }) {
  return (
    <div className="grid grid-cols-4 gap-3 max-[900px]:grid-cols-2">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-[3px] rounded-[18px] border border-[#f0ebe6] bg-white p-4">
          <b className="font-heading text-[22px] leading-[1.1] font-bold">{stat.value}</b>
          <span className="text-[12.5px] text-[#8a7f79]">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
