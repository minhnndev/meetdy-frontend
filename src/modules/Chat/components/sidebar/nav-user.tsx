"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/redux/store";

import { BadgeCheck, ChevronsUpDown, KeyRound, LogOut, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";

import { ChangePasswordModal, UpdateProfileModal } from "../common";

export function NavUser() {
    const { isMobile } = useSidebar();

    const { user: dataUser } = useAppSelector((state) => state.global);

    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.reload();
    };

    const handleUpgradePlanClick = () => {
        window.open("https://meetdy.com/pricing", "_blank");
    };

    return (
        <>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={dataUser.avatar} alt={dataUser.name} />
                                    <AvatarFallback className="rounded-lg">
                                        {dataUser.username}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{dataUser.name}</span>
                                    <span className="truncate text-xs">{dataUser.username}</span>
                                </div>
                                <ChevronsUpDown className="ml-auto size-4" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                            side={isMobile ? "bottom" : "right"}
                            align="end"
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={dataUser.avatar} alt={dataUser.name} />
                                        <AvatarFallback className="rounded-lg">
                                            {dataUser.name}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            {dataUser.name}
                                        </span>
                                        <span className="truncate text-xs">
                                            {dataUser.username}
                                        </span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={handleUpgradePlanClick}>
                                    <Sparkles />
                                    Upgrade to Pro
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={() => setShowUpdateProfileModal(true)}>
                                    <BadgeCheck />
                                    Account
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuItem
                                onClick={() => {
                                    setShowChangePasswordModal(true);
                                }}
                            >
                                <KeyRound />
                                Change Password
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOut />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
            <UpdateProfileModal
                visible={showUpdateProfileModal}
                onCancel={() => setShowUpdateProfileModal(false)}
            />
            <ChangePasswordModal
                visible={showChangePasswordModal}
                onCancel={() => setShowChangePasswordModal(false)}
                onSaveCodeRevoke={true}
            />
        </>
    );
}
