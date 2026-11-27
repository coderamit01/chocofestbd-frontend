import Link from "next/link";
import { Container } from "@/components/store/shared/container";
import type { FooterLink } from "@/types/store-footer";

type FooterBottomBarProps = { copyright: string; links: FooterLink[]; developer: string };

export function FooterBottomBar({ copyright, links, developer }: FooterBottomBarProps) {
  return (
    <div className="border-t border-[#f1ece8] bg-[#faf8f6]">
      <Container className="flex min-h-[58px] flex-wrap items-center gap-5 text-[12.5px] text-[#8a7f79] max-[900px]:flex-col max-[900px]:justify-center max-[900px]:gap-2 max-[900px]:pt-4 max-[900px]:pb-[88px] max-[900px]:text-center">
        <span>{copyright}</span>
        <span className="flex gap-4">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-[#8a7f79] no-underline hover:text-brand">
              {link.label}
            </Link>
          ))}
        </span>
        <span className="min-w-0 flex-1 max-[900px]:hidden" />
        <span>
          Developed by <b className="font-semibold text-brand">{developer}</b>
        </span>
      </Container>
    </div>
  );
}
