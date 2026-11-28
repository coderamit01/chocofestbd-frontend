import Link from "next/link";
import { cn } from "cn";

type BuyNowLinkProps = { href?: string; className?: string };

export function BuyNowLink({ href = "/checkout", className }: BuyNowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex h-9.5 items-center justify-center rounded-sm border border-choco font-sans text-[13px] leading-none font-semibold text-choco no-underline transition-[background-color,color] duration-150 ease-[ease] hover:bg-choco hover:text-white",
        className,
      )}
    >
      Buy now
    </Link>
  );
}
