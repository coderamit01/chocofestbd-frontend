import { monogram, monogramTint } from "@/lib/monogram";
import { cn } from "@/lib/utils";

type MonoThumbProps = {
  item: { id: string; name: string; image: string | null };
  className?: string;
};

export function MonoThumb({ item, className }: MonoThumbProps) {
  return (
    <span
      className={cn(
        "flex flex-none items-center justify-center overflow-hidden rounded-[10px] bg-cover bg-center font-heading font-bold",
        className
      )}
      style={item.image ? { backgroundImage: `url("${item.image}")` } : monogramTint(item.id)}
    >
      {item.image ? null : monogram(item.name)}
    </span>
  );
}
