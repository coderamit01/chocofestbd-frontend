"use client";

import { useId, useState } from "react";
import type { FooterLinkGroup } from "@/types/store-footer";
import { FooterLinkColumn } from "./footer-link-column";

type FooterLinkColumnsProps = { groups: FooterLinkGroup[] };

export function FooterLinkColumns({ groups }: FooterLinkColumnsProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(-1);

  return groups.map((group, index) => (
    <FooterLinkColumn
      key={group.heading}
      id={`${baseId}-${index}`}
      heading={group.heading}
      links={group.links}
      open={openIndex === index}
      onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
    />
  ));
}
