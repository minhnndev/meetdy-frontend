import { FRIEND_SUB_TABS } from "@/constants/friend.constant";
import { cn } from "@/lib/utils";
import { memo } from "react";

interface FriendHeaderProps {
    subtab: string;
}

const FriendHeader = ({ subtab }: FriendHeaderProps) => {
    const { text, icon } = FRIEND_SUB_TABS.find((tab) => tab.key === subtab) || {};

    return (
        <div
            className={cn(
                "sticky top-0 z-10 flex items-center border-b border-border bg-white p-2 h-[53px]",
                !text && "hidden"
            )}
        >
            <div className="mx-4 flex justify-center items-center">{icon?.(20)}</div>
            <h4 className="text-lg font-semibold">{text}</h4>
        </div>
    );
};

export default memo(FriendHeader);
