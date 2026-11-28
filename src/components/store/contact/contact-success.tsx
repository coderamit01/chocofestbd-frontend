import { Icon } from "@/components/shared/icon";
import { StoreCardTitle } from "@/components/store/ui/store-card-title";
import { TextLink } from "@/components/store/ui/text-link";

type ContactSuccessProps = {
  name: string;
  phone: string;
  onReset: () => void;
};

export function ContactSuccess({ name, phone, onReset }: ContactSuccessProps) {
  return (
    <div role="status" className="flex flex-col items-center gap-2.5 px-2.5 py-10 text-center leading-[normal]">
      <span className="flex size-16 animate-in items-center justify-center rounded-full bg-[#1f8a4c] text-white shadow-[0_0_0_10px_#e6f6ec,0_0_0_20px_#f3fbf6] duration-500 ease-[cubic-bezier(0.2,1.6,0.4,1)] fade-in zoom-in-40">
        <Icon name="check" size={30} strokeWidth={1.8} />
      </span>
      <StoreCardTitle className="mb-0">Message sent</StoreCardTitle>
      <p className="m-0 text-base text-[#5f5450]">
        Thanks {name} — we’ll call or SMS you on {phone} within 2 hours.
      </p>
      <TextLink onClick={onReset}>Send another</TextLink>
    </div>
  );
}
