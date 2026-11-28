import type { CSSProperties, ReactNode } from "react";
import type { StoreCoupon } from "@/types/store-offers";

type CouponCardProps = {
  coupon: StoreCoupon;
  action: ReactNode;
};

export function CouponCard({ coupon, action }: CouponCardProps) {
  return (
    <div
      style={{ "--cc": coupon.color } as CSSProperties}
      className="flex overflow-hidden rounded-[20px] border border-[#f0ebe6] bg-white text-ink"
    >
      <div className="relative flex w-24 flex-none flex-col items-center justify-center bg-(--cc) text-white after:absolute after:top-0 after:-right-2 after:bottom-0 after:w-4 after:bg-[radial-gradient(circle_at_8px_10px,#fff_6px,transparent_6.5px)] after:bg-size-[16px_20px] after:bg-repeat-y after:content-['']">
        <b className="font-heading text-[26px] leading-none font-extrabold">{coupon.value}</b>
        <small className="mt-1 font-sans text-[11px] leading-none font-bold tracking-[0.12em] opacity-85">
          {coupon.unit}
        </small>
      </div>
      <div className="flex min-w-0 flex-col gap-1 py-4 pr-4 pl-5">
        <b className="text-[15px]">{coupon.title}</b>
        <span className="text-[12.5px] leading-[1.45] text-[#8a7f79]">{coupon.description}</span>
        {action}
      </div>
    </div>
  );
}
