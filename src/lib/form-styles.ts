export const formStyles = {
  field: "flex min-w-0 flex-col gap-2",
  label: "text-[13.5px] leading-[1.3] font-medium text-ink",
  required: "ml-0.5 text-danger",
  hint: "text-[12.5px] text-ink-3",
  error: "text-[12.5px] text-danger",
  input:
    "h-10.5 w-full rounded-[10px] border border-input bg-surface-2 px-3.5 text-sm text-ink outline-none transition-[border-color,box-shadow,background-color] placeholder:text-ink-4 focus:border-brand focus:bg-surface focus:shadow-focus aria-invalid:border-danger aria-invalid:bg-[#fffafa] disabled:cursor-not-allowed disabled:text-ink-4",
  textarea:
    "min-h-24 w-full resize-y rounded-[10px] border border-input bg-surface-2 px-3.5 py-3 text-sm leading-[1.55] text-ink outline-none transition-[border-color,box-shadow,background-color] placeholder:text-ink-4 focus:border-brand focus:bg-surface focus:shadow-focus aria-invalid:border-danger aria-invalid:bg-[#fffafa]",
  inputGroup:
    "flex h-10.5 items-stretch overflow-hidden rounded-[10px] border border-input bg-surface-2 transition-[border-color,box-shadow,background-color] focus-within:border-brand focus-within:bg-surface focus-within:shadow-focus has-aria-invalid:border-danger",
  groupInput: "min-w-0 flex-1 border-0 bg-transparent px-3.5 text-sm text-ink outline-none placeholder:text-ink-4",
  groupAddon: "flex items-center px-3 text-[13.5px] whitespace-nowrap text-ink-3",
};
