import { cn } from "cn";
import { Icon } from "@/components/shared/icon";

type CategoryArrowProps = { direction: "left" | "right"; onClick: () => void };

export function CategoryArrow({ direction, onClick }: CategoryArrowProps) {
  const isLeft = direction === "left";

  return (
    <button
      type="button"
      aria-label={isLeft ? "Scroll categories left" : "Scroll categories right"}
      onClick={onClick}
      className={cn(
        "absolute top-[calc(50%-38px)] z-2 flex size-[42px] cursor-pointer items-center justify-center rounded-full border border-[#ece5df] bg-white text-ink shadow-[0_6px_16px_rgba(34,21,16,.12)] hover:border-brand hover:text-brand max-[900px]:hidden",
        isLeft ? "-left-5" : "-right-5",
      )}
    >
      <Icon name={isLeft ? "arrowLeft" : "arrowRight"} size={18} strokeWidth={1.8} />
    </button>
  );
}
