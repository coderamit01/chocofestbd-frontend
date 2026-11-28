import Form from "next/form";
import { HeroSearch } from "@/components/store/faq/hero-search";
import { StoreButton } from "@/components/store/ui/store-button";

export function NotFoundSearch() {
  return (
    <Form action="/shop" role="search" className="flex w-full max-w-[560px] justify-center">
      <HeroSearch name="q" aria-label="Search products" placeholder="Search chocolates, brands, gift boxes">
        <StoreButton type="submit" size="md">
          Search
        </StoreButton>
      </HeroSearch>
    </Form>
  );
}
