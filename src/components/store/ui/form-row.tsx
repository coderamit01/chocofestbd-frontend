import type { HTMLAttributes } from "react";
import { cn } from "cn";

export function FormRow({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid grid-cols-2 gap-3.5 max-[900px]:grid-cols-1", className)} {...props} />;
}
