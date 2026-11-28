import { Icon } from "@/components/shared/icon";
import type { FooterTrustItem } from "@/types/store-footer";

export function TrustItem({ icon, title, description }: FooterTrustItem) {
  return (
    <div className="flex items-center gap-3 rounded-xl px-1 py-1.5 max-[900px]:last:col-span-full">
      <span className="flex size-[42px] flex-none items-center justify-center rounded-[12px] bg-[#fff1e8] text-brand">
        <Icon name={icon} size={20} strokeWidth={1.8} />
      </span>
      <span className="flex flex-col gap-0.5">
        <b className="font-sans text-[13.5px] leading-[1.2] font-semibold text-ink">{title}</b>
        <span className="text-xs leading-[1.35] text-[#8a7f79]">{description}</span>
      </span>
    </div>
  );
}
