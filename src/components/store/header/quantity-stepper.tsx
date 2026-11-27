import { Icon, type IconName } from "@/components/shared/icon";

type QuantityStepperProps = {
  value: number;
  onChange: (delta: number) => void;
};

function StepButton({ icon, label, onClick }: { icon: IconName; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-full w-8 items-center justify-center bg-white text-ink-2 hover:bg-brand-50 hover:text-brand"
    >
      <Icon name={icon} size={14} strokeWidth={1.8} />
    </button>
  );
}

export function QuantityStepper({ value, onChange }: QuantityStepperProps) {
  return (
    <span className="inline-flex h-[34px] items-center overflow-hidden rounded-lg border border-[#ece5df]">
      <StepButton icon="minus" label="Decrease" onClick={() => onChange(-1)} />
      <b aria-live="polite" className="min-w-[26px] text-center font-sans text-sm leading-none font-semibold">
        {value}
      </b>
      <StepButton icon="plus" label="Increase" onClick={() => onChange(1)} />
    </span>
  );
}
