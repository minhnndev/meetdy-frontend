import { ListTodo, MoreHorizontal } from "lucide-react";
import React from "react";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

const MOCK_PROJECTS = [
    {
        name: "Zjra Task Management",
        url: "https://zjra.meetdy.com",
        icon: ListTodo,
    },
];

export function NavProjects() {
    const handleDirectUrl = (url: string) => {
        window.open(url, "_blank");
    };

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
                {MOCK_PROJECTS.map((item) => (
                    <SidebarMenuButton onClick={() => handleDirectUrl(item.url)} key={item.name}>
                        <item.icon />
                        <span>{item.name}</span>
                    </SidebarMenuButton>
                ))}
                <SidebarMenuItem>
                    <SidebarMenuButton className="text-sidebar-foreground/70">
                        <MoreHorizontal className="text-sidebar-foreground/70" />
                        <span>More</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
}
