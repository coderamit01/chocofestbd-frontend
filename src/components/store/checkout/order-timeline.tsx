import { cn } from "cn";
import type { OrderTimelineStep } from "@/types/store-cart";

const STATES = {
  done: {
    item: "before:bg-[#1f8a4c]",
    dot: "border-[#1f8a4c] bg-[#1f8a4c]",
    title: "text-ink",
    note: "text-[#a69b95]",
  },
  now: {
    item: "before:bg-[#ece5df]",
    dot: "border-[5px] border-brand bg-white shadow-[0_0_0_5px_rgba(238,86,21,0.15)]",
    title: "text-ink",
    note: "text-brand-text",
  },
  todo: {
    item: "before:bg-[#ece5df]",
    dot: "border-[#d6cdc6] bg-white",
    title: "text-[#8a7f79]",
    note: "text-[#a69b95]",
  },
};

export function OrderTimeline({ steps }: { steps: OrderTimelineStep[] }) {
  return (
    <ol className="m-0 flex list-none flex-col p-0">
      {steps.map((step) => (
        <li
          key={step.title}
          className={cn(
            "relative flex gap-3.5 pb-5 not-last:before:absolute not-last:before:top-5 not-last:before:bottom-0 not-last:before:left-2 not-last:before:w-0.5 not-last:before:content-['']",
            STATES[step.state].item,
          )}
        >
          <span
            className={cn("mt-0.5 box-border size-[18px] flex-none rounded-full border-2", STATES[step.state].dot)}
          />
          <span className="flex flex-col gap-0.5">
            <b className={cn("text-sm font-semibold", STATES[step.state].title)}>{step.title}</b>
            <small className={cn("text-[12.5px]", STATES[step.state].note)}>{step.description}</small>
          </span>
        </li>
      ))}
    </ol>
  );
}
