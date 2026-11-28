"use client";

import { useState, type KeyboardEvent } from "react";

type PriceBoxProps = {
  label: string;
  ariaLabel: string;
  value: number;
  limit: number;
  step: number;
  onCommit: (value: number) => void;
};

export function PriceBox({ label, ariaLabel, value, limit, step, onCommit }: PriceBoxProps) {
  const [text, setText] = useState(String(value));

  const commit = () => {
    const parsed = Number.parseInt(text, 10) || 0;
    onCommit(parsed);
    setText(String(value));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") event.currentTarget.blur();
  };

  return (
    <label className="relative flex h-11 min-w-0 flex-1 items-center gap-1 rounded-[12px] border border-[#e8ddd6] bg-white px-2.5 focus-within:border-brand focus-within:shadow-[0_0_0_3px_rgba(238,86,21,0.15)]">
      <small className="absolute -top-2 left-[9px] bg-white px-1 font-sans text-[11px] leading-4 text-[#8a7f79]">
        {label}
      </small>
      <span className="font-sans text-[14px] text-[#8a7f79]">৳</span>
      <input
        type="number"
        min={0}
        max={limit}
        step={step}
        value={text}
        aria-label={ariaLabel}
        onChange={(event) => setText(event.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
        className="min-w-0 flex-1 [appearance:textfield] border-0 bg-transparent font-sans text-[14px] font-semibold text-ink outline-0 focus-visible:shadow-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0"
      />
    </label>
  );
}
