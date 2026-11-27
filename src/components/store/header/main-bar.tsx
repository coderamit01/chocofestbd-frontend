import { Container } from "@/components/store/shared/container";
import { SEARCH_SCOPES } from "@/config/store-header";
import { HeaderActions } from "./header-actions";
import { MenuToggle } from "./menu-toggle";
import { MobileSearchPanel } from "./mobile-search-panel";
import { SearchForm } from "./search-form";
import { StoreLogo } from "./store-logo";

export function MainBar() {
  return (
    <div className="border-b border-[#f0ebe6] bg-white">
      <Container className="flex h-[84px] items-center gap-7 max-[900px]:h-16 max-[900px]:gap-1">
        <MenuToggle />
        <StoreLogo />
        <SearchForm scopes={SEARCH_SCOPES} withSuggestions className="max-w-[680px] flex-1 max-[900px]:hidden" />
        <HeaderActions />
      </Container>
      <MobileSearchPanel />
    </div>
  );
}
