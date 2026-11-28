"use client";

import { useId, type ReactNode } from "react";
import { cn } from "cn";
import { Icon } from "@/components/shared/icon";
import { FormFieldContext } from "./form-field-context";

type FormFieldProps = {
  label: ReactNode;
  children: ReactNode;
  id?: string;
  error?: ReactNode;
  hint?: ReactNode;
  required?: boolean;
  optional?: boolean;
  valid?: boolean;
  className?: string;
};

export function FormField({ label, children, id, error, hint, required, optional, valid, className }: FormFieldProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const errorId = `${fieldId}-error`;
  const hintId = `${fieldId}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-1.5 font-sans text-[13px] font-medium text-[#3f3531]", className)}>
      <label htmlFor={fieldId} className="flex items-baseline">
        {label}
        {required && <i className="ml-0.5 text-xs font-normal text-brand not-italic">*</i>}
        {optional && <i className="ml-1.5 text-xs font-normal text-[#a69b95] not-italic">optional</i>}
      </label>
      <FormFieldContext
        value={{ id: fieldId, describedBy, invalid: Boolean(error), valid: Boolean(valid), required: Boolean(required) }}
      >
        {children}
      </FormFieldContext>
      {error && (
        <small id={errorId} role="alert" className="flex items-center gap-[5px] text-xs font-normal text-[#d92d20]">
          <Icon name="alert" size={13} strokeWidth={1.8} className="flex-none" />
          {error}
        </small>
      )}
      {hint && (
        <small id={hintId} className="text-[11.5px] font-normal text-[#a69b95]">
          {hint}
        </small>
      )}
    </div>
  );
}
