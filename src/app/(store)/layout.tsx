import { AppToaster } from "@/components/shared/app-toaster";
import { StoreFooter } from "@/components/store/footer/store-footer";
import { StoreHeader } from "@/components/store/header/store-header";

export default function StoreLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <StoreHeader />
      <main className="flex-1">{children}</main>
      <StoreFooter />
      <AppToaster />
    </div>
  );
}
