export function NotFoundDigits() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center gap-2.5 font-heading text-[150px] leading-none font-extrabold tracking-[-0.04em] text-choco max-[900px]:text-[90px]"
    >
      <span>4</span>
      <span className="relative size-[130px] rounded-full bg-[radial-gradient(circle_at_35%_30%,#a0522d,#3d1104_70%)] shadow-[inset_-10px_-14px_0_rgba(0,0,0,0.2)] after:absolute after:-bottom-3.5 after:left-[56%] after:h-6 after:w-3.5 after:rounded-[0_0_8px_8px] after:bg-choco after:content-[''] max-[900px]:size-20">
        <i className="absolute -bottom-[26px] left-[24%] h-[46px] w-[22px] animate-drip rounded-[0_0_12px_12px] bg-choco max-[900px]:-bottom-[18px] max-[900px]:w-3.5" />
      </span>
      <span>4</span>
    </div>
  );
}
