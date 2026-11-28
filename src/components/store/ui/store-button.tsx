import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "cn";

const BASE =
  "inline-flex h-[50px] items-center justify-center gap-2 whitespace-nowrap rounded-[14px] px-5 font-sans text-[14.5px] leading-none font-semibold no-underline transition-[transform,filter,border-color,color] duration-150 not-disabled:hover:-translate-y-px not-disabled:hover:brightness-[1.04] disabled:cursor-not-allowed disabled:opacity-45 data-loading:cursor-wait data-loading:opacity-70";

const VARIANTS = {
  primary:
    "border-0 bg-[linear-gradient(180deg,#ff7a2f,#ee5615)] text-white shadow-[0_10px_20px_-10px_rgba(238,86,21,0.7)] hover:text-white focus-visible:shadow-focus",
  ghost: "border-[1.5px] border-[#ece5df] bg-white text-ink hover:border-brand hover:text-brand-text",
};

const SIZES = {
  lg: "",
  md: "h-11",
  sm: "h-10 text-[13px]",
  xs: "h-[38px] px-3 text-[13px]",
};

export type StoreButtonVariant = keyof typeof VARIANTS;
export type StoreButtonSize = keyof typeof SIZES;

type StoreButtonStyle = {
  variant?: StoreButtonVariant;
  size?: StoreButtonSize;
  block?: boolean;
  className?: string;
};

export function storeButtonClass({ variant = "primary", size = "lg", block, className }: StoreButtonStyle = {}) {
  return cn(BASE, VARIANTS[variant], SIZES[size], block && "w-full", className);
}

type StoreLinkButtonProps = StoreButtonStyle & Omit<ComponentProps<typeof Link>, "href"> & { href: string };

type StoreNativeButtonProps = StoreButtonStyle & ComponentProps<"button"> & { href?: undefined; loading?: boolean };

export type StoreButtonProps = StoreLinkButtonProps | StoreNativeButtonProps;

export function StoreButton(props: StoreButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, block, className, ...rest } = props;
    return <Link className={storeButtonClass({ variant, size, block, className })} {...rest} />;
  }

  const { variant, size, block, className, loading, disabled, type = "button", ...rest } = props;
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      data-loading={loading || undefined}
      className={storeButtonClass({ variant, size, block, className })}
      {...rest}
    />
  );
}
