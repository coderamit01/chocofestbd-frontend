import type { ReactNode } from "react";
import { AuthArt } from "@/components/auth/auth-art";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-1 items-center justify-center bg-[#efecea] bg-[radial-gradient(600px_400px_at_85%_10%,rgb(238_86_21/8%),transparent_70%),radial-gradient(500px_360px_at_10%_95%,rgb(61_17_4/6%),transparent_70%)] px-6 py-10 font-sans max-[860px]:items-stretch max-[860px]:bg-surface max-[860px]:bg-none max-[860px]:p-0">
      <div className="flex min-h-160 w-full max-w-270 gap-6 rounded-[32px] bg-surface p-[18px] shadow-[0_30px_60px_-20px_rgb(61_17_4/18%),0_2px_6px_rgb(61_17_4/5%)] max-[860px]:min-h-screen max-[860px]:rounded-none max-[860px]:p-0 max-[860px]:shadow-none">
        <AuthArt />
        <main className="flex min-w-0 flex-1 items-center justify-center px-10 py-6 max-[1000px]:p-6 max-[860px]:items-start max-[860px]:px-[22px] max-[860px]:pt-10 max-[860px]:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}
