import { toast } from "sonner";

export async function copyWithToast(text: string, title = "Copied", description = text) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(title, { description });
  } catch {
    toast.error("Couldn’t copy", { description: "Your browser blocked clipboard access." });
  }
}

export const copyText = copyWithToast;
