import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden border border-transparent leading-none font-medium whitespace-nowrap transition-colors focus-visible:ring-3 focus-visible:ring-brand/20 [&>svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-brand text-white",
        dark: "bg-choco text-white",
        brand: "bg-brand-50 text-brand-text",
        success: "bg-success-soft text-success",
        warning: "bg-warning-soft text-warning",
        danger: "bg-danger-soft text-danger",
        info: "bg-info-soft text-info",
        processing: "bg-processing-soft text-processing",
        packed: "bg-packed-soft text-packed",
        shipped: "bg-shipped-soft text-shipped",
        neutral: "bg-neutral-soft text-neutral",
        lavender: "bg-lavender-soft text-lavender",
        outline: "border-line-2 bg-surface text-ink-2",
      },
      size: {
        default: "h-[26px] gap-1.5 rounded-[7px] px-2.5 text-[12.5px] [&>svg]:size-[13px]",
        sm: "h-[22px] gap-1 rounded-[6px] px-2 text-[11.5px] [&>svg]:size-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>

function Badge({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, size }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants, type BadgeVariant }
