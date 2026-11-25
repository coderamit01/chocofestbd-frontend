import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2.5 px-4 py-14 text-center">
      <svg width="112" height="80" viewBox="0 0 120 84" aria-hidden="true">
        <ellipse cx="60" cy="76" rx="44" ry="6" fill="#f2eeea" />
        <rect x="24" y="16" width="72" height="52" rx="6" fill="#5a2410" />
        <path d="M48 16v52M72 16v52M24 33h72M24 50h72" stroke="#3d1104" strokeWidth="2" />
        <path d="M82 16a10 10 0 0 0 14 10V22a6 6 0 0 0-6-6z" fill="#fff" />
        <rect x="10" y="42" width="16" height="26" rx="3" fill="#ee5615" />
      </svg>
      <h3 className="font-heading text-base leading-[1.3] font-semibold text-ink">{title}</h3>
      <p className="max-w-[340px] text-[12.5px] text-ink-3">{description}</p>
      {action}
    </div>
  );
}
