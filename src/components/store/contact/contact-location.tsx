import { StoreCard } from "@/components/store/ui/store-card";
import { TextLink } from "@/components/store/ui/text-link";
import type { ContactStore } from "@/types/store-contact";
import { ContactMap } from "./contact-map";

export function ContactLocation({ store }: { store: ContactStore }) {
  return (
    <aside className="flex flex-col gap-3">
      <ContactMap label={store.mapLabel} />
      <StoreCard className="flex flex-col gap-1.5 text-[13.5px] leading-[normal] text-[#5f5450]">
        <b className="text-[15px] text-ink">{store.title}</b>
        <span>{store.address}</span>
        <span>{store.hours}</span>
        <TextLink href={store.directionsHref} target="_blank" rel="noopener noreferrer" className="mt-1 self-start">
          Get directions
        </TextLink>
      </StoreCard>
    </aside>
  );
}
