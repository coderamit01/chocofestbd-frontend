"use client";

import { useState, useTransition, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { deleteTagAction, saveTagAction } from "@/actions/tag.actions";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { DataPagination } from "@/components/shared/data-pagination";
import { EmptyState } from "@/components/shared/empty-state";
import { Icon } from "@/components/shared/icon";
import { SearchInput } from "@/components/shared/search-input";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { useUrlSearch } from "@/hooks/use-url-search";
import { formStyles } from "@/lib/form-styles";
import { generateSlug } from "@/lib/slug";
import { tableStyles } from "@/lib/table-styles";
import { cn } from "@/lib/utils";
import type { PaginationMeta } from "@/types/api";
import type { Tag } from "@/types/tag";

type TagsManagerProps = {
  tags: Tag[];
  meta?: PaginationMeta;
  search?: string;
  canDelete: boolean;
};

const NAME_MIN = 2;
const NAME_MAX = 50;

const validateName = (name: string, tags: Tag[], editingId: string | null) => {
  if (!name) return "Name is required.";
  if (name.length < NAME_MIN) return `Name must be at least ${NAME_MIN} characters.`;
  if (name.length > NAME_MAX) return `Name must be at most ${NAME_MAX} characters.`;
  if (tags.some((tag) => tag.slug === generateSlug(name) && tag.id !== editingId)) return "A tag with this name already exists.";
  return null;
};

export function TagsManager({ tags, meta, search, canDelete }: TagsManagerProps) {
  const pathname = usePathname();
  const searchBox = useUrlSearch();
  const [editing, setEditing] = useState<Tag | null>(null);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<Tag | null>(null);
  const [isSaving, startSaving] = useTransition();
  const [isDeleting, startDeleting] = useTransition();

  const slug = generateSlug(name) || "…";

  const reset = () => {
    setEditing(null);
    setName("");
    setError(null);
  };

  const startEdit = (tag: Tag) => {
    setEditing(tag);
    setName(tag.name);
    setError(null);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = name.trim();
    const problem = validateName(trimmed, tags, editing?.id ?? null);
    if (problem) return setError(problem);

    startSaving(async () => {
      const result = await saveTagAction(editing?.id ?? null, trimmed);
      if (!result.success) {
        setError(result.fieldErrors?.find((item) => item.field === "name")?.message ?? result.message);
        return;
      }
      toast.success(editing ? "Tag updated" : "Tag added", { description: trimmed });
      reset();
    });
  };

  const confirmDelete = () => {
    if (!toDelete) return;
    const tag = toDelete;
    startDeleting(async () => {
      const result = await deleteTagAction(tag.id);
      if (!result.success) {
        toast.error("Couldn’t delete tag", { description: result.message });
        return;
      }
      const count = tag._count.products;
      toast.success("Tag deleted", { description: count ? `${tag.name} removed from ${count} products` : tag.name });
      if (editing?.id === tag.id) reset();
      setToDelete(null);
    });
  };

  return (
    <div className="flex flex-wrap items-start gap-6">
      <section aria-labelledby="tag-form-title" className="flex max-w-105 flex-[1_1_340px] flex-col rounded-xl bg-card px-6 py-5.5 max-[900px]:max-w-none max-[900px]:p-4.5">
        <h3 id="tag-form-title" className="mb-4.5 font-heading text-lg leading-[1.3] font-semibold text-ink">
          {editing ? "Edit tag" : "Add tag"}
        </h3>
        <form onSubmit={submit} noValidate className="flex flex-col gap-5">
          <div className={formStyles.field}>
            <label htmlFor="tn" className={formStyles.label}>
              Name<span className={formStyles.required}>*</span>
            </label>
            <input
              id="tn"
              placeholder="e.g. Sugar-free"
              value={name}
              aria-invalid={!!error || undefined}
              aria-describedby={error ? "tn-error" : undefined}
              onChange={(event) => {
                setName(event.target.value);
                setError(null);
              }}
              className={formStyles.input}
            />
            {error && (
              <span id="tn-error" className={formStyles.error}>
                {error}
              </span>
            )}
          </div>
          <div className={formStyles.field}>
            <label htmlFor="ts" className={formStyles.label}>
              Slug
            </label>
            <div className={formStyles.inputGroup}>
              <span className={formStyles.groupAddon}>/tag/</span>
              <input id="ts" value={slug} disabled className={cn(formStyles.groupInput, "text-ink-4")} />
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Button type="submit" className="flex-1" aria-busy={isSaving || undefined}>
              {isSaving ? "Saving…" : editing ? "Save changes" : "Add tag"}
            </Button>
            {editing && (
              <Button type="button" variant="soft" onClick={reset} disabled={isSaving}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </section>

      <section className="flex min-w-0 flex-[2_1_600px] flex-col gap-5 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5">
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput
            label="Search tags"
            wrapperClassName="flex-[0_1_260px]"
            value={searchBox.value}
            onChange={(event) => searchBox.setValue(event.target.value)}
          />
          <span className="flex-1" />
          <span className="text-[12.5px] text-ink-3">{meta?.total ?? tags.length} tags</span>
        </div>

        {tags.length === 0 ? (
          <EmptyState title="No tags found" description={search ? `Nothing matches “${search}”.` : "Add one with the form."} />
        ) : (
          <div className={cn(tableStyles.wrapper, searchBox.isPending && "opacity-60")}>
            <table className={tableStyles.table}>
              <thead>
                <tr>
                  <th className={tableStyles.head}>Name</th>
                  <th className={tableStyles.head}>Slug</th>
                  <th className={cn(tableStyles.head, "text-right")}>Products</th>
                  <th className={cn(tableStyles.head, "text-right")}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={tableStyles.body}>
                {tags.map((tag) => (
                  <tr key={tag.id} className={tableStyles.row}>
                    <td className={tableStyles.cell} data-label="Name">
                      <Badge variant="brand">{tag.name}</Badge>
                    </td>
                    <td className={cn(tableStyles.cell, "font-mono text-[13px] text-ink-2")} data-label="Slug">
                      /tag/{tag.slug}
                    </td>
                    <td className={cn(tableStyles.cell, "text-right tabular-nums")} data-label="Products">
                      {tag._count.products}
                    </td>
                    <td className={tableStyles.bareCell}>
                      <div className="flex justify-end gap-1.5">
                        <button
                          type="button"
                          aria-label={`Edit ${tag.name}`}
                          onClick={() => startEdit(tag)}
                          className={buttonVariants({ variant: "square", size: "icon-md" })}
                        >
                          <Icon name="edit" size={17} strokeWidth={1.8} className="size-[17px]" />
                        </button>
                        {canDelete && (
                          <button
                            type="button"
                            aria-label={`Delete ${tag.name}`}
                            onClick={() => setToDelete(tag)}
                            className={buttonVariants({ variant: "square", size: "icon-md" })}
                          >
                            <Icon name="trash" size={17} strokeWidth={1.8} className="size-[17px]" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {meta && meta.totalPages > 1 && <DataPagination meta={meta} pathname={pathname} query={{ search }} />}
      </section>

      <ConfirmDialog
        open={!!toDelete}
        onOpenChange={(open) => !open && setToDelete(null)}
        title={`Delete “${toDelete?.name ?? ""}”?`}
        description={
          toDelete?._count.products
            ? `It will be removed from ${toDelete._count.products} products. This can’t be undone.`
            : "This can’t be undone."
        }
        confirmLabel="Delete tag"
        variant="destructive"
        isPending={isDeleting}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
