import { CHECKOUT_FORM_ID } from "@/components/store/checkout/contact-address-form";
import { MobileStickyBar } from "@/components/store/ui/mobile-sticky-bar";
import { StoreButton } from "@/components/store/ui/store-button";

type CheckoutStickyBarProps = {
  paymentName: string;
  total: string;
  label: string;
  busy: boolean;
};

export function CheckoutStickyBar({ paymentName, total, label, busy }: CheckoutStickyBarProps) {
  return (
    <MobileStickyBar offset="edge" className="mx-0">
      <span className="flex flex-1 flex-col gap-px">
        <small className="text-[11.5px] text-[#8a7f79]">Total · {paymentName}</small>
        <b>{total}</b>
      </span>
      <StoreButton
        type="submit"
        form={CHECKOUT_FORM_ID}
        loading={busy}
        className="h-12 px-[22px] disabled:cursor-wait disabled:opacity-70"
      >
        {label}
      </StoreButton>
    </MobileStickyBar>
  );
}
