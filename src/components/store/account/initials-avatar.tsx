import { cn } from "cn";

type InitialsAvatarProps = {
  initials: string;
  className?: string;
};

export function InitialsAvatar({ initials, className }: InitialsAvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-9 flex-none items-center justify-center rounded-full font-heading text-[13px] leading-none font-semibold text-white",
        className,
      )}
    >
      {initials}
    </span>
  );
}
