import { Icon } from "@/components/shared/icon";
import type { FooterSocial } from "@/types/store-footer";

type SocialLinksProps = { socials: FooterSocial[] };

export function SocialLinks({ socials }: SocialLinksProps) {
  return (
    <div className="flex gap-2">
      {socials.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex size-9 items-center justify-center rounded-full border border-[#ece5df] text-ink-2 transition-all duration-150 ease-[ease] hover:border-brand hover:bg-brand hover:text-white"
        >
          <Icon name={icon} size={18} strokeWidth={1.8} />
        </a>
      ))}
    </div>
  );
}
