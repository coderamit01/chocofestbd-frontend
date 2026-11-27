import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AUTH_LOGO_SRC } from "@/config/auth";

type AuthHeaderProps = {
  title: string;
  description: ReactNode;
};

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <header className="mb-1.5 flex flex-col items-center gap-2 text-center">
      <Link href="/login" aria-label="ChocoFest BD" className="mb-2.5 inline-flex">
        <Image src={AUTH_LOGO_SRC} alt="ChocoFest BD" width={144} height={84} priority className="block h-21 w-auto" />
      </Link>
      <h1 className="m-0 font-heading text-[32px] leading-[1.15] font-bold tracking-[-0.02em] text-[#1d120d] max-[860px]:text-[28px]">
        {title}
      </h1>
      <p className="m-0 text-sm leading-normal text-[#8a7f79]">{description}</p>
    </header>
  );
}
