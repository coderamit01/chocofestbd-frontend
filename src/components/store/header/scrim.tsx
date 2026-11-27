import { cn } from "cn";

type ScrimProps = {
  onClick: () => void;
  className?: string;
};

export function Scrim({ onClick, className }: ScrimProps) {
  return (
    <div
      aria-hidden="true"
      onClick={onClick}
      className={cn("fixed inset-0 z-50 animate-fade bg-[rgba(34,21,16,0.35)]", className)}
    />
  );
}
