import AvatarBase from "@/components/common/AvatarBase";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IFriend } from "@/models/friend.model";
import dateUtils from "@/utils/dateUtils";
import { Ellipsis, Info, Trash2 } from "lucide-react";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface FriendItemProps {
    friend: IFriend;
}
const FriendItem = ({ friend }: FriendItemProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { name, lastLogin } = friend;

    const handleClickItem = useCallback(() => {
        navigate("/chat");
    }, [navigate]);

    return (
        <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md">
            <div className="flex items-center space-x-4 cursor-pointer">
                <AvatarBase src={friend.avatar} placeholder={friend.name} />
                <div onClick={handleClickItem}>
                    <p className="text-sm truncate">{name}</p>
                    {lastLogin && (
                        <p className="text-xs text-gray-500">
                            {t("common.lastLogin", { time: dateUtils.toTime(lastLogin) })}
                        </p>
                    )}
                </div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon">
                        <Ellipsis />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <Info />
                        <span>{t("common.viewInfo")}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">
                        <Trash2 />
                        <span>{t("common.deleteFriend")}</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default memo(FriendItem);
