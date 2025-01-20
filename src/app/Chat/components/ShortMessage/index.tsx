import { cn } from "@/lib/utils";
import { IClassify } from "@/models/classify.model";
import { ILastGroupMessage, ILastIndividualMessage } from "@/models/message.model";
import { useAppSelector } from "@/redux/store";
import { BookmarkMinus, BookmarkPlus, Edit, Hash, Key, User, UserPlus } from "lucide-react";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

interface ShortMessageProps {
    message: ILastIndividualMessage | ILastGroupMessage;
    type: boolean;
    numberUnread: number;
    classify: IClassify;
}
const ShortMessage = ({ message, type, numberUnread, classify }: ShortMessageProps) => {
    const { t } = useTranslation();
    const { user } = useAppSelector((state) => state.global);
    const { content, isDeleted } = message;

    const renderName = useMemo(() => {
        return message.user._id === user?._id
            ? `${t("common.you")}: `
            : type
              ? `${message.user.name}: `
              : "";
    }, [message.user._id, message.user.name, t, type, user?._id]);

    const renderNotifyMessage = useMemo(() => {
        if (content.startsWith("Đã đổi tên nhóm thành")) {
            return (
                <>
                    {renderName} <Edit className="inline-block w-4 h-4" />
                    {t("common.groupRenamed", {
                        name: renderName,
                    })}
                </>
            );
        }

        const notifyContent: { [key: string]: JSX.Element } = {
            "Đã là bạn bè": (
                <>
                    {renderName} <User className="inline-block w-4 h-4" />{" "}
                    {t("common.becomeFriends", { name: renderName })}
                </>
            ),
            PIN_MESSAGE: (
                <>
                    {renderName} <BookmarkPlus className="inline-block w-4 h-4" />{" "}
                    {t("common.pinnedMessage", { name: renderName })}
                </>
            ),
            NOT_PIN_MESSAGE: (
                <>
                    {renderName} <BookmarkMinus className="inline-block w-4 h-4" />{" "}
                    {t("common.unpinnedMessage", { name: renderName })}
                </>
            ),
            "Đã thêm vào nhóm": (
                <>
                    {renderName} <UserPlus className="inline-block w-4 h-4" />{" "}
                    {t("common.addedToGroup", { name: renderName })}
                </>
            ),
            "Đã xóa ra khỏi nhóm": (
                <>
                    {renderName} {t("common.removedFromGroup", { name: renderName })}
                </>
            ),
            "Đã rời khỏi nhóm": <>{t("common.leftGroup", { name: renderName })}</>,
            "Tham gia từ link": <>{t("common.joinedGroup", { name: renderName })}</>,
            UPDATE_CHANNEL: (
                <>
                    {renderName} <Hash className="inline-block w-4 h-4" />{" "}
                    {t("common.channelRenamed", { name: renderName })}
                </>
            ),
            DELETE_CHANNEL: (
                <>
                    {renderName} <Hash className="inline-block w-4 h-4" />{" "}
                    {t("common.channelDeleted", { name: renderName })}
                </>
            ),
            CREATE_CHANNEL: (
                <>
                    {renderName} <Hash className="inline-block w-4 h-4" />{" "}
                    {t("common.channelCreated", { name: renderName })}
                </>
            ),
            "Ảnh đại diện nhóm đã thay đổi": (
                <>
                    {renderName} <Edit className="inline-block w-4 h-4" />{" "}
                    {t("common.avatarUpdated")}
                </>
            ),
            ADD_MANAGERS: (
                <>
                    {renderName} <Key className="inline-block w-4 h-4" />{" "}
                    {t("common.addedManager", { name: renderName })}
                </>
            ),
            DELETE_MANAGERS: (
                <>
                    {renderName} <Key className="inline-block w-4 h-4" />{" "}
                    {t("common.removedManager", { name: renderName })}
                </>
            ),
        };

        return notifyContent[message.content] || message.content;
    }, [content, message.content, renderName, t]);

    const renderMessage = useMemo(() => {
        switch (message.type) {
            case "TEXT":
                return `${renderName} ${content}`;
            case "HTML":
                return `${renderName} ${t("common.sentDocument")}`;
            case "IMAGE":
                return `${renderName} ${t("common.sentImage")}`;
            case "VIDEO":
                return `${renderName} ${t("common.sentVideo")}`;
            case "FILE":
                return `${renderName} ${t("common.sentFile")}`;
            case "STICKER":
                return `${renderName} ${t("common.sentSticker")}`;
            case "VOTE":
                return `${renderName} ${t("common.sentVote")}`;
            case "NOTIFY":
                return renderNotifyMessage;
        }
    }, [content, message.type, renderName, renderNotifyMessage, t]);

    return (
        <>
            {isDeleted ? (
                <span>
                    {t("common.recalledMessage", {
                        name: renderName,
                    })}
                </span>
            ) : (
                <p
                    className={cn(
                        numberUnread > 0 ? "truncate text-xs" : "text-sidebar-foreground",
                        classify ? "w-40" : "w-44",
                        "truncate text-sm"
                    )}
                >
                    {renderMessage}
                </p>
            )}
        </>
    );
};

export default memo(ShortMessage);
