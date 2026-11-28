import { Suspense } from "react";
import type { Metadata } from "next";
import { TrackOrder } from "@/components/store/track/track-order";
import { TrackResult } from "@/components/store/track/track-result";
import { Breadcrumbs } from "@/components/store/ui/breadcrumbs";
import { PageContainer } from "@/components/store/ui/page-container";
import { TRACK_SAMPLE_ORDER } from "@/config/store-track";

export const metadata: Metadata = {
  title: "Track order | Chocofest BD",
};

const result = <TrackResult order={TRACK_SAMPLE_ORDER} />;

async function TrackOrderFromQuery({ searchParams }: Pick<PageProps<"/track-order">, "searchParams">) {
  const { order } = await searchParams;
  const initialOrder = Array.isArray(order) ? order[0] : order;
  return <TrackOrder initialOrder={initialOrder} result={result} />;
}

export default function TrackOrderPage({ searchParams }: PageProps<"/track-order">) {
  return (
    <PageContainer page>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Track order" }]} />
      <Suspense fallback={<TrackOrder result={result} />}>
        <TrackOrderFromQuery searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
