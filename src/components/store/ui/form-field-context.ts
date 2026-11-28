"use client";

import { createContext, use } from "react";

type FormFieldState = {
  id: string;
  describedBy?: string;
  invalid: boolean;
  valid: boolean;
  required: boolean;
};

type FieldControlProps = {
  id?: string;
  invalid?: boolean;
  valid?: boolean;
  required?: boolean;
  "aria-describedby"?: string;
};

export const FormFieldContext = createContext<FormFieldState | null>(null);

export function useFieldControl({ id, invalid, valid, required, "aria-describedby": describedBy }: FieldControlProps) {
  const field = use(FormFieldContext);
  const isInvalid = invalid ?? field?.invalid ?? false;
  return {
    id: id ?? field?.id,
    required: required ?? field?.required,
    "aria-invalid": isInvalid || undefined,
    "aria-describedby": [field?.describedBy, describedBy].filter(Boolean).join(" ") || undefined,
    "data-valid": (!isInvalid && (valid ?? field?.valid)) || undefined,
  };
}

export const FIELD_CONTROL_CLASS =
  "w-full rounded-[12px] border-[1.5px] border-[#e7e0da] bg-white px-3.5 py-3 font-sans text-sm leading-[1.5] font-normal text-ink outline-none transition-[border-color,box-shadow,background-color] duration-150 placeholder:text-ink-4 focus:border-brand focus:shadow-[0_0_0_4px_rgba(238,86,21,0.12)] disabled:cursor-not-allowed disabled:text-ink-4 data-valid:border-[#1f8a4c] aria-invalid:border-[#d92d20] aria-invalid:bg-[#fff8f7]";
