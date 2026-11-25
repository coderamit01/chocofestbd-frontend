"use client";

import { Icon, type IconName } from "@/components/shared/icon";
import { buttonVariants } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { AdminProduct } from "@/types/product";

export type ProductMenuAction = "edit" | "duplicate" | "archive" | "restore" | "trash";

type ProductRowMenuProps = {
  product: AdminProduct;
  canTrash: boolean;
  disabled?: boolean;
  onAction: (action: ProductMenuAction, product: AdminProduct) => void;
};

const itemClass =
  "gap-2.5 rounded-[9px] px-3 py-2.5 text-sm leading-[1.2] text-ink focus:bg-surface-2 focus:text-ink [&_svg]:size-[17px] [&_svg]:text-ink-3";

function MenuItem({ icon, label, danger, onClick }: { icon: IconName; label: string; danger?: boolean; onClick: () => void }) {
  return (
    <DropdownMenuItem
      onClick={onClick}
      className={cn(itemClass, danger && "text-danger focus:text-danger [&_svg]:text-danger")}
    >
      <Icon name={icon} strokeWidth={1.8} />
      {label}
    </DropdownMenuItem>
  );
}

export function ProductRowMenu({ product, canTrash, disabled, onAction }: ProductRowMenuProps) {
  const inTrash = !!product.deletedAt;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={disabled}
        aria-label={`More actions for ${product.name}`}
        className={buttonVariants({ variant: "square", size: "icon-md" })}
      >
        <Icon name="more" size={17} className="size-[17px]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={6} className="w-auto min-w-[190px] rounded-[14px] p-1.5 shadow-pop ring-0">
        {inTrash ? (
          <MenuItem icon="refresh" label="Restore" onClick={() => onAction("restore", product)} />
        ) : (
          <>
            <MenuItem icon="edit" label="Edit" onClick={() => onAction("edit", product)} />
            <MenuItem icon="copy" label="Duplicate" onClick={() => onAction("duplicate", product)} />
            <MenuItem icon="box" label="Archive / restore" onClick={() => onAction("archive", product)} />
            {canTrash && <MenuItem icon="trash" label="Move to trash" danger onClick={() => onAction("trash", product)} />}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
