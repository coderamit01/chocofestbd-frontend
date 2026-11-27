import type { ReactNode, Ref } from "react";
import { cn } from "cn";
import { Icon } from "@/components/shared/icon";
import { IconButton } from "./icon-button";

type DrawerHeaderProps = {
  children: ReactNode;
  closeLabel: string;
  onClose: () => void;
  closeRef?: Ref<HTMLButtonElement>;
  className?: string;
};

export function DrawerHeader({ children, closeLabel, onClose, closeRef, className }: DrawerHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-[#f0ebe6] font-heading text-lg leading-none font-semibold",
        className,
      )}
    >
      {children}
      <IconButton ref={closeRef} aria-label={closeLabel} onClick={onClose}>
        <Icon name="close" size={20} strokeWidth={1.8} />
      </IconButton>
    </div>
  );
}
