import type { ContactWay } from "@/types/store-contact";
import { ContactWayCard } from "./contact-way-card";

export function ContactWays({ ways }: { ways: ContactWay[] }) {
  return (
    <div className="mb-5 grid grid-cols-4 gap-3.5 max-[1180px]:grid-cols-2 max-[900px]:grid-cols-1">
      {ways.map((way) => (
        <ContactWayCard key={way.title} way={way} />
      ))}
    </div>
  );
}
