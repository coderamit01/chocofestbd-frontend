import { Icon } from "@/components/shared/icon";
import { TextLink } from "@/components/store/ui/text-link";
import type { ListingLink } from "@/types/store-listing";
import { ListingNavButton } from "./listing-nav-button";

type ActiveFilterChipsProps = {
  chips: ListingLink[];
  clearHref: string;
};

export function ActiveFilterChips({ chips, clearHref }: ActiveFilterChipsProps) {
  if (!chips.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <ListingNavButton
          key={chip.label}
          href={chip.href}
          aria-label={`Remove filter ${chip.label}`}
          className="inline-flex h-[34px] cursor-pointer items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 pr-2.5 pl-3.5 font-sans text-[13px] leading-none font-medium text-[#9a3412] hover:bg-[#ffe8da]"
        >
          {chip.label}
          <Icon name="close" size={14} strokeWidth={1.8} />
        </ListingNavButton>
      ))}
      <TextLink href={clearHref} scroll={false}>
        Clear all
      </TextLink>
    </div>
  );
}
