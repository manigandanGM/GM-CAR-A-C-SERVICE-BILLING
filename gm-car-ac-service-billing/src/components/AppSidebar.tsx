
import { LayoutList, Plus, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "New Invoice",
    url: "#invoice",
    icon: Plus,
  },
  {
    title: "Invoice List",
    url: "#list",
    icon: LayoutList,
  },
  {
    title: "Settings",
    url: "#settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="h-full w-full bg-gradient-to-b from-blue-200 via-purple-100 to-pink-50 px-2 py-6 shadow-md">
          <SidebarGroup>
            <SidebarGroupLabel className="header-gradient-text">Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="dark:hover:bg-gray-800 dark:text-white"
                    >
                      <a href={item.url} className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-white/50 transition">
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
