import { PenLine, Search } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "New Chat",
    url: "/home",
    icon: PenLine,
  },
  {
    title: "Search Chat",
    url: "#",
    icon: Search,
  },
];

export function AppSidebar() {

  return (
    <Sidebar className="fixed h-screen">
      <SidebarContent className="px-2 py-2 shadow-sm">
        <SidebarGroup>
          <div className="mb-8">
            <SidebarGroupLabel className="font-dm-serif-display text-3xl text-foreground">
              Sulat.ai
            </SidebarGroupLabel>
          </div>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span className="text-base">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
