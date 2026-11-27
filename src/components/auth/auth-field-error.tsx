import { Icon } from "@/components/shared/icon";

export function AuthFieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <span id={id} role="alert" className="flex items-center gap-1.5 pl-1 text-[12.5px] text-[#c43425]">
      <Icon name="alert" size={14} strokeWidth={1.8} className="flex-none" />
      {message}
    </span>
  );
}
