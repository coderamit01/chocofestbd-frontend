"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Icon } from "@/components/shared/icon";
import { StoreButton } from "@/components/store/ui/store-button";

export function OrderAccountCta({ phone }: { phone: string }) {
  const [created, setCreated] = useState(false);

  const createAccount = () => {
    setCreated(true);
    toast.success("Welcome to ChocoFest", {
      description: `Your orders are now saved to ${phone}`,
    });
  };

  return (
    <div className="flex items-center gap-4 rounded-[22px] bg-[linear-gradient(110deg,#3d1104,#6b2410)] px-[22px] py-[18px] text-white max-[900px]:flex-col max-[900px]:items-start max-[900px]:p-[18px]">
      <span className="flex size-12 flex-none items-center justify-center rounded-[14px] bg-white/12 text-[#ffb487]">
        <Icon name="user" size={22} strokeWidth={1.8} />
      </span>
      <span className="flex flex-1 flex-col gap-1">
        <b className="font-heading text-[17px] leading-[1.2] font-bold">Save your details for next time</b>
        <small className="text-[13px] text-[#e6cfc3]">
          Create a free account with {phone} to track this order and check out faster.
        </small>
      </span>
      <StoreButton onClick={created ? undefined : createAccount} className="max-[900px]:w-full">
        {created ? "Account created ✓" : "Create account"}
      </StoreButton>
    </div>
  );
}
