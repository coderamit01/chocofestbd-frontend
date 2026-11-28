import Link from "next/link";
import { Icon } from "@/components/shared/icon";
import { CHECKOUT_FORM_ID } from "@/components/store/checkout/contact-address-form";
import { StoreButton } from "@/components/store/ui/store-button";

type PlaceOrderPanelProps = {
  label: string;
  busy: boolean;
};

export function PlaceOrderPanel({ label, busy }: PlaceOrderPanelProps) {
  return (
    <div className="flex flex-col items-center gap-2.5 pt-1">
      <StoreButton
        type="submit"
        form={CHECKOUT_FORM_ID}
        loading={busy}
        block
        className="h-[60px] text-base disabled:cursor-wait disabled:opacity-70"
      >
        <Icon name="lock" size={18} strokeWidth={1.8} />
        {label}
      </StoreButton>
      <p className="m-0 text-[12.5px] text-[#8a7f79]">
        By placing this order you agree to our{" "}
        <Link href="/terms" className="text-ink-2">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/returns" className="text-ink-2">
          Return policy
        </Link>
        .
      </p>
    </div>
  );
}
