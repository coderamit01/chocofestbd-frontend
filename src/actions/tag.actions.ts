"use server";

import { TagService } from "@/services/tag.service";
import { runCatalogAction } from "./catalog-action";

export async function saveTagAction(tagId: string | null, name: string) {
  return runCatalogAction(() => (tagId ? TagService.updateTag(tagId, name) : TagService.createTag(name)));
}

export async function deleteTagAction(tagId: string) {
  return runCatalogAction(() => TagService.deleteTag(tagId));
}
