"use client";

import { useEffect, useRef, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Loader2Icon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { USER_VIEWS } from "@/config/users";
import { parseUserView } from "@/lib/user-query";
import { cn } from "@/lib/utils";

const SEARCH_DELAY_MS = 400;

export function UsersToolbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const searchTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const activeView = parseUserView(searchParams.get("view"));

  useEffect(() => () => clearTimeout(searchTimeout.current), []);

  const hrefWith = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => (value ? params.set(key, value) : params.delete(key)));
    params.delete("page");

    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  function handleSearchChange(value: string) {
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      startTransition(() => router.replace(hrefWith({ search: value.trim() || null }), { scroll: false }));
    }, SEARCH_DELAY_MS);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <nav aria-label="User views" className="inline-flex w-fit rounded-xl bg-muted p-1">
        {USER_VIEWS.map(({ value, label }) => (
          <Link
            key={value}
            href={hrefWith({ view: value === "all" ? null : value })}
            scroll={false}
            aria-current={activeView === value ? "page" : undefined}
            className={cn(
              "rounded-lg px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
              activeView === value && "bg-card text-foreground shadow-sm"
            )}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="relative w-full sm:w-72">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          aria-label="Search users"
          placeholder="Search name, email or phone"
          defaultValue={searchParams.get("search") ?? ""}
          onChange={(event) => handleSearchChange(event.target.value)}
          className="h-9 rounded-lg pr-9 pl-9"
        />
        {isPending && (
          <Loader2Icon className="absolute top-1/2 right-3 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
        )}
      </div>
    </div>
  );
}
