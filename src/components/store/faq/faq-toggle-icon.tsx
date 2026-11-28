import { cn } from "cn";

const LINE =
  "before:absolute before:top-1/2 before:left-1/2 before:-mx-1.5 before:-my-px before:h-0.5 before:w-3 before:rounded-[2px] before:transition-transform before:duration-200 before:ease-[ease] before:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-mx-1.5 after:-my-px after:h-0.5 after:w-3 after:rounded-[2px] after:transition-transform after:duration-200 after:ease-[ease] after:content-['']";

export function FaqToggleIcon({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative size-7 flex-none rounded-full",
        LINE,
        open
          ? "bg-brand before:bg-white after:rotate-0 after:bg-white"
          : "bg-[#f6f3f0] before:bg-[#3f3531] after:rotate-90 after:bg-[#3f3531]",
      )}
    />
  );
}
