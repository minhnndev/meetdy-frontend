import SuggestCard from "@/app/Friend/components/SuggestCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/redux/store";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const SubtabFriend = () => {
    const { t } = useTranslation();
    const { requestFriends, myRequestFriend, suggestFriends } = useAppSelector(
        (state) => state.friend
    );
    return (
        <div className="h-full">
            <ScrollArea className="h-full px-6 py-3">
                <div>
                    <span className="text-sm px-6 font-semibold">
                        {t("common.requestFriend", {
                            count: requestFriends.length ?? 0,
                        })}
                    </span>
                </div>
                <div>
                    <span className="text-sm px-6 font-semibold">
                        {t("common.myRequestFriend", {
                            count: myRequestFriend.length ?? 0,
                        })}
                    </span>
                </div>
                <div>
                    <span className="text-sm px-6 font-semibold">
                        {t("common.suggestFriend", {
                            count:
                                suggestFriends.filter((suggest) => suggest.status === "NOT_FRIEND")
                                    .length ?? 0,
                        })}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6 px-6 py-3">
                        {suggestFriends
                            ?.filter((suggest) => suggest.status === "NOT_FRIEND")
                            .map((suggest) => <SuggestCard key={suggest._id} suggest={suggest} />)}
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};

export default memo(SubtabFriend);
