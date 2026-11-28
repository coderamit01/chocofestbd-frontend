import { cn } from "cn";
import { Icon, type IconName } from "@/components/shared/icon";

const SIZES = {
  lg: {
    root: "flex h-[54px] rounded-[14px] border-[1.5px] border-[#e7e0da] bg-white",
    button: "w-11 bg-transparent text-[#3f3531]",
    value: "min-w-[30px] text-base",
    icon: 16,
  },
  sm: {
    root: "flex h-[42px] justify-self-start rounded-[12px] border-[1.5px] border-[#e7e0da] bg-white max-[900px]:h-[38px]",
    button: "w-[38px] bg-transparent text-[#3f3531]",
    value: "min-w-[26px] text-[15px]",
    icon: 15,
  },
  xs: {
    root: "inline-flex h-[34px] overflow-hidden rounded-lg border border-[#ece5df]",
    button: "w-8 bg-white text-ink-2 enabled:hover:bg-brand-50 enabled:hover:text-brand",
    value: "min-w-[26px] text-sm",
    icon: 14,
  },
};

export type QuantityStepperSize = keyof typeof SIZES;

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: QuantityStepperSize;
  label?: string;
  className?: string;
};

type StepButtonProps = {
  icon: IconName;
  label: string;
  size: QuantityStepperSize;
  disabled: boolean;
  onClick: () => void;
};

function StepButton({ icon, label, size, disabled, onClick }: StepButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex h-full items-center justify-center border-0 disabled:cursor-not-allowed disabled:text-[#d0c7c1]",
        SIZES[size].button,
      )}
    >
      <Icon name={icon} size={SIZES[size].icon} strokeWidth={1.8} />
    </button>
  );
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = Infinity,
  size = "lg",
  label = "Quantity",
  className,
}: QuantityStepperProps) {
  return (
    <div role="group" aria-label={label} className={cn("items-center", SIZES[size].root, className)}>
      <StepButton
        icon="minus"
        label="Decrease quantity"
        size={size}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      />
      <b aria-live="polite" className={cn("text-center font-sans leading-none font-semibold", SIZES[size].value)}>
        {value}
      </b>
      <StepButton
        icon="plus"
        label="Increase quantity"
        size={size}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      />
    </div>
  );
}
