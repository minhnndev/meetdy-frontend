import AvatarBase from "@/components/common/AvatarBase";
import { Card, CardContent } from "@/components/ui/card";
import { ISuggestFriend } from "@/models/friend.model";
import { memo } from "react";
import { useTranslation } from "react-i18next";

interface SuggestCardProps {
    suggest: ISuggestFriend;
}
const SuggestCard = ({ suggest }: SuggestCardProps) => {
    const { t } = useTranslation();
    const { avatar, name, numberCommonFriend, numberCommonGroup } = suggest;

    return (
        <Card className="shadow hover:shadow-lg cursor-pointer w-full min-w-[200px] max-w-sm">
            <CardContent className="flex flex-col items-center justify-between p-6 text-center">
                <AvatarBase src={avatar} placeholder={name} className="w-20 h-20" />
                <h6 className="mt-4 text-lg font-semibold truncate max-w-full">{name}</h6>
                <p className="text-sm text-muted-foreground mt-1">
                    {t("common.commonGroups", { count: numberCommonGroup })}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                    {t("common.commonFriends", { count: numberCommonFriend })}
                </p>
            </CardContent>
        </Card>
    );
};

export default memo(SuggestCard);
