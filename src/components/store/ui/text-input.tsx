"use client";

import type { ComponentProps, ReactNode } from "react";
import { cn } from "cn";
import { Icon, type IconName } from "@/components/shared/icon";
import { FIELD_CONTROL_CLASS, useFieldControl } from "./form-field-context";

type TextInputProps = ComponentProps<"input"> & {
  invalid?: boolean;
  valid?: boolean;
  icon?: IconName;
  leading?: ReactNode;
};

export function TextInput({
  id,
  invalid,
  valid,
  required,
  icon,
  leading,
  className,
  "aria-describedby": describedBy,
  ...props
}: TextInputProps) {
  const control = useFieldControl({ id, invalid, valid, required, "aria-describedby": describedBy });
  const input = (
    <input
      {...control}
      className={cn(FIELD_CONTROL_CLASS, "h-[50px]", icon && "pl-[42px]", leading && "pl-14", className)}
      {...props}
    />
  );

  if (!icon && !leading) return input;

  return (
    <div className="relative w-full">
      {icon && (
        <Icon
          name={icon}
          size={18}
          strokeWidth={1.8}
          className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-ink-3"
        />
      )}
      {leading && (
        <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 border-r border-[#e7e0da] pr-2.5 font-sans text-[15px] leading-4 font-semibold text-[#8a7f79]">
          {leading}
        </span>
      )}
      {input}
    </div>
  );
}
