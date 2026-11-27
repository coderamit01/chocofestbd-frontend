import { cn } from "cn";

type ProductThumbProps = {
  color: string;
  className?: string;
};

export function ProductThumb({ color, className }: ProductThumbProps) {
  return (
    <span
      style={{ backgroundColor: `${color}1f`, color }}
      className={cn("flex size-12 flex-none items-center justify-center rounded-[12px]", className)}
    >
      <svg viewBox="0 0 40 40" width="28" height="28" aria-hidden="true">
        <rect x="8" y="6" width="24" height="28" rx="4" fill="#4a1607" />
        <g fill="#6b2a12">
          <rect x="11" y="9" width="8" height="7" rx="1.5" />
          <rect x="21" y="9" width="8" height="7" rx="1.5" />
          <rect x="11" y="18" width="8" height="7" rx="1.5" />
          <rect x="21" y="18" width="8" height="7" rx="1.5" />
        </g>
        <rect x="7" y="24" width="26" height="11" rx="3" fill="currentColor" />
      </svg>
    </span>
  );
}
