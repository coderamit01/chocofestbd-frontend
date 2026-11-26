import { Icon } from "@/components/shared/icon";

export function AuthFormError({ message }: { message: string | null }) {
  if (!message) return null;

  return (
    <div role="alert" className="flex items-center gap-2.5 rounded-[12px] bg-danger-soft p-3.5 text-[13.5px] text-[#8f2318]">
      <Icon name="info" size={18} strokeWidth={1.8} className="flex-none" />
      {message}
    </div>
  );
}
