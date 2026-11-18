"use client";

import { useId, useState, type ComponentProps, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "cn";
import { Input } from "@/components/ui/input";

type AuthInputProps = ComponentProps<"input"> & {
  label: string;
  error?: string | null;
  endAdornment?: ReactNode;
};

export function AuthInput({ label, error, endAdornment, id, className, ...props }: AuthInputProps) {
  const errorId = useId();

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <Input
          id={id}
          placeholder={label}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "h-13 rounded-xl border-input bg-off-white px-5 text-[15px] text-foreground md:text-[15px]",
            "placeholder:text-muted-foreground/80 focus-visible:border-secondary focus-visible:ring-secondary/20",
            endAdornment && "pr-14",
            className
          )}
          {...props}
        />
        {endAdornment && <div className="absolute top-1/2 right-4 -translate-y-1/2">{endAdornment}</div>}
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 px-1 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function PasswordInput(props: Omit<AuthInputProps, "type" | "endAdornment">) {
  const [isVisible, setIsVisible] = useState(false);
  const Icon = isVisible ? Eye : EyeOff;

  return (
    <AuthInput
      type={isVisible ? "text" : "password"}
      endAdornment={
        <button
          type="button"
          onClick={() => setIsVisible((visible) => !visible)}
          aria-label={isVisible ? "Hide password" : "Show password"}
          className="flex rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:outline-none"
        >
          <Icon className="size-5" />
        </button>
      }
      {...props}
    />
  );
}
