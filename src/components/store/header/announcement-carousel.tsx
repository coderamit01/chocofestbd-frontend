"use client";

import { useState } from "react";
import { Icon, type IconName } from "@/components/shared/icon";

type AnnouncementCarouselProps = {
  messages: string[];
};

function ArrowButton({ icon, label, onClick }: { icon: IconName; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-6 flex-none items-center justify-center rounded-[6px] bg-white/8 text-[#f3e3da] hover:bg-white/18"
    >
      <Icon name={icon} size={14} strokeWidth={1.8} />
    </button>
  );
}

export function AnnouncementCarousel({ messages }: AnnouncementCarouselProps) {
  const [index, setIndex] = useState(0);
  const step = (delta: number) => setIndex((current) => (current + delta + messages.length) % messages.length);

  return (
    <div className="flex min-w-0 flex-1 items-center justify-center gap-2.5">
      <ArrowButton icon="chevronLeft" label="Previous offer" onClick={() => step(-1)} />
      <span key={index} aria-live="polite" className="animate-fade-in truncate">
        {messages[index]}
      </span>
      <ArrowButton icon="chevronRight" label="Next offer" onClick={() => step(1)} />
    </div>
  );
}
