"use client";

import { useState, type ComponentProps } from "react";
import { Icon } from "@/components/shared/icon";
import { AuthField } from "./auth-field";

type PasswordFieldProps = Omit<ComponentProps<typeof AuthField>, "type" | "trailing">;

export function PasswordField(props: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const label = visible ? "Hide password" : "Show password";

  return (
    <AuthField
      {...props}
      type={visible ? "text" : "password"}
      trailing={
        <button
          type="button"
          aria-label={label}
          title={label}
          onClick={() => setVisible((value) => !value)}
          className="mr-1.5 flex size-10 flex-none cursor-pointer items-center justify-center rounded-[10px] border-0 bg-transparent text-[#9b908a] outline-none hover:bg-[#ebe6e2] hover:text-ink focus-visible:shadow-focus"
        >
          <Icon name={visible ? "eyeOff" : "eyeOpen"} size={18} strokeWidth={1.9} />
        </button>
      }
    />
  );
}
