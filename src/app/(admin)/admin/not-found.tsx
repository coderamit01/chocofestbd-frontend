import Link from "next/link";
import { BoxesIcon, LayoutDashboardIcon, SearchXIcon, ShoppingBagIcon, UsersIcon } from "lucide-react";
import { GoBackButton } from "@/components/shared/go-back-button";
import { buttonVariants } from "@/components/ui/button";

const QUICK_LINKS = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboardIcon },
  { title: "Orders", url: "/admin/orders", icon: ShoppingBagIcon },
  { title: "Products", url: "/admin/products", icon: BoxesIcon },
  { title: "Users", url: "/admin/users", icon: UsersIcon },
];

export default function AdminNotFound() {
  return (
    <section className="relative flex flex-1 items-center justify-center overflow-hidden rounded-2xl border border-border bg-card px-6 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-secondary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -left-20 size-80 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative flex max-w-lg flex-col items-center text-center">
        <div className="relative mb-6">
          <span className="bg-linear-to-br from-primary to-secondary bg-clip-text font-heading text-[7rem] leading-none font-bold tracking-tight text-transparent sm:text-[9rem]">
            404
          </span>
          <span className="absolute -right-3 bottom-3 flex size-12 items-center justify-center rounded-2xl border border-border bg-accent text-accent-foreground shadow-sm sm:size-14">
            <SearchXIcon className="size-6 sm:size-7" />
          </span>
        </div>

        <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          The page you&apos;re looking for doesn&apos;t exist, was moved, or you don&apos;t have access to it.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/admin" className={buttonVariants({ size: "lg", className: "px-5" })}>
            <LayoutDashboardIcon data-icon="inline-start" />
            Back to Dashboard
          </Link>
          <GoBackButton className="px-5" />
        </div>

        <div className="mt-12 w-full border-t border-border pt-6">
          <p className="mb-4 text-xs font-medium tracking-wider text-muted-foreground uppercase">
            Or jump to
          </p>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {QUICK_LINKS.map(({ title, url, icon: Icon }) => (
              <li key={url}>
                <Link
                  href={url}
                  className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background px-3 py-4 text-sm text-foreground transition-colors hover:border-secondary/40 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  <Icon className="size-5 text-secondary" />
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
