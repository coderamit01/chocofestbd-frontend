import type { ReactNode } from "react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/shared/spinner";

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
      aria-busy={isPending || undefined}
      className={cn("h-13 w-full text-[15px] disabled:opacity-85", className)}
    >
      {isPending && <Spinner />}
      {isPending ? pendingLabel : children}
    </Button>
  );
}
