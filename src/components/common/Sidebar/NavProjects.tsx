import { ListTodo, MoreHorizontal } from "lucide-react";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";

const MOCK_PROJECTS = [
    {
        name: "Zjra Task Management",
        url: "https://zjra.meetdy.com",
        icon: ListTodo,
    },
];

export function NavProjects() {
    const { t } = useTranslation();
    const handleDirectUrl = (url: string) => {
        window.open(url, "_blank");
    };

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>{t("app.projects")}</SidebarGroupLabel>
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
                        <span>{t("common.more")}</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
}
