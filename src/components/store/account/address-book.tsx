"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Icon } from "@/components/shared/icon";
import { StoreButton } from "@/components/store/ui/store-button";
import type { SavedAddress } from "@/types/store-account";
import { AccountHeading } from "./account-heading";
import { AddressCard } from "./address-card";

export function AddressBook({ addresses }: { addresses: SavedAddress[] }) {
  const [defaultId, setDefaultId] = useState(addresses[0]?.id);

  return (
    <>
      <AccountHeading title="Saved addresses">
        <StoreButton
          variant="ghost"
          className="h-[42px]"
          onClick={() => toast.success("New address", { description: "Address form opens here" })}
        >
          <Icon name="plus" size={16} strokeWidth={1.8} />
          Add address
        </StoreButton>
      </AccountHeading>
      <div className="grid grid-cols-2 gap-3.5 max-[900px]:grid-cols-1">
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            isDefault={address.id === defaultId}
            onMakeDefault={() => setDefaultId(address.id)}
          />
        ))}
      </div>
    </>
  );
}
