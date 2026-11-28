import { cn } from "cn";
import { Icon, type IconName } from "@/components/shared/icon";
import type { ListingView } from "@/types/store-listing";
import { ListingNavButton } from "./listing-nav-button";

const VIEWS: { value: ListingView; label: string; icon: IconName }[] = [
  { value: "grid", label: "Grid view", icon: "grid" },
  { value: "list", label: "List view", icon: "list" },
];

type ViewToggleProps = {
  view: ListingView;
  hrefs: Record<ListingView, string>;
};

export function ViewToggle({ view, hrefs }: ViewToggleProps) {
  return (
    <div role="group" aria-label="View" className="flex gap-0.5 rounded-[11px] bg-[#f6f3f0] p-[3px]">
      {VIEWS.map((item) => (
        <ListingNavButton
          key={item.value}
          href={hrefs[item.value]}
          aria-label={item.label}
          aria-pressed={view === item.value}
          className={cn(
            "flex h-[30px] w-[34px] cursor-pointer items-center justify-center rounded-[8px] border-0 bg-transparent text-[#8a7f79]",
            view === item.value && "bg-white text-brand shadow-[0_1px_3px_rgba(0,0,0,0.08)]",
          )}
        >
          <Icon name={item.icon} size={17} strokeWidth={1.8} />
        </ListingNavButton>
      ))}
    </div>
  );
}
