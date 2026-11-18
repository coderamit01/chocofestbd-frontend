import type { ReactNode } from "react";
import { AuthHero, HighlightUnderline } from "@/components/auth/auth-hero";
import { BrandLogo } from "@/components/shared/brand-logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-1 items-center justify-center bg-off-white px-4 py-10 sm:px-8">
      <div className="grid w-full max-w-[960px] gap-10 rounded-[36px] bg-card p-6 shadow-[0_40px_80px_-30px_rgb(39_38_38/0.18)] sm:p-8 lg:grid-cols-2 lg:p-10">
        <AuthHero
          title={
            <>
              Discover chocolates from around <HighlightUnderline>the world.</HighlightUnderline>
            </>
          }
          description="Imported chocolates, coffee & snacks, delivered fresh to your doorstep across Bangladesh."
        />
        <div className="flex items-center justify-center">
          <div className="flex w-full max-w-[380px] flex-col items-center gap-6">
            <BrandLogo priority />
            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
