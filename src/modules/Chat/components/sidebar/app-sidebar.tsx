import * as React from "react";

import { NavMain } from "@/modules/Chat/components/sidebar/nav-main";
import { NavProjects } from "@/modules/Chat/components/sidebar/nav-projects";
import { NavUser } from "@/modules/Chat/components/sidebar/nav-user";
import { TeamSwitcher } from "@/modules/Chat/components/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavProjects />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
