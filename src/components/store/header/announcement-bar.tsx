import { Icon } from "@/components/shared/icon";
import { Container } from "@/components/store/shared/container";
import { ANNOUNCEMENT_MESSAGES, ANNOUNCEMENT_TRUST, STORE_HOTLINE } from "@/config/store-header";
import { AnnouncementCarousel } from "./announcement-carousel";

export function AnnouncementBar() {
  return (
    <div className="bg-choco text-[12.5px] text-[#f3e3da] max-[900px]:hidden">
      <Container className="flex h-[38px] items-center gap-4">
        <span className="flex items-center gap-2.5 whitespace-nowrap">
          <Icon name="phone" size={14} strokeWidth={1.8} />
          Hotline
          <a
            href={STORE_HOTLINE.href}
            className="inline-flex items-center gap-1.5 font-medium text-white hover:text-[#ffb487]"
          >
            {STORE_HOTLINE.display}
          </a>
          <i aria-hidden="true" className="h-3.5 w-px bg-white/20" />
          {STORE_HOTLINE.hours}
        </span>
        <AnnouncementCarousel messages={ANNOUNCEMENT_MESSAGES} />
        <span className="flex items-center gap-2.5 whitespace-nowrap">
          <Icon name="shield" size={14} strokeWidth={1.8} />
          {ANNOUNCEMENT_TRUST}
        </span>
      </Container>
    </div>
  );
}
