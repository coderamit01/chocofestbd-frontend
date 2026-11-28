import { Icon } from "@/components/shared/icon";
import type { AccountCustomer } from "@/types/store-account";
import { InitialsAvatar } from "./initials-avatar";

export function AccountProfileCard({ customer }: { customer: AccountCustomer }) {
  return (
    <div className="flex items-center gap-3 rounded-[20px] bg-[linear-gradient(135deg,#3d1104,#6b2410)] p-[18px] text-white max-[900px]:p-3.5">
      <InitialsAvatar initials={customer.initials} className="size-14 bg-brand text-lg" />
      <span className="flex flex-col gap-0.5">
        <b>{customer.name}</b>
        <small className="text-[12.5px] text-[#e6cfc3]">{customer.phone}</small>
        <span className="mt-1 inline-flex items-center gap-1 self-start rounded-full bg-white/14 px-2 py-1 text-[11px] text-[#ffd8a8]">
          <Icon name="star" size={12} strokeWidth={1.8} />
          {customer.tier}
        </span>
      </span>
    </div>
  );
}
