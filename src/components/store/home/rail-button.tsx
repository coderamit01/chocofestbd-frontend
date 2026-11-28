import { Icon } from "@/components/shared/icon";

type RailButtonProps = {
  direction: "prev" | "next";
  label: string;
  onClick: () => void;
};

export function RailButton({ direction, label, onClick }: RailButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-[#e7e0da] bg-white text-[#3f3531] hover:border-brand hover:text-brand max-[900px]:hidden"
    >
      <Icon name={direction === "prev" ? "chevronLeft" : "chevronRight"} size={18} strokeWidth={1.8} />
    </button>
  );
}
