import { Icon } from "@/components/shared/icon";

export function CheckoutErrorBanner({ fields }: { fields: string[] }) {
  return (
    <div
      role="alert"
      className="flex gap-3 rounded-2xl border border-[#fecdca] bg-[#fef3f2] px-4 py-3.5 text-[#d92d20]"
    >
      <Icon name="alert" size={18} strokeWidth={1.8} className="mt-0.5 flex-none" />
      <span className="flex flex-col gap-[3px]">
        <b className="text-sm">
          Please fix {fields.length} {fields.length > 1 ? "fields" : "field"} to place your order
        </b>
        <small className="text-[12.5px] text-[#912018]">{fields.join(" · ")}</small>
      </span>
    </div>
  );
}
