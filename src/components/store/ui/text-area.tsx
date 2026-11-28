"use client";

import type { ComponentProps } from "react";
import { cn } from "cn";
import { FIELD_CONTROL_CLASS, useFieldControl } from "./form-field-context";

type TextAreaProps = ComponentProps<"textarea"> & {
  invalid?: boolean;
  valid?: boolean;
};

export function TextArea({
  id,
  invalid,
  valid,
  required,
  rows = 3,
  className,
  "aria-describedby": describedBy,
  ...props
}: TextAreaProps) {
  const control = useFieldControl({ id, invalid, valid, required, "aria-describedby": describedBy });
  return <textarea {...control} rows={rows} className={cn(FIELD_CONTROL_CLASS, "h-auto resize-y", className)} {...props} />;
}
