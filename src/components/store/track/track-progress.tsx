import { cn } from "cn";
import { Icon } from "@/components/shared/icon";
import type { TrackStage, TrackStepState } from "@/types/store-order";

const DOT_STATES: Record<TrackStepState, string> = {
  done: "border-[#1f8a4c] bg-[#1f8a4c] text-white",
  now: "animate-track-pulse border-brand bg-brand text-white shadow-[0_0_0_6px_rgba(238,86,21,0.18)]",
  next: "border-[#e2dad4] bg-white text-[#b4aaa4]",
};

function TrackStageItem({ stage }: { stage: TrackStage }) {
  const reached = stage.state !== "next";

  return (
    <li
      aria-current={stage.state === "now" ? "step" : undefined}
      className={cn(
        "relative flex flex-col items-center gap-1 text-center before:absolute before:top-[19px] before:right-1/2 before:-left-1/2 before:z-0 before:h-[3px] before:bg-[#ece5df] before:content-[''] first:before:hidden",
        "max-[900px]:flex-row max-[900px]:gap-3 max-[900px]:pb-3.5 max-[900px]:text-left max-[900px]:before:-top-3.5 max-[900px]:before:right-auto max-[900px]:before:bottom-auto max-[900px]:before:left-[19px] max-[900px]:before:h-7 max-[900px]:before:w-[3px]",
        reached && "before:bg-[#1f8a4c]",
      )}
    >
      <span
        className={cn(
          "relative z-[1] mb-1.5 flex size-10 items-center justify-center rounded-full border-2 max-[900px]:m-0 max-[900px]:flex-none",
          DOT_STATES[stage.state],
        )}
      >
        <Icon name={stage.icon} size={16} strokeWidth={1.8} />
      </span>
      <b className={cn("text-[13px]", reached ? "text-ink" : "text-[#8a7f79]")}>{stage.title}</b>
      <small className="text-[11.5px] text-[#a69b95] max-[900px]:ml-auto">{stage.time}</small>
    </li>
  );
}

export function TrackProgress({ stages }: { stages: TrackStage[] }) {
  return (
    <ol
      aria-label="Delivery progress"
      className="m-0 mt-6 grid list-none grid-cols-5 p-0 max-[900px]:mt-4 max-[900px]:grid-cols-1 max-[900px]:gap-0"
    >
      {stages.map((stage) => (
        <TrackStageItem key={stage.title} stage={stage} />
      ))}
    </ol>
  );
}
