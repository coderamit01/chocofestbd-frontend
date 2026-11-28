import { cn } from "cn";
import { Icon } from "@/components/shared/icon";
import { TextLink } from "@/components/store/ui/text-link";

type FreeDeliveryBarProps = {
  message: string;
  progress: number;
  done: boolean;
  showLink: boolean;
};

export function FreeDeliveryBar({ message, progress, done, showLink }: FreeDeliveryBarProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3.5 rounded-[18px] border px-[18px] py-3.5 max-[900px]:gap-2.5 max-[900px]:p-3",
        done ? "border-[#bfe6cc] bg-[#e6f6ec]" : "border-[#f0ebe6] bg-white",
      )}
    >
      <span
        className={cn(
          "flex size-[42px] flex-none items-center justify-center rounded-[12px] max-[900px]:size-9",
          done ? "bg-[#1f8a4c] text-white" : "bg-brand-50 text-brand",
        )}
      >
        <Icon name="truck" size={20} strokeWidth={1.8} />
      </span>
      <span className="flex flex-1 flex-col gap-1.5">
        <span className="text-sm font-medium max-[900px]:text-[12.5px]">{message}</span>
        <span className="h-2 overflow-hidden rounded-[9px] bg-[#f0ebe6]">
          <i
            style={{ width: `${progress}%` }}
            className={cn(
              "block h-full rounded-[9px] transition-[width] duration-400",
              done ? "bg-[#1f8a4c]" : "bg-[linear-gradient(90deg,#ffb487,#ee5615)]",
            )}
          />
        </span>
      </span>
      {showLink && <TextLink href="/shop">Add items</TextLink>}
    </div>
  );
}
