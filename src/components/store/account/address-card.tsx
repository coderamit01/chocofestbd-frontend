import { cn } from "cn";
import { storeCardClass } from "@/components/store/ui/store-card";
import { TextLink } from "@/components/store/ui/text-link";
import type { SavedAddress } from "@/types/store-account";
import { StatusPill } from "./status-pill";

type AddressCardProps = {
  address: SavedAddress;
  isDefault: boolean;
  onMakeDefault: () => void;
};

export function AddressCard({ address, isDefault, onMakeDefault }: AddressCardProps) {
  return (
    <div
      className={storeCardClass(
        cn(
          "flex flex-col gap-1.5 text-[13.5px] text-ink-2",
          isDefault && "border-brand shadow-[0_0_0_3px_rgba(238,86,21,0.1)]",
        ),
      )}
    >
      <div className="flex items-center justify-between">
        <b className="text-[15px] text-ink">
          {address.icon} {address.label}
        </b>
        {isDefault && <StatusPill tone="on">Default</StatusPill>}
      </div>
      <span>
        {address.name} · {address.phone}
      </span>
      <span>{address.line}</span>
      <div className="flex items-center gap-4">
        <TextLink aria-label={`Edit ${address.label} address`}>Edit</TextLink>
        {!isDefault && <TextLink onClick={onMakeDefault}>Set as default</TextLink>}
      </div>
    </div>
  );
}
