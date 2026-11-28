import { cn } from "cn";
import { StoreCard } from "@/components/store/ui/store-card";
import { StoreCardTitle } from "@/components/store/ui/store-card-title";
import type { TrackStepState, TrackUpdate } from "@/types/store-order";

const DOT_STATES: Record<TrackStepState, string> = {
  done: "border-[#1f8a4c] bg-[#1f8a4c]",
  now: "border-[5px] border-brand shadow-[0_0_0_5px_rgba(238,86,21,0.15)]",
  next: "",
};

function TrackUpdateItem({ update }: { update: TrackUpdate }) {
  const reached = update.state !== "next";

  return (
    <li
      className={cn(
        "relative flex gap-3.5 pb-5 not-last:before:absolute not-last:before:top-5 not-last:before:bottom-0 not-last:before:left-2 not-last:before:w-0.5 not-last:before:bg-[#ece5df] not-last:before:content-['']",
        update.state === "done" && "not-last:before:bg-[#1f8a4c]",
      )}
    >
      <span
        className={cn(
          "mt-0.5 box-border size-[18px] flex-none rounded-full border-2 border-[#d6cdc6] bg-white",
          DOT_STATES[update.state],
        )}
      />
      <span className="flex flex-col gap-0.5">
        <b className={cn("text-sm font-semibold", reached ? "text-ink" : "text-[#8a7f79]")}>{update.title}</b>
        <small className={cn("text-[12.5px]", update.state === "now" ? "text-brand-text" : "text-[#a69b95]")}>
          {update.detail}
        </small>
      </span>
    </li>
  );
}

export function TrackUpdates({ updates }: { updates: TrackUpdate[] }) {
  return (
    <StoreCard as="section">
      <StoreCardTitle as="h3" size="sm">
        Updates
      </StoreCardTitle>
      <ol className="m-0 flex list-none flex-col p-0">
        {updates.map((update) => (
          <TrackUpdateItem key={update.title} update={update} />
        ))}
      </ol>
    </StoreCard>
  );
}
