import ConversationAvatar from "@/app/Chat/components/ConversationAvatar";
import ShortMessage from "@/app/Chat/components/ShortMessage";
import { checkAndFetchChannel } from "@/hooks/channel/useFetchChannel";
import { checkAndFetchLastViewOfMembers } from "@/hooks/conversation/useFetchLastViewOfMembers";
import { checkAndFetchMemberInConversation } from "@/hooks/conversation/useFetchMemberInConversation";
import { checkAndFetchListMessages } from "@/hooks/message/useFetchListMessages";
import { cn } from "@/lib/utils";
import { IClassify } from "@/models/classify.model";
import { IGroupConversation, IIndividualConversation } from "@/models/conversation.model";
import {
    setChannels,
    setCurrentChannel,
    setLastViewOfMember,
    setMemberInConversation,
    setMessages,
    setTypeOfConversation,
} from "@/redux/slice/chat/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Pin, BellOff, MoreHorizontal } from "lucide-react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { toast } from "sonner";

interface ConversationItemProps {
    conversation: IGroupConversation | IIndividualConversation;
}

const ConversationItem = ({ conversation }: ConversationItemProps) => {
    const { _id, name, totalMembers, lastMessage, numberUnread, isNotify } = conversation;
    const dispatch = useAppDispatch();
    const { currentConversation } = useAppSelector((state) => state.chat);
    const isActive = currentConversation === _id;
    const isOnline = !conversation.type && (conversation as IIndividualConversation)?.isOnline;

    const onClickConversation = async () => {
        dispatch(setCurrentChannel(""));
        const lastViewOfMembers = await checkAndFetchLastViewOfMembers(_id);
        dispatch(setLastViewOfMember(lastViewOfMembers));
        const messages = await checkAndFetchListMessages({
            conversationId: _id,
            size: 10,
        });
        dispatch(
            setMessages({
                conversationId: _id,
                messages: {
                    data: messages.data,
                    page: messages.page,
                    totalPages: messages.totalPages,
                },
            })
        );

        const members = await checkAndFetchMemberInConversation(_id);
        dispatch(setMemberInConversation(members));
        dispatch(setTypeOfConversation(_id));
        const channels = await checkAndFetchChannel(_id);
        dispatch(setChannels(channels));
    };

    const handlePin = () => {
        toast.info("Pin conversation");
    };

    const handleMute = () => {
        toast.info(isNotify ? "Mute notifications" : "Unmute notifications");
    };

    const handleMore = () => {
        toast.info("More options");
    };

    if (!lastMessage) return null;

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div
                    key={_id}
                    className={cn(
                        "group flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-xl transition-all duration-200",
                        isActive
                            ? "bg-primary/10 hover:bg-primary/15"
                            : "hover:bg-sidebar-accent"
                    )}
                    onClick={onClickConversation}
                >
                    <div className="relative flex-shrink-0">
                        <ConversationAvatar
                            conversation={conversation}
                            totalMembers={totalMembers}
                        />
                        {isOnline && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                            <p
                                className={cn(
                                    "text-sm truncate",
                                    numberUnread > 0 ? "font-semibold text-foreground" : "font-medium"
                                )}
                                title={name}
                            >
                                {name}
                            </p>
                            <div className="flex items-center gap-1 flex-shrink-0">
                                {!isNotify && (
                                    <BellOff className="h-3 w-3 text-muted-foreground" />
                                )}
                                <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                                    {lastMessage?.createdAt}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-0.5">
                            <div className="flex-1 min-w-0">
                                <ShortMessage
                                    message={lastMessage}
                                    type={conversation.type}
                                    numberUnread={numberUnread}
                                    classify={{} as IClassify}
                                />
                            </div>
                            {numberUnread > 0 && (
                                <span
                                    className={cn(
                                        "flex-shrink-0 text-[11px] font-medium text-white rounded-full min-w-5 h-5 flex items-center justify-center px-1.5",
                                        numberUnread > 99 ? "bg-red-500" : "bg-primary"
                                    )}
                                >
                                    {numberUnread > 99 ? "99+" : numberUnread}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-48">
                <ContextMenuItem onClick={handlePin}>
                    <Pin className="h-4 w-4 mr-2" />
                    Pin conversation
                </ContextMenuItem>
                <ContextMenuItem onClick={handleMute}>
                    <BellOff className="h-4 w-4 mr-2" />
                    {isNotify ? "Mute notifications" : "Unmute notifications"}
                </ContextMenuItem>
                <ContextMenuItem onClick={handleMore}>
                    <MoreHorizontal className="h-4 w-4 mr-2" />
                    More options
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};

export default ConversationItem;
