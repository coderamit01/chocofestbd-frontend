"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function GoBackButton({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <Button variant="outline" size="lg" onClick={() => router.back()} className={className}>
      <ArrowLeftIcon data-icon="inline-start" />
      Go back
    </Button>
  );
}
