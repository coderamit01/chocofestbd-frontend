import type { HomeReview } from "@/types/store-home-rail";

export function ReviewCard({ review, hidden }: { review: HomeReview; hidden?: boolean }) {
  return (
    <figure
      aria-hidden={hidden || undefined}
      className="m-0 flex flex-[0_0_calc((100%-36px)/3)] flex-col gap-3 rounded-2xl border border-[#f0ebe6] bg-white p-5.5 max-[900px]:basis-full"
    >
      <span role="img" className="text-[#f5a524]" aria-label="5 out of 5 stars">
        ★★★★★
      </span>
      <blockquote className="m-0 text-[14.5px] leading-[1.6] text-[#3f3531]">{review.quote}</blockquote>
      <figcaption className="mt-auto flex items-center gap-2.5">
        <span
          className="flex size-10 flex-none items-center justify-center rounded-full font-heading text-[13px] leading-none font-semibold text-white"
          style={{ background: review.color }}
        >
          {review.initials}
        </span>
        <span className="flex flex-col gap-0.5">
          <b className="font-bold">{review.name}</b>
          <small className="text-[12px] text-[#8a7f79]">{review.location} · Verified buyer</small>
        </span>
      </figcaption>
    </figure>
  );
}
