import { Icon } from "@/components/shared/icon";
import { ToggleSwitch } from "@/components/shared/toggle-switch";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import type { Banner } from "@/types/banner";

type BannerCardProps = {
  banner: Banner;
  position: number;
  height: number;
  isFirst: boolean;
  isLast: boolean;
  canDelete: boolean;
  isPending: boolean;
  onMove: (direction: -1 | 1) => void;
  onToggle: (isActive: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function BannerCard({ banner, position, height, isFirst, isLast, canDelete, isPending, onMove, onToggle, onEdit, onDelete }: BannerCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-surface-2">
      <div
        role="img"
        aria-label={banner.title}
        className="relative flex items-center bg-surface-3 bg-cover bg-center p-6"
        style={{ height, backgroundImage: `url("${banner.image}")` }}
      >
        <Badge size="sm" className="absolute top-3 left-3 bg-white/90 text-ink">
          #{position}
        </Badge>
        {!banner.isActive && (
          <Badge size="sm" variant="neutral" className="absolute top-3 right-3">
            Hidden
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-2.5 px-4 py-3.5">
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="font-medium">{banner.title}</span>
          <span className="truncate text-xs text-ink-3">
            <Icon name="link" size={12} strokeWidth={1.8} className="inline align-[-1px]" /> {banner.link || "No link"}
          </span>
        </span>
        <ToggleSwitch ariaLabel={`Active: ${banner.title}`} checked={banner.isActive} disabled={isPending} onChange={onToggle} />
      </div>
      <div className="flex items-center gap-1.5 px-4 pb-4">
        <button
          type="button"
          aria-label="Move earlier"
          disabled={isFirst || isPending}
          onClick={() => onMove(-1)}
          className={buttonVariants({ variant: "square", size: "icon-md" })}
        >
          <Icon name="chevronLeft" size={16} strokeWidth={1.8} />
        </button>
        <button
          type="button"
          aria-label="Move later"
          disabled={isLast || isPending}
          onClick={() => onMove(1)}
          className={buttonVariants({ variant: "square", size: "icon-md" })}
        >
          <Icon name="chevronRight" size={16} strokeWidth={1.8} />
        </button>
        <span className="flex-1" />
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Icon name="edit" size={15} strokeWidth={1.8} className="size-[15px]" />
          Edit
        </Button>
        {canDelete && (
          <button
            type="button"
            aria-label={`Delete ${banner.title}`}
            disabled={isPending}
            onClick={onDelete}
            className={buttonVariants({ variant: "square", size: "icon-md" })}
          >
            <Icon name="trash" size={16} strokeWidth={1.8} />
          </button>
        )}
      </div>
    </article>
  );
}
