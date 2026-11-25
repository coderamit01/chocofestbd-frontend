"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { saveAdminNoteAction } from "@/actions/order.actions";
import { Button } from "@/components/ui/button";
import { formStyles } from "@/lib/form-styles";
import { isBangla } from "@/lib/order-display";
import { cn } from "@/lib/utils";
import type { OrderDetail } from "@/types/order";
import { DetailCard } from "./detail-card";

export function OrderNotesCard({ order }: { order: OrderDetail }) {
  const [note, setNote] = useState(order.adminNote ?? "");
  const [saved, setSaved] = useState(order.adminNote ?? "");
  const [isSaving, startSaving] = useTransition();
  const dirty = note.trim() !== saved.trim();

  const save = () =>
    startSaving(async () => {
      const result = await saveAdminNoteAction(order.id, note);
      if (!result.success) {
        toast.error("Couldn’t save note", { description: result.message });
        return;
      }
      setSaved(note);
      toast.success("Note saved", { description: "Admin note updated" });
    });

  return (
    <DetailCard title="Notes">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-5">
        <div className={formStyles.field}>
          <span className={formStyles.label}>Customer note</span>
          <p
            className={cn(
              "min-h-24 rounded-xl bg-surface-2 p-3.5 text-[15px] whitespace-pre-line",
              isBangla(order.customerNote) && "font-bengali",
              !order.customerNote && "text-sm text-ink-4"
            )}
          >
            {order.customerNote || "No note from the customer."}
          </p>
          <span className={formStyles.hint}>Read-only · from checkout</span>
        </div>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="an">
            Admin note
          </label>
          <textarea
            id="an"
            value={note}
            maxLength={1000}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Visible to staff only"
            className={formStyles.textarea}
          />
          <div className="flex items-center justify-between">
            <span className={formStyles.hint}>{dirty ? "Unsaved changes" : saved ? "Saved" : "Only staff can see this"}</span>
            <Button variant={dirty ? "dark" : "soft"} size="sm" disabled={!dirty} onClick={save} aria-busy={isSaving || undefined}>
              {isSaving ? "Saving…" : "Save note"}
            </Button>
          </div>
        </div>
      </div>
    </DetailCard>
  );
}
