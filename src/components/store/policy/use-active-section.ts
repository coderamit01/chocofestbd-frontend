"use client";

import { useEffect, useState } from "react";

const ACTIVE_OFFSET = 120;

const pickActive = (ids: string[]) => {
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (atBottom) return ids.at(-1);
  const passed = ids.filter((id) => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= ACTIVE_OFFSET);
  return passed.at(-1) ?? ids[0];
};

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | undefined>(ids[0]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setActive(pickActive(ids)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids]);

  return [active, setActive] as const;
}
