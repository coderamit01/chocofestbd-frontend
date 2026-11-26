import { Icon, type IconName } from "@/components/shared/icon";
import { SelectMenu } from "@/components/shared/select-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProductRef } from "@/types/product";

const raised = "shadow-[0_1px_2px_rgb(34_21_16/6%)]";
const actionClass = cn(buttonVariants({ variant: "ghost", size: "sm" }), "bg-surface text-ink hover:bg-surface hover:text-ink", raised);

type BulkAction = { icon: IconName; label: string; danger?: boolean; onClick: () => void };

type ProductBulkBarProps = {
  count: number;
  disabled: boolean;
  showActions: boolean;
  canTrash: boolean;
  categories: ProductRef[];
  onClear: () => void;
  onActivate: () => void;
  onArchive: () => void;
  onFeature: () => void;
  onCategory: (category: ProductRef) => void;
  onTrash: () => void;
};

export function ProductBulkBar({
  count,
  disabled,
  showActions,
  canTrash,
  categories,
  onClear,
  onActivate,
  onArchive,
  onFeature,
  onCategory,
  onTrash,
}: ProductBulkBarProps) {
  const actions: BulkAction[] = [
    { icon: "check", label: "Activate", onClick: onActivate },
    { icon: "box", label: "Archive", onClick: onArchive },
    { icon: "brands", label: "Set featured", onClick: onFeature },
  ];

  const renderAction = ({ icon, label, danger, onClick }: BulkAction) => (
    <button key={label} type="button" disabled={disabled} onClick={onClick} className={cn(actionClass, danger && "text-danger hover:text-danger")}>
      <Icon name={icon} size={17} strokeWidth={1.8} className="size-[17px]" />
      {label}
    </button>
  );

  return (
    <div
      role="toolbar"
      aria-label="Bulk actions"
      className="flex flex-wrap items-center gap-3 rounded-[14px] bg-brand-50 py-2.5 pr-2.5 pl-3 shadow-[inset_0_0_0_1px_var(--brand-200)]"
    >
      <span className="flex items-center gap-2.5">
        <span className="flex size-6.5 items-center justify-center rounded-sm bg-brand text-white">
          <Icon name="check" size={15} strokeWidth={3} />
        </span>
        <span className="font-semibold text-ink">{count} selected</span>
      </span>
      <span aria-hidden="true" className="h-5 w-px bg-brand-200" />
      <Button variant="link" size="sm" onClick={onClear}>
        Clear selection
      </Button>
      <span className="flex-1" />
      {showActions && (
        <div className="flex flex-wrap items-center gap-2">
          {actions.map(renderAction)}
          <SelectMenu
            ariaLabel="Move to category"
            size="sm"
            value=""
            disabled={disabled}
            onChange={(id) => {
              const category = categories.find((item) => item.id === id);
              if (category) onCategory(category);
            }}
            triggerClassName={cn("h-[34px] bg-surface disabled:opacity-45", raised)}
            options={[{ value: "", label: "Change category…" }, ...categories.map((category) => ({ value: category.id, label: category.name }))]}
          />
          {canTrash && renderAction({ icon: "trash", label: "Delete", danger: true, onClick: onTrash })}
        </div>
      )}
    </div>
  );
}
