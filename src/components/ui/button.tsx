import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariantClasses = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-transparent bg-clip-padding text-sm leading-none font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-3 focus-visible:ring-brand/20 disabled:pointer-events-none disabled:opacity-45 aria-busy:pointer-events-none aria-busy:opacity-85 aria-invalid:border-danger aria-invalid:ring-3 aria-invalid:ring-danger/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[17px]",
  {
    variants: {
      variant: {
        default: "bg-brand font-semibold text-white hover:bg-brand-hover active:bg-brand-press",
        dark: "bg-choco text-white hover:bg-choco-2",
        outline: "border-line-2 bg-surface text-ink hover:bg-surface-2 aria-expanded:bg-surface-2",
        soft: "bg-surface-2 text-ink hover:bg-surface-3 aria-expanded:bg-surface-3",
        tint: "bg-brand-50 text-brand-text hover:bg-brand-100",
        ghost: "text-ink-2 hover:bg-surface-2 hover:text-ink aria-expanded:bg-surface-2 aria-expanded:text-ink",
        square: "border-line-2 bg-surface text-ink-2 hover:bg-surface-2 hover:text-ink aria-expanded:bg-surface-2",
        destructive: "bg-danger text-white hover:bg-danger-hover focus-visible:ring-danger/20",
        "destructive-soft": "bg-danger-soft text-danger hover:bg-danger-soft-hover focus-visible:ring-danger/20",
        success: "bg-success text-white hover:bg-success-hover",
        link: "h-auto! rounded-none border-0 px-0! text-brand-text hover:text-choco",
      },
      size: {
        default:
          "h-10 px-4 has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5",
        xs: "h-7 gap-1.5 rounded-sm px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3.5",
        sm: "h-[34px] rounded-md px-3 text-[13px] has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        lg: "h-12 rounded-[12px] px-[22px] text-[15px] has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        icon: "size-10",
        "icon-xs": "size-7 rounded-sm [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm": "size-[34px] rounded-md",
        "icon-md": "size-9 rounded-md",
        "icon-lg": "size-12 rounded-[12px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const buttonVariants = (...args: Parameters<typeof buttonVariantClasses>) => cn(buttonVariantClasses(...args))

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  )
}

export { Button, buttonVariants }
