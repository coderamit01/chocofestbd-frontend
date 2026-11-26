import Link from "next/link";
import { Icon } from "@/components/shared/icon";
import { buttonVariants } from "@/components/ui/button";

type AccessDeniedProps = {
  message: string;
};

export function AccessDenied({ message }: AccessDeniedProps) {
  return (
    <section className="flex min-h-[620px] items-center justify-center rounded-xl bg-card px-6 py-12">
      <div className="flex max-w-[440px] flex-col items-center gap-4 text-center">
        <span className="flex size-24 items-center justify-center rounded-[36%] bg-brand-50 text-brand">
          <Icon name="lock" size={44} strokeWidth={1.8} />
        </span>
        <span className="font-heading text-[64px] leading-none font-bold text-choco">403</span>
        <h2 className="text-[26px] leading-[1.2]">You don’t have access to this</h2>
        <p className="text-ink-2">{message}</p>
        <Link href="/admin" className={buttonVariants()}>
          <Icon name="home" size={17} strokeWidth={1.8} />
          Back to dashboard
        </Link>
      </div>
    </section>
  );
}
