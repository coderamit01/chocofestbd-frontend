import Link from "next/link";
import { Icon } from "@/components/shared/icon";
import type { StoreCategory } from "@/types/store";

type MegaCategoryPanelProps = {
  category: StoreCategory;
  onNavigate: () => void;
};

export function MegaCategoryPanel({ category, onNavigate }: MegaCategoryPanelProps) {
  const { promo } = category;
  return (
    <div className="grid grid-cols-[1fr_210px] gap-5 px-6 py-[22px]">
      <div className="grid grid-cols-3 gap-[18px]">
        {category.groups.map((group) => (
          <div key={group.heading} className="flex flex-col gap-2.5">
            <span className="font-heading text-[13px] leading-none font-semibold tracking-[0.01em] text-ink">
              {group.heading}
            </span>
            {group.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={onNavigate}
                className="text-[13.5px] text-[#6b605a] hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <Link
        href={promo.href}
        onClick={onNavigate}
        className="flex flex-col gap-1.5 self-stretch rounded-xl bg-[linear-gradient(160deg,#ff7a2f,#ee5615_60%,#c2410c)] p-[18px] text-white hover:text-white"
      >
        <span className="self-start rounded-full bg-white/20 px-2 py-[5px] font-sans text-[12.5px] leading-none font-semibold tracking-[0.06em] text-white uppercase">
          {promo.tag}
        </span>
        <b className="font-heading text-[19px] leading-[1.2] font-bold">{promo.title}</b>
        <span className="text-[12.5px] text-[#ffe7d8]">{promo.subtitle}</span>
        <span className="mt-auto inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-white">
          Shop now
          <Icon name="arrowRight" size={15} strokeWidth={1.8} />
        </span>
      </Link>
    </div>
  );
}
