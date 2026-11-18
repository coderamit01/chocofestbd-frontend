"use client";

import { useState, type ComponentProps } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "cn";
import { Input } from "@/components/ui/input";

type AuthInputProps = ComponentProps<"input"> & {
  label: string;
};

export function AuthInput({ label, id, className, ...props }: AuthInputProps) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Input
        id={id}
        placeholder={label}
        className={cn(
          "h-13 rounded-xl border-transparent bg-off-white px-5 text-[15px] text-foreground md:text-[15px]",
          "placeholder:text-muted-foreground/80 focus-visible:border-secondary focus-visible:ring-secondary/20",
          className
        )}
        {...props}
      />
    </div>
  );
}

export function PasswordInput(props: Omit<AuthInputProps, "type">) {
  const [isVisible, setIsVisible] = useState(false);
  const Icon = isVisible ? Eye : EyeOff;

  return (
    <div className="relative">
      <AuthInput type={isVisible ? "text" : "password"} className="pr-14" {...props} />
      <button
        type="button"
        onClick={() => setIsVisible((visible) => !visible)}
        aria-label={isVisible ? "Hide password" : "Show password"}
        className="absolute top-1/2 right-4 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:outline-none"
      >
        <Icon className="size-5" />
      </button>
    </div>
  );
}
