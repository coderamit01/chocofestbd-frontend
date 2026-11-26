import { cn } from "cn"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("skel rounded-[6px]", className)}
      {...props}
    />
  )
}

export { Skeleton }
