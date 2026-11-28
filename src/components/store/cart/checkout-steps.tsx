import { Fragment } from "react";
import { cn } from "cn";
import { Icon } from "@/components/shared/icon";

const STEPS = ["Cart", "Checkout", "Done"];

const STEP_STATE = {
  ok: {
    root: "text-[#1f8a4c]",
    dot: "border-[#1f8a4c] bg-[#1f8a4c] text-white",
  },
  on: {
    root: "font-semibold text-ink",
    dot: "border-brand bg-brand text-white shadow-[0_0_0_4px_rgba(238,86,21,0.15)]",
  },
  todo: {
    root: "text-[#a69b95]",
    dot: "border-[#ddd3cc] bg-white",
  },
};

type CheckoutStepsProps = {
  current: number;
  className?: string;
};

export function CheckoutSteps({ current, className }: CheckoutStepsProps) {
  return (
    <div
      aria-label="Checkout progress"
      className={cn("flex items-center gap-2.5 max-[900px]:w-full max-[900px]:justify-between", className)}
    >
      {STEPS.map((label, index) => {
        const state = index < current ? "ok" : index === current ? "on" : "todo";
        return (
          <Fragment key={label}>
            {index > 0 && <span className="h-0.5 w-11 rounded-xs bg-[#e2dad4] max-[900px]:w-auto max-[900px]:flex-1" />}
            <span
              aria-current={state === "on" ? "step" : undefined}
              className={cn(
                "inline-flex items-center gap-2 font-sans text-[13.5px] leading-none font-medium max-[900px]:text-xs",
                STEP_STATE[state].root,
              )}
            >
              <i
                className={cn(
                  "flex size-7 items-center justify-center rounded-full border-[1.5px] text-[12.5px] font-semibold not-italic max-[900px]:size-6",
                  STEP_STATE[state].dot,
                )}
              >
                {state === "ok" ? <Icon name="check" size={13} strokeWidth={1.8} /> : index + 1}
              </i>
              {label}
            </span>
          </Fragment>
        );
      })}
    </div>
  );
}
