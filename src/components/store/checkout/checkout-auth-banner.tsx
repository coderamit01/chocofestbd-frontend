import Link from "next/link";
import { cn } from "cn";
import { Icon } from "@/components/shared/icon";

const ACTION =
  "inline-flex h-9 items-center rounded-full px-3.5 font-sans text-[13px] leading-none font-semibold whitespace-nowrap no-underline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[rgba(238,86,21,0.3)] max-[700px]:flex-1 max-[700px]:justify-center";

export function CheckoutAuthBanner() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#f0ebe6] bg-white px-3.5 py-3 max-[700px]:flex-wrap">
      <span className="flex size-[38px] flex-none items-center justify-center rounded-full bg-[#fff1e8] text-brand">
        <Icon name="user" size={18} strokeWidth={1.8} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5 font-sans text-[12.5px] leading-[1.35] font-normal text-[#8a7a72]">
        <b className="font-sans text-sm leading-[1.2] font-semibold text-ink">Have an account?</b>
        Log in for faster checkout and to track your orders.
      </span>
      <span className="flex flex-none gap-2 max-[700px]:w-full">
        <Link href="/login" className={cn(ACTION, "bg-choco text-white hover:bg-[#2a0b02] hover:text-white")}>
          Log in
        </Link>
        <Link
          href="/login"
          className={cn(ACTION, "border border-[#e7ddd6] text-choco hover:border-brand hover:text-brand-text")}
        >
          Create account
        </Link>
      </span>
    </div>
  );
}
