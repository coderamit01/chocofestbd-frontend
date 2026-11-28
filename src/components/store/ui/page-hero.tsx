import type { ReactNode } from "react";
import { cn } from "cn";
import { HeroKicker } from "./hero-kicker";

type PageHeroProps = {
  title: ReactNode;
  kicker?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function PageHero({ title, kicker, description, children, className }: PageHeroProps) {
  return (
    <header
      className={cn(
        "flex flex-col items-start gap-2.5 pt-3.5 pb-[26px] max-[900px]:pt-1.5 max-[900px]:pb-[18px]",
        className,
      )}
    >
      {kicker && <HeroKicker>{kicker}</HeroKicker>}
      <h1 className="m-0 max-w-[720px] font-heading text-[38px] leading-[1.1] font-bold tracking-[-0.02em] text-ink max-[900px]:text-[27px]">
        {title}
      </h1>
      {description !== undefined && (
        <p className="m-0 max-w-[620px] font-sans text-[15px] leading-[1.6] text-ink-2 max-[900px]:text-[13.5px]">
          {description}
        </p>
      )}
      {children}
    </header>
  );
}
