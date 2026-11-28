import type { ComponentProps } from "react";
import { cn } from "cn";

export function HomeSection({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cn("mx-auto mt-11 w-full max-w-[1320px] px-6 max-[900px]:mt-[30px] max-[900px]:px-3.5", className)}
      {...props}
    />
  );
}
