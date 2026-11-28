import type { HTMLAttributes } from "react";
import { cn } from "cn";
import { PageContainer } from "@/components/store/ui/page-container";

export function HomeSection({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <PageContainer as="section" className={cn("mt-11 max-[900px]:mt-[30px]", className)} {...props} />;
}
