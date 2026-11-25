import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { STATUS_BADGES, type StatusKind, type StatusOf } from "@/config/status-badges";

type StatusBadgeProps<K extends StatusKind> = {
  kind: K;
  status: StatusOf<K>;
  size?: "default" | "sm";
  className?: string;
};

export function StatusBadge<K extends StatusKind>({ kind, status, size, className }: StatusBadgeProps<K>) {
  const map: Record<PropertyKey, { label: string; variant: BadgeVariant }> = STATUS_BADGES[kind];
  const { label, variant } = map[status];

  return (
    <Badge variant={variant} size={size} className={className}>
      {label}
    </Badge>
  );
}
