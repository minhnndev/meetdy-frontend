import { useAppSelector } from "@/redux/store";
import { useState } from "react";
import { BadgeCheck, ChevronsUpDown, KeyRound, LogOut, Sparkles } from "lucide-react";
import AvatarBase from "@/components/common/AvatarBase";
import ChangePasswordDialog from "@/components/common/Dialogs/ChangePasswordDialog";
import UpdateProfileDialog from "@/components/common/Dialogs/UpdateProfileDialog";
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
import { useTranslation } from "react-i18next";

export function NavUser() {
    const { isMobile } = useSidebar();
    const { t } = useTranslation();

    const { user: dataUser } = useAppSelector((state) => state.global);

    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [showUpdateProfileDialog, setShowUpdateProfileDialog] = useState(false);

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
                                <AvatarBase
                                    src={dataUser?.avatar}
                                    alt={dataUser?.name}
                                    placeholder={dataUser?.name}
                                />
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{dataUser?.name}</span>
                                    <span className="truncate text-xs">{dataUser?.username}</span>
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
                                    <AvatarBase
                                        src={dataUser?.avatar}
                                        alt={dataUser?.name}
                                        placeholder={dataUser?.name}
                                    />
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            {dataUser?.name}
                                        </span>
                                        <span className="truncate text-xs">
                                            {dataUser?.username}
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
                                <DropdownMenuItem onClick={() => setShowUpdateProfileDialog(true)}>
                                    <BadgeCheck />
                                    {t("common.account")}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuItem
                                onClick={() => {
                                    setShowChangePasswordModal(true);
                                }}
                            >
                                <KeyRound />
                                {t("common.changePassword")}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOut />
                                {t("common.logout")}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
            <UpdateProfileDialog
                visible={showUpdateProfileDialog}
                onCancel={() => setShowUpdateProfileDialog(false)}
            />
            <ChangePasswordDialog
                visible={showChangePasswordModal}
                onCancel={() => setShowChangePasswordModal(false)}
            />
        </>
    );
}
