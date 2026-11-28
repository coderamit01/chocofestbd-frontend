import { PageContainer } from "@/components/store/ui/page-container";

const CARDS = Array.from({ length: 6 }, (_, index) => index);

export function ListingSkeleton() {
  return (
    <PageContainer page aria-busy="true" aria-label="Loading products">
      <div className="pt-[18px] pb-1.5">
        <span className="skel block h-4 w-40 rounded-md" />
      </div>
      <div className="pt-2 pb-[22px] max-[900px]:pt-1 max-[900px]:pb-3.5">
        <span className="skel block h-10 w-64 rounded-lg max-[900px]:h-8" />
      </div>
      <div className="grid grid-cols-[272px_1fr] items-start gap-6 max-[900px]:grid-cols-1">
        <span className="skel block h-[520px] rounded-[20px] max-[900px]:hidden" />
        <div className="flex min-w-0 flex-col gap-3.5">
          <span className="skel block h-[54px] rounded-[16px]" />
          <div className="grid grid-cols-3 gap-[18px] max-[1180px]:grid-cols-2 max-[900px]:gap-2.5">
            {CARDS.map((card) => (
              <span key={card} className="skel block aspect-[3/4] rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
