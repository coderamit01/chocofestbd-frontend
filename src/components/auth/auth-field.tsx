import type { ComponentProps, ReactNode } from "react";
import { authStyles } from "@/lib/auth-styles";
import { AuthFieldError } from "./auth-field-error";

type AuthFieldProps = ComponentProps<"input"> & {
  id: string;
  label: string;
  error?: string;
  trailing?: ReactNode;
};

export function AuthField({ id, label, error, trailing, ...inputProps }: AuthFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className={authStyles.field}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className={authStyles.input}>
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={authStyles.control}
          {...inputProps}
        />
        {trailing}
      </div>
      <AuthFieldError id={errorId} message={error} />
    </div>
  );
}
