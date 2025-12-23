import { useAppSelector } from "@/redux/store";
import { useState } from "react";
import { BadgeCheck, KeyRound, LogOut, Sparkles } from "lucide-react";
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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";

export function NavUser() {
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
            <div className="flex items-center justify-center">
                <DropdownMenu>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                    <AvatarBase
                                        src={dataUser?.avatar}
                                        alt={dataUser?.name}
                                        placeholder={dataUser?.name}
                                        className="w-8 h-8"
                                    />
                                </button>
                            </DropdownMenuTrigger>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={10}>
                            {dataUser?.name || t("common.account")}
                        </TooltipContent>
                    </Tooltip>
                    <DropdownMenuContent
                        className="w-56 rounded-lg"
                        side="right"
                        align="end"
                        sideOffset={10}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-2 py-2 text-left text-sm">
                                <AvatarBase
                                    src={dataUser?.avatar}
                                    alt={dataUser?.name}
                                    placeholder={dataUser?.name}
                                    className="w-8 h-8"
                                />
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {dataUser?.name}
                                    </span>
                                    <span className="truncate text-xs text-muted-foreground">
                                        {dataUser?.username}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={handleUpgradePlanClick}>
                                <Sparkles className="w-4 h-4 mr-2" />
                                Upgrade to Pro
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => setShowUpdateProfileDialog(true)}>
                                <BadgeCheck className="w-4 h-4 mr-2" />
                                {t("common.account")}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setShowChangePasswordModal(true)}>
                                <KeyRound className="w-4 h-4 mr-2" />
                                {t("common.changePassword")}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOut className="w-4 h-4 mr-2" />
                            {t("common.logout")}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
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
