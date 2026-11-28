import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Page not found | Chocofest BD",
};

export default function StoreCatchAll() {
  notFound();
}
