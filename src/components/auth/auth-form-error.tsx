import { Icon } from "@/components/shared/icon";

export function AuthFormError({ message }: { message: string | null }) {
  if (!message) return null;

  return (
    <div role="alert" className="flex items-center gap-2.5 rounded-[14px] bg-[#fdeeec] px-3.5 py-3 text-[13px] leading-[1.45] text-[#8f2318]">
      <Icon name="alert" size={18} strokeWidth={1.8} className="flex-none" />
      <span>{message}</span>
    </div>
  );
}
