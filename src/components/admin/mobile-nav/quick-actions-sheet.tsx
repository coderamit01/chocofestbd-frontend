import Link from "next/link";
import { Icon } from "@/components/shared/icon";
import type { QuickAction } from "@/config/mobile-nav";
import { TILE_TONES } from "@/config/tones";
import { cn } from "@/lib/utils";

type QuickActionsSheetProps = {
  actions: QuickAction[];
  onClose: () => void;
};

export function QuickActionsSheet({ actions, onClose }: QuickActionsSheetProps) {
  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-38 animate-fade bg-[rgb(34_21_16/32%)]" />
      <div
        id="quick-actions"
        role="menu"
        aria-label="Quick actions"
        className="fixed right-3 bottom-[calc(104px+env(safe-area-inset-bottom))] left-3 z-39 flex animate-sheet-up flex-col gap-3.5 rounded-3xl bg-surface px-4 pt-[18px] pb-4 shadow-[0_16px_40px_rgb(61_17_4/18%)]"
      >
        <span className="px-1 font-heading text-[15px] leading-none font-semibold text-ink">Quick actions</span>
        <div className="grid grid-cols-4 gap-2">
          {actions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              role="menuitem"
              onClick={onClose}
              className="flex flex-col items-center gap-2 rounded-2xl px-1 py-2 text-center font-sans text-xs leading-[1.25] font-medium text-ink hover:bg-surface-2 hover:text-ink"
            >
              <span className={cn("flex size-[52px] items-center justify-center rounded-[36%]", TILE_TONES[action.tone])}>
                <Icon name={action.icon} size={22} strokeWidth={1.9} />
              </span>
              <span>{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
