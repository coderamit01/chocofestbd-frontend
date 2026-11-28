import { Icon } from "@/components/shared/icon";

export function ContactFormError({ message }: { message: string }) {
  return (
    <small role="alert" className="flex items-center gap-[5px] text-[12px] leading-[normal] font-normal text-[#d92d20]">
      <Icon name="alert" size={13} strokeWidth={1.8} className="flex-none" />
      {message}
    </small>
  );
}
