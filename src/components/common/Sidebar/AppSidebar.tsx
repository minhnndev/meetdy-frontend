import { NavMain } from "@/components/common/Sidebar/NavMain";
import { NavProjects } from "@/components/common/Sidebar/NavProjects";
import { NavUser } from "@/components/common/Sidebar/NavUser";
import { TeamSwitcher } from "@/components/common/Sidebar/TeamSwitcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { memo } from "react";

const AppSidebar = () => {
    return (
        <Sidebar collapsible="icon">
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
};

export default memo(AppSidebar);
