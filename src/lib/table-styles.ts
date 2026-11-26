const MOBILE_CELL =
  "max-[900px]:flex max-[900px]:items-center max-[900px]:justify-between max-[900px]:gap-3 max-[900px]:border-0 max-[900px]:px-3 max-[900px]:py-1.5 max-[900px]:text-right";

export const tableStyles = {
  wrapper: "overflow-x-auto",
  table:
    "w-full border-separate border-spacing-0 text-sm max-[900px]:block max-[900px]:[&_tbody]:block max-[900px]:[&_thead]:hidden",
  head: "bg-surface-2 px-4 py-3.5 text-left text-[13px] leading-[1.2] font-medium whitespace-nowrap text-ink-3 first:rounded-l-[10px] last:rounded-r-[10px]",
  body: "[&>tr:last-child>td]:border-b-0",
  row: "hover:[&>td]:bg-[#fcfbfa] max-[900px]:mb-3 max-[900px]:block max-[900px]:rounded-[14px] max-[900px]:border max-[900px]:border-dashed max-[900px]:border-line-dash max-[900px]:px-1 max-[900px]:py-2 max-[900px]:hover:[&>td]:bg-transparent",
  cell: `border-b border-dashed border-line-dash p-4 align-middle ${MOBILE_CELL} max-[900px]:before:text-left max-[900px]:before:text-caption max-[900px]:before:text-ink-3 max-[900px]:before:content-[attr(data-label)]`,
  bareCell: `border-b border-dashed border-line-dash p-4 align-middle ${MOBILE_CELL}`,
};
