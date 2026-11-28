import type { Metadata } from "next";
import { AddressBook } from "@/components/store/account/address-book";
import { SAVED_ADDRESSES } from "@/config/store-account";

export const metadata: Metadata = {
  title: "Saved addresses | Chocofest BD",
};

export default function AccountAddressesPage() {
  return <AddressBook addresses={SAVED_ADDRESSES} />;
}
