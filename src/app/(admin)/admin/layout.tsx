import { AppSidebar } from "@/components/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Topbar from "@/components/ui/topbar";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Topbar />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 text-body">{children}</div>
      </SidebarInset>
      <Toaster richColors closeButton position="top-right" />
    </SidebarProvider>
  );
}
