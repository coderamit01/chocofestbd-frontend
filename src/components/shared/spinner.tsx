import { cn } from "@/lib/utils";

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("size-[15px] flex-none animate-[spin_0.7s_linear_infinite] rounded-full border-2 border-current border-r-transparent", className)}
    />
  );
}
