import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/sidebar/admin-sidebar";
import { AdminTopbar } from "@/components/admin/topbar/admin-topbar";
import { MobileBar } from "@/components/admin/topbar/mobile-bar";
import { AppToaster } from "@/components/shared/app-toaster";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <MobileBar />
        <AdminTopbar />
        <main className="mx-auto flex w-full max-w-370 flex-1 flex-col gap-6 px-8 pt-1 pb-10 text-body max-[900px]:gap-4 max-[900px]:px-4 max-[900px]:pt-2 max-[900px]:pb-8">
          {children}
        </main>
      </SidebarInset>
      <AppToaster />
    </SidebarProvider>
  );
}
