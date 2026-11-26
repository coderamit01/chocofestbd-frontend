import type { ReactNode } from "react";
import { AuthHero } from "@/components/auth/auth-hero";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-1 flex-wrap gap-4 bg-background p-4">
      <AuthHero />
      <div className="flex flex-[1_1_420px] items-center justify-center px-2 py-8">
        <div className="flex w-full max-w-100 flex-col gap-6">
          <div className="flex items-center gap-2.5 min-[901px]:hidden">
            <span className="flex size-10 items-center justify-center rounded-[12px] bg-brand font-heading text-[15px] leading-none font-bold text-white">
              CF
            </span>
            <span className="font-heading text-xl leading-none font-semibold">ChocoFest BD</span>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}
