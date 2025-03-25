import * as React from "react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export function AppSidebar({ data, ...props }) {
  return (
    <Sidebar
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
      {...props}
    >
      <SidebarHeader className="bg-[#1b82e6]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton variant={"blue"} size="lg" asChild>
              <Link to="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white border border-white text-sidebar-primary-foreground">
                  <img src="/logo.png" className="size-4" alt="logo" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-white">
                    Jalinan
                  </span>
                  <span className="truncate text-xs text-white">
                    Anak Sehat
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-[#1b82e6]">
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
