import { Icon } from "@/components/shared/icon";
import { storeCardClass } from "@/components/store/ui/store-card";
import type { ContactWay } from "@/types/store-contact";

const isExternal = (href: string) => href.startsWith("http");

export function ContactWayCard({ way }: { way: ContactWay }) {
  const external = isExternal(way.href);

  return (
    <a
      href={way.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={storeCardClass(
        "flex flex-col gap-1 leading-[normal] text-ink no-underline transition-[translate,border-color] duration-200 ease-[ease] hover:-translate-y-0.5 hover:border-[#ffd0b5] hover:text-ink",
      )}
    >
      <span
        style={{ background: way.background, color: way.color }}
        className="mb-2 flex size-10 flex-none items-center justify-center rounded-[12px] max-[900px]:size-[34px]"
      >
        <Icon name={way.icon} size={20} strokeWidth={1.8} />
      </span>
      <b className="text-[15px]">{way.title}</b>
      <span className="text-[13.5px] text-[#3f3531]">{way.detail}</span>
      <small className="text-[12px] text-[#8a7f79]">{way.note}</small>
    </a>
  );
}
