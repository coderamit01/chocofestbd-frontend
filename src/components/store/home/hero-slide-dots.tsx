import { cn } from "cn";

type HeroSlideDotsProps = { count: number; active: number; onSelect: (index: number) => void };

export function HeroSlideDots({ count, active, onSelect }: HeroSlideDotsProps) {
  return (
    <div className="absolute bottom-4 left-1/2 z-2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/28 px-2 py-1.5 backdrop-blur-[6px] max-[900px]:bottom-2.5">
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Banner ${index + 1}`}
          onClick={() => onSelect(index)}
          className={cn(
            "h-2 w-2 cursor-pointer rounded-full border-0 bg-white/55 p-0 transition-[width,background-color] duration-250 ease-[ease]",
            index === active && "w-6 bg-white",
          )}
        />
      ))}
    </div>
  );
}
