import Link from "next/link";
import { Icon } from "@/components/shared/icon";
import { MeltedBar } from "@/components/shared/melted-bar";
import { buttonVariants } from "@/components/ui/button";

export default function AdminNotFound() {
  return (
    <section className="flex min-h-[620px] items-center justify-center rounded-xl bg-card px-6 py-12">
      <div className="flex max-w-[440px] flex-col items-center gap-4 text-center">
        <MeltedBar />
        <span className="font-heading text-[64px] leading-none font-bold text-brand">404</span>
        <h2 className="text-[26px] leading-[1.2]">This page melted away</h2>
        <p className="text-ink-2">The link may be old, or the page was moved. Try search, or head back to the dashboard.</p>
        <div className="flex items-center gap-2.5">
          <Link href="/admin" className={buttonVariants()}>
            <Icon name="home" size={17} strokeWidth={1.8} />
            Back to dashboard
          </Link>
          <Link href="/admin/orders" className={buttonVariants({ variant: "soft" })}>
            Go to orders
          </Link>
        </div>
      </div>
    </section>
  );
}
