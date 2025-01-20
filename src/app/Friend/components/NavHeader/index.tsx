import FriendItem from "@/app/Friend/components/FriendItem";
import NavAction from "@/components/layout/NavAction";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FRIEND_SUB_TABS } from "@/constants/friend.constant";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/store";
import { memo } from "react";
import { useTranslation } from "react-i18next";

interface NavHeaderProps {
    subTab?: string;
    setSubTab?: (subTab: string) => void;
}
const NavHeader = ({ subTab, setSubTab }: NavHeaderProps) => {
    const { t } = useTranslation();
    const { friends } = useAppSelector((state) => state.friend);

    return (
        <div className="flex flex-col divide-y divide-borde h-full">
            <NavAction />
            <div className="flex flex-col p-2">
                {FRIEND_SUB_TABS.map((tab) => (
                    <div
                        key={tab.key}
                        className={cn(
                            "flex items-center gap-4 w-full p-2 rounded-md cursor-pointer hover:bg-muted",
                            subTab === tab.key
                                ? "bg-sidebar-accent text-primary"
                                : "text-muted-foreground"
                        )}
                        onClick={() => setSubTab?.(tab.key)}
                    >
                        {tab.icon(18)}
                        <span className="text-sm">{tab.text}</span>
                    </div>
                ))}
            </div>
            <div className="flex flex-col flex-grow min-h-0">
                <div className="p-2">
                    <span className="text-sm text-muted-foreground">
                        {t("common.friendCount", {
                            count: friends.length,
                        })}
                    </span>
                </div>
                <ScrollArea className="h-full p-2">
                    <div className="space-y-2">
                        {friends.map((friend) => (
                            <FriendItem key={friend._id} friend={friend} />
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};

export default memo(NavHeader);
