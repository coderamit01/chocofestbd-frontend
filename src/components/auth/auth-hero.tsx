export function AuthHero() {
  return (
    <section className="relative hidden min-h-[calc(100vh-32px)] flex-[1_1_520px] flex-col justify-between overflow-hidden rounded-[24px] bg-choco p-12 text-white min-[901px]:flex">
      <svg viewBox="0 0 600 600" aria-hidden="true" className="absolute -right-30 -bottom-35 size-140">
        <g transform="rotate(-12 300 300)">
          <rect x="90" y="110" width="420" height="380" rx="28" fill="#5a2410" />
          <path d="M230 110v380M370 110v380M90 237h420M90 364h420" stroke="#3d1104" strokeWidth="12" />
          <path d="M430 110h52a28 28 0 0 1 28 28v80a96 96 0 0 1-80-108z" fill="#3d1104" />
          <rect x="60" y="400" width="480" height="150" rx="22" fill="#ee5615" />
        </g>
      </svg>
      <div className="relative flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-[13px] bg-brand font-heading text-base leading-none font-bold">CF</span>
        <span className="font-heading text-[22px] leading-none font-semibold">
          ChocoFest <span className="text-[#ff9a66]">BD</span>
        </span>
      </div>
      <div className="relative flex max-w-105 flex-col gap-4">
        <h1 className="text-[44px] leading-[1.1] tracking-[-0.02em] text-white">Every order, from cart to doorstep.</h1>
        <p className="text-base leading-[1.6] text-[#e8d6cc]">
          Confirm orders, verify bKash and Nagad payments and keep the shelves stocked — in one place.
        </p>
      </div>
      <span className="relative text-[13px] text-[#c9ad9f]">© {new Date().getFullYear()} ChocoFest BD · Dhaka</span>
    </section>
  );
}
