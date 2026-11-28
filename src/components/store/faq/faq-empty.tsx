import { Icon } from "@/components/shared/icon";

export function FaqEmpty({ query }: { query: string }) {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-2.5 rounded-[20px] border border-dashed border-[#e2dad4] bg-white px-5 py-[60px] text-center leading-[normal]"
    >
      <span className="flex size-16 items-center justify-center rounded-full bg-brand-50 text-brand">
        <Icon name="search" size={28} strokeWidth={1.8} />
      </span>
      <h3 className="m-0 font-heading text-[19px] leading-[1.2] font-bold tracking-normal text-ink">
        No answers for “{query}”
      </h3>
      <p className="mt-0 mb-1.5 text-[14px] text-[#5f5450]">Try another word, or ask us directly.</p>
    </div>
  );
}
