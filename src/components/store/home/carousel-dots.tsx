import { cn } from "cn";

type CarouselDotsProps = {
  count: number;
  active: number;
  label: (index: number) => string;
  onSelect: (index: number) => void;
};

export function CarouselDots({ count, active, label, onSelect }: CarouselDotsProps) {
  return (
    <div className="mt-4 flex justify-center gap-1.5">
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          aria-label={label(index)}
          aria-current={index === active || undefined}
          onClick={() => onSelect(index)}
          className={cn(
            "h-2 w-2 cursor-pointer rounded-full border-0 bg-[#d9cfc8] p-0 transition-[width,background-color] duration-250 ease-[ease]",
            index === active && "w-6 bg-brand",
          )}
        />
      ))}
    </div>
  );
}
