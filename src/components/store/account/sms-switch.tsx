"use client";

import { useState } from "react";
import { cn } from "cn";

type SmsSwitchProps = {
  title: string;
  description: string;
  defaultChecked?: boolean;
};

export function SmsSwitch({ title, description, defaultChecked = false }: SmsSwitchProps) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => setChecked((value) => !value)}
      className="flex w-full items-center justify-between gap-2.5 border-0 bg-transparent px-2 py-2.5 text-ink"
    >
      <span className="flex flex-col gap-0.5 text-left">
        <b className="font-sans text-[13.5px] leading-[1.2] font-medium">{title}</b>
        <small className="text-[11.5px] text-[#8a7f79]">{description}</small>
      </span>
      <span
        className={cn(
          "relative inline-flex h-6 w-[42px] flex-none items-center rounded-full bg-[#e2dad4] transition-[background-color] duration-200",
          checked && "bg-brand",
        )}
      >
        <i
          className={cn(
            "absolute top-[3px] left-[3px] size-[18px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.25)] transition-transform duration-200",
            checked && "translate-x-[18px]",
          )}
        />
      </span>
    </button>
  );
}
