import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/utils/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
        <SidebarTrigger />
        <main className="flex-1 items-center justify-center mx-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
