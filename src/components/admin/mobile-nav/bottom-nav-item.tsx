import type { ReactNode } from "react";
import Link from "next/link";
import type { BottomNavIcon } from "@/config/mobile-nav";
import { cn } from "@/lib/utils";

const itemClass = (active: boolean) =>
  cn(
    "group relative flex h-[52px] min-w-0 flex-1 basis-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border-0 bg-transparent p-0 font-sans text-[11px] leading-none font-medium outline-none [-webkit-tap-highlight-color:transparent]",
    active
      ? "font-semibold text-brand-press after:absolute after:-bottom-2 after:h-[3px] after:w-[18px] after:rounded-[3px] after:bg-brand after:content-['']"
      : "text-[#8a7f79] hover:text-[#8a7f79]"
  );

const iconClass = (active: boolean) =>
  cn(
    "relative flex h-[30px] w-[46px] items-center justify-center rounded-full transition-[background-color,color,transform] duration-200 group-focus-visible:shadow-[0_0_0_3px_rgb(238_86_21/28%)] group-active:scale-[0.92]",
    active ? "bg-brand-50 text-brand" : "group-hover:bg-[#f6f1ed] group-hover:text-ink-2"
  );

function NavGlyph({ icon, active }: { icon: BottomNavIcon; active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={icon.fill} fill="currentColor" fillOpacity={active ? 0.16 : 0} stroke="none" />
      <path d={icon.stroke} />
    </svg>
  );
}

function ItemBody({ glyph, label, count, active }: { glyph: ReactNode; label: string; count?: number; active: boolean }) {
  return (
    <>
      <span className={iconClass(active)}>
        {glyph}
        {!!count && (
          <span className="absolute -top-[3px] right-0.5 h-[18px] min-w-[18px] rounded-full border-2 border-surface bg-brand px-[5px] text-center text-[10px] leading-[18px] font-semibold text-white">
            {count}
          </span>
        )}
      </span>
      <span className="whitespace-nowrap transition-colors duration-200">{label}</span>
    </>
  );
}

type BottomNavLinkProps = {
  href: string;
  label: string;
  icon: BottomNavIcon;
  active: boolean;
  count?: number;
};

export function BottomNavLink({ href, label, icon, active, count }: BottomNavLinkProps) {
  return (
    <Link href={href} aria-label={label} aria-current={active ? "page" : undefined} className={itemClass(active)}>
      <ItemBody glyph={<NavGlyph icon={icon} active={active} />} label={label} count={count} active={active} />
    </Link>
  );
}

export function BottomNavMenuButton({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button type="button" aria-label="Menu" onClick={onClick} className={itemClass(active)}>
      <ItemBody
        active={active}
        label="Menu"
        glyph={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h9" />
            <circle cx="18.5" cy="17" r="1.6" fill="currentColor" stroke="none" />
          </svg>
        }
      />
    </button>
  );
}
