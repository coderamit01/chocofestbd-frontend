"use client";

import { toast } from "sonner";
import { cn } from "cn";
import { Icon, type IconName } from "@/components/shared/icon";
import { copyWithToast } from "@/lib/clipboard";

type ShareTarget = {
  label: string;
  icon: IconName;
  solid?: boolean;
  hover: string;
  note: string;
};

const SHARE_TARGETS: ShareTarget[] = [
  {
    label: "Share on Facebook",
    icon: "facebookSolid",
    solid: true,
    hover: "hover:border-[#1877f2] hover:bg-[#1877f2] hover:text-white",
    note: "Opens Facebook share for this product",
  },
  {
    label: "Share on Messenger",
    icon: "messenger",
    hover: "hover:border-[#0084ff] hover:bg-[#0084ff] hover:text-white",
    note: "Opens Messenger with the product link",
  },
  {
    label: "Share on WhatsApp",
    icon: "whatsapp",
    hover: "hover:border-[#1fa855] hover:bg-[#1fa855] hover:text-white",
    note: "Opens WhatsApp with the product link",
  },
];

const SHARE_BUTTON =
  "inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-[#ece4de] bg-white p-0 text-ink-2 transition-[background-color,color,border-color] duration-150 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand/35";

export function ShareButtons({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="mr-0.5 font-sans text-[13.5px] leading-none font-medium text-[#8a7f79]">Share</span>
      {SHARE_TARGETS.map((target) => (
        <button
          key={target.icon}
          type="button"
          aria-label={target.label}
          onClick={() => toast.success(target.label, { description: target.note })}
          className={cn(SHARE_BUTTON, target.hover)}
        >
          <Icon
            name={target.icon}
            size={16}
            strokeWidth={1.8}
            fill={target.solid ? "currentColor" : "none"}
            stroke={target.solid ? "none" : "currentColor"}
          />
        </button>
      ))}
      <button
        type="button"
        aria-label="Copy product link"
        onClick={() => copyWithToast(url, "Link copied")}
        className={cn(SHARE_BUTTON, "hover:border-[#ffd0b5] hover:bg-brand-50 hover:text-brand")}
      >
        <Icon name="link" size={16} strokeWidth={1.8} />
      </button>
    </div>
  );
}
