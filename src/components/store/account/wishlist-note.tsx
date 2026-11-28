import type { ReactNode } from "react";
import { Icon } from "@/components/shared/icon";

export function WishlistNote({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-[14px] bg-[#fff8e6] px-4 py-3 text-[13px] text-[#8a5a00]">
      <Icon name="notifications" size={16} strokeWidth={1.8} className="flex-none" />
      {children}
    </div>
  );
}
