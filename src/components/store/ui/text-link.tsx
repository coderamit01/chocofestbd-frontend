import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "cn";

const TEXT_LINK =
  "inline cursor-pointer border-0 bg-transparent p-0 font-sans text-[13px] leading-none font-semibold text-brand-text underline underline-offset-3 hover:text-brand disabled:cursor-not-allowed disabled:opacity-45";

type TextLinkProps =
  | (Omit<ComponentProps<typeof Link>, "href"> & { href: string })
  | (ComponentProps<"button"> & { href?: undefined });

export function TextLink(props: TextLinkProps) {
  if (props.href !== undefined) {
    const { className, ...rest } = props;
    return <Link className={cn(TEXT_LINK, className)} {...rest} />;
  }

  const { className, type = "button", ...rest } = props;
  return <button type={type} className={cn(TEXT_LINK, className)} {...rest} />;
}
