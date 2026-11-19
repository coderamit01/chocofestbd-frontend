import Image from "next/image";
import Link from "next/link";
import { cn } from "cn";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className, priority }: BrandLogoProps) {
  return (
    <Link href="/" aria-label="Chocofest BD home" className={cn("inline-flex", className)}>
      <Image
        src="/Chocofestbd Logo.webp"
        alt="Chocofest BD"
        width={137}
        height={80}
        priority={priority}
        className="h-16 w-auto"
      />
    </Link>
  );
}
