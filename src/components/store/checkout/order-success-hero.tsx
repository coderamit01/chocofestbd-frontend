import { Icon } from "@/components/shared/icon";

type OrderSuccessHeroProps = {
  firstName: string;
  phone: string;
  orderNumber: string;
  onCopy: () => void;
};

export function OrderSuccessHero({ firstName, phone, orderNumber, onCopy }: OrderSuccessHeroProps) {
  return (
    <div className="relative flex flex-col items-center gap-2.5 overflow-hidden rounded-[28px] border border-[#f0ebe6] bg-[radial-gradient(500px_220px_at_50%_0%,rgba(31,138,76,0.12),transparent_70%),#fff] px-6 pt-10 pb-[30px] text-center max-[900px]:rounded-[22px] max-[900px]:px-[18px] max-[900px]:pt-7 max-[900px]:pb-[22px]">
      <span className="flex size-[84px] items-center justify-center rounded-full bg-[#1f8a4c] text-white shadow-[0_0_0_10px_#e6f6ec,0_0_0_20px_#f3fbf6] transition-[scale,opacity] duration-500 ease-[cubic-bezier(0.2,1.6,0.4,1)] starting:scale-40 starting:opacity-0 max-[900px]:size-[68px]">
        <svg
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12l5 5L20 7" />
        </svg>
      </span>
      <span className="mt-[18px] font-sans text-xs leading-none font-semibold tracking-[0.1em] text-[#1f8a4c] uppercase">
        Order placed
      </span>
      <h1 className="m-0 max-w-[640px] font-heading text-[32px] leading-[1.15] font-bold tracking-[-0.02em] text-ink max-[900px]:text-[23px]">
        Thank you, {firstName}! Your chocolates are on the way.
      </h1>
      <p className="m-0 max-w-[520px] text-[14.5px] leading-[1.6] text-ink-2 max-[900px]:text-[13.5px]">
        We sent a confirmation SMS to <b>{phone}</b>. Our team will call within 30 minutes to confirm.
      </p>
      <div className="mt-2 flex items-center gap-3 rounded-[14px] border border-dashed border-[#e2dad4] bg-[#faf7f5] py-2.5 pr-2.5 pl-[18px]">
        <span className="text-[12.5px] text-[#8a7f79]">Order number</span>
        <b className="font-heading text-xl leading-none font-extrabold tracking-[0.04em]">{orderNumber}</b>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex h-[30px] cursor-pointer items-center gap-1.5 rounded-lg border border-dashed border-brand bg-white px-2.5 font-sans text-xs leading-none font-bold tracking-[0.06em] text-brand-text"
        >
          Copy
          <Icon name="copy" size={13} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}
