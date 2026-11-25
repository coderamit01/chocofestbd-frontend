import type { ReactNode } from "react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";

type AuthSubmitButtonProps = {
  isPending: boolean;
  pendingLabel: string;
  children: ReactNode;
  className?: string;
};

export function AuthSubmitButton({ isPending, pendingLabel, children, className }: AuthSubmitButtonProps) {
  return (
    <Button
      type="submit"
      size="lg"
      disabled={isPending}
      aria-busy={isPending}
      className={cn("h-13 w-full", className)}
    >
      {isPending ? pendingLabel : children}
    </Button>
  );
}
