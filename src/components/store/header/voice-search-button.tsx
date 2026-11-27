import { cn } from "cn";
import { Icon } from "@/components/shared/icon";

type VoiceSearchButtonProps = {
  listening: boolean;
  onClick: () => void;
};

export function VoiceSearchButton({ listening, onClick }: VoiceSearchButtonProps) {
  const label = listening ? "Stop voice search" : "Search by voice";
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={listening}
      title={label}
      onClick={onClick}
      className={cn(
        "relative mr-1 flex size-10 flex-none items-center justify-center rounded-[11px] transition-colors duration-150",
        listening ? "bg-brand text-white" : "text-[#8a7f79] hover:bg-brand-50 hover:text-brand",
      )}
    >
      <Icon name="mic" size={20} strokeWidth={1.9} />
      <span
        aria-hidden="true"
        className={cn("pointer-events-none absolute inset-0 rounded-[11px]", listening && "animate-mic-pulse")}
      />
    </button>
  );
}
