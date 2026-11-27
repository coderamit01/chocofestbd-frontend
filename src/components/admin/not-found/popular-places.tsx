import Link from "next/link";
import { Icon } from "@/components/shared/icon";
import type { PopularPlace } from "@/config/not-found";
import { TILE_TONES } from "@/config/tones";
import { cn } from "@/lib/utils";

export function PopularPlaces({ places }: { places: PopularPlace[] }) {
  if (places.length === 0) return null;

  return (
    <section className="flex flex-col gap-3" aria-labelledby="popular-places">
      <div className="flex items-center gap-4">
        <span className="flex-1 border-t border-dashed border-line-dash" />
        <h3 id="popular-places" className="m-0 font-heading text-lg leading-none font-semibold whitespace-nowrap text-ink">
          Popular places
        </h3>
        <span className="flex-1 border-t border-dashed border-line-dash" />
      </div>
      <p className="-mt-1.5 mb-1 text-center text-xs text-ink-3">Based on your role</p>
      <div className="grid grid-cols-3 gap-3 max-[900px]:grid-cols-1">
        {places.map((place) => (
          <Link
            key={place.href}
            href={place.href}
            className="group flex items-center gap-3 rounded-2xl border border-[#f0ebe6] bg-surface p-3.5 transition-[transform,border-color,box-shadow] duration-150 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_10px_20px_-12px_rgb(238_86_21/45%)]"
          >
            <span className={cn("flex size-10 flex-none items-center justify-center rounded-[36%]", TILE_TONES[place.tone])}>
              <Icon name={place.icon} size={24} strokeWidth={1.8} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-sm font-semibold text-ink">{place.label}</span>
              <span className="text-xs text-ink-3">{place.sub}</span>
            </span>
            <span className="flex size-7 flex-none items-center justify-center rounded-full text-[#c9bdb5] transition-[background-color,color,transform] duration-150 group-hover:translate-x-0.5 group-hover:bg-brand group-hover:text-white">
              <Icon name="arrowRight" size={16} strokeWidth={1.8} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
