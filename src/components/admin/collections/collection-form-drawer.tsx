"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteCollectionAction, saveCollectionAction } from "@/actions/collection.actions";
import { FormDrawer } from "@/components/shared/form-drawer";
import { ToggleSwitch } from "@/components/shared/toggle-switch";
import { Button } from "@/components/ui/button";
import { fromDhakaInput, toDhakaInput } from "@/lib/collection";
import { formStyles } from "@/lib/form-styles";
import { generateSlug } from "@/lib/slug";
import { cn } from "@/lib/utils";
import type { Collection } from "@/types/collection";

export type CollectionDrawerState = { mode: "new"; nextPosition: number } | { mode: "edit"; collection: Collection } | null;

type CollectionFormDrawerProps = {
  state: CollectionDrawerState;
  canDelete: boolean;
  onClose: () => void;
  onSaved: (collectionId: string | null) => void;
};

type FormValues = {
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
  position: string;
  showOnHome: boolean;
  isActive: boolean;
};

const TITLE_MIN = 2;
const TITLE_MAX = 100;

export function CollectionFormDrawer({ state, canDelete, onClose, onSaved }: CollectionFormDrawerProps) {
  const collection = state?.mode === "edit" ? state.collection : null;
  const [isPending, startTransition] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const formKey = collection?.id ?? (state ? "new" : "closed");

  const remove = () => {
    if (!collection) return;
    if (!confirmDelete) return setConfirmDelete(true);
    startTransition(async () => {
      const result = await deleteCollectionAction(collection.id);
      if (!result.success) {
        toast.error("Couldn’t delete collection", { description: result.message });
        return;
      }
      toast.success("Collection deleted", { description: collection.title });
      setConfirmDelete(false);
      onSaved(null);
      onClose();
    });
  };

  return (
    <FormDrawer
      open={!!state}
      onOpenChange={(open) => {
        if (!open && !isPending) {
          setConfirmDelete(false);
          onClose();
        }
      }}
      title={collection ? "Edit collection" : "New collection"}
      description="Collections power home-page sections like “Eid Special”."
      footer={
        <>
          {collection && canDelete && (
            <Button variant={confirmDelete ? "destructive" : "destructive-soft"} onClick={remove} disabled={isPending} className="mr-auto">
              {confirmDelete ? "Click again to delete" : "Delete"}
            </Button>
          )}
          <Button variant="soft" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" form="collection-form" aria-busy={isPending || undefined}>
            {isPending ? "Saving…" : "Save collection"}
          </Button>
        </>
      }
    >
      {state && (
        <CollectionForm
          key={formKey}
          state={state}
          startTransition={startTransition}
          onSaved={(id) => {
            onSaved(id);
            onClose();
          }}
        />
      )}
    </FormDrawer>
  );
}

type CollectionFormProps = {
  state: NonNullable<CollectionDrawerState>;
  startTransition: React.TransitionStartFunction;
  onSaved: (collectionId: string | null) => void;
};

function CollectionForm({ state, startTransition, onSaved }: CollectionFormProps) {
  const collection = state.mode === "edit" ? state.collection : null;
  const [values, setValues] = useState<FormValues>(() => ({
    title: collection?.title ?? "",
    description: collection?.description ?? "",
    startsAt: toDhakaInput(collection?.startsAt ?? null),
    endsAt: toDhakaInput(collection?.endsAt ?? null),
    position: String(collection?.position ?? (state.mode === "new" ? state.nextPosition : 1)),
    showOnHome: collection?.showOnHome ?? true,
    isActive: collection?.isActive ?? true,
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (patch: Partial<FormValues>) => {
    setValues((current) => ({ ...current, ...patch }));
    setErrors((current) => {
      const next = { ...current };
      Object.keys(patch).forEach((key) => delete next[key]);
      return next;
    });
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const title = values.title.trim();
    const nextErrors: Record<string, string> = {};
    if (title.length < TITLE_MIN || title.length > TITLE_MAX) {
      nextErrors.title = title ? `Title must be ${TITLE_MIN}–${TITLE_MAX} characters.` : "Title is required.";
    }
    if (values.startsAt && values.endsAt && values.endsAt <= values.startsAt) nextErrors.endsAt = "Must be after the start.";
    if (Object.keys(nextErrors).length) return setErrors(nextErrors);

    startTransition(async () => {
      const result = await saveCollectionAction(collection?.id ?? null, {
        title,
        description: values.description.trim() || null,
        position: Math.max(0, Number(values.position) || 0),
        isActive: values.isActive,
        showOnHome: values.showOnHome,
        startsAt: fromDhakaInput(values.startsAt),
        endsAt: fromDhakaInput(values.endsAt),
      });

      if (!result.success) {
        const fieldErrors = result.fieldErrors ?? [];
        if (fieldErrors.length) setErrors(Object.fromEntries(fieldErrors.map((item) => [item.field, item.message])));
        else setErrors({ title: result.message });
        return;
      }

      toast.success("Collection saved", { description: title });
      onSaved((result.data as { id?: string } | undefined)?.id ?? collection?.id ?? null);
    });
  };

  return (
    <form id="collection-form" noValidate onSubmit={submit} className="flex flex-col gap-5">
      <div className={formStyles.field}>
        <label htmlFor="ct" className={formStyles.label}>
          Title<span className={formStyles.required}>*</span>
        </label>
        <input
          id="ct"
          value={values.title}
          aria-invalid={!!errors.title || undefined}
          onChange={(event) => set({ title: event.target.value })}
          className={formStyles.input}
        />
        {errors.title && <span className={formStyles.error}>{errors.title}</span>}
        <span className={formStyles.hint}>/collection/{generateSlug(values.title) || "…"}</span>
      </div>

      <div className={formStyles.field}>
        <label htmlFor="cd" className={formStyles.label}>
          Description
        </label>
        <textarea id="cd" value={values.description} onChange={(event) => set({ description: event.target.value })} className={formStyles.textarea} />
        {errors.description && <span className={formStyles.error}>{errors.description}</span>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={formStyles.field}>
          <label htmlFor="cs" className={formStyles.label}>
            Starts
          </label>
          <input id="cs" type="datetime-local" value={values.startsAt} onChange={(event) => set({ startsAt: event.target.value })} className={formStyles.input} />
          {errors.startsAt && <span className={formStyles.error}>{errors.startsAt}</span>}
        </div>
        <div className={formStyles.field}>
          <label htmlFor="ce" className={formStyles.label}>
            Ends
          </label>
          <input
            id="ce"
            type="datetime-local"
            value={values.endsAt}
            aria-invalid={!!errors.endsAt || undefined}
            onChange={(event) => set({ endsAt: event.target.value })}
            className={formStyles.input}
          />
          {errors.endsAt && <span className={formStyles.error}>{errors.endsAt}</span>}
        </div>
      </div>

      <div className={cn(formStyles.field, "max-w-40")}>
        <label htmlFor="cp" className={formStyles.label}>
          Position on home
        </label>
        <input
          id="cp"
          type="number"
          min={1}
          value={values.position}
          onChange={(event) => set({ position: event.target.value })}
          className={cn(formStyles.input, "tabular-nums")}
        />
        {errors.position && <span className={formStyles.error}>{errors.position}</span>}
      </div>

      <ToggleSwitch checked={values.showOnHome} onChange={(showOnHome) => set({ showOnHome })} label={<span className="order-last">Show on home page</span>} />
      <ToggleSwitch checked={values.isActive} onChange={(isActive) => set({ isActive })} label={<span className="order-last">Active</span>} />
    </form>
  );
}
