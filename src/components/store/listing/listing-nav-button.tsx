"use client";

import type { ComponentProps } from "react";
import { useListingNavigate } from "./use-listing-navigate";

type ListingNavButtonProps = Omit<ComponentProps<"button">, "onClick" | "type"> & {
  href: string;
  onNavigate?: () => void;
};

export function ListingNavButton({ href, onNavigate, ...props }: ListingNavButtonProps) {
  const { navigate } = useListingNavigate();

  return (
    <button
      type="button"
      onClick={() => {
        onNavigate?.();
        navigate(href);
      }}
      {...props}
    />
  );
}
