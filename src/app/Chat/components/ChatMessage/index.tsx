import {
    ChatBubble,
    ChatBubbleAvatar,
    ChatBubbleMessage,
    ChatBubbleTimestamp,
} from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { useAppSelector } from "@/redux/store";
import { memo, useMemo } from "react";
import { ILastGroupMessage, ILastIndividualMessage } from "@/models/message.model";
import { format, isToday, isYesterday } from "date-fns";
import MessageReactions from "./MessageReactions";
import MessageActions from "./MessageActions";
import TypingIndicator from "./TypingIndicator";
import { cn } from "@/lib/utils";

const formatMessageTime = (dateString: string) => {
    try {
        const date = new Date(dateString);
        if (isToday(date)) {
            return format(date, "HH:mm");
        } else if (isYesterday(date)) {
            return `Yesterday ${format(date, "HH:mm")}`;
        }
        return format(date, "MMM d, HH:mm");
    } catch {
        return dateString;
    }
};

const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
};

interface MessageItemProps {
    message: ILastGroupMessage | ILastIndividualMessage;
    isSent: boolean;
    showAvatar: boolean;
    isFirstInGroup: boolean;
}

const MessageItem = memo(({ message, isSent, showAvatar, isFirstInGroup }: MessageItemProps) => {
    const variant = isSent ? "sent" : "received";

    if (message.isDeleted) {
        return (
            <ChatBubble variant={variant}>
                {showAvatar && !isSent && (
                    <ChatBubbleAvatar
                        src={message.user?.avatar}
                        fallback={getInitials(message.user?.name)}
                        className="w-8 h-8"
                    />
                )}
                {!showAvatar && !isSent && <div className="w-8" />}
                <div className="flex flex-col">
                    {isFirstInGroup && !isSent && (
                        <span className="text-xs text-muted-foreground mb-1 ml-1">
                            {message.user?.name}
                        </span>
                    )}
                    <ChatBubbleMessage variant={variant} className="italic text-muted-foreground">
                        This message was deleted
                    </ChatBubbleMessage>
                </div>
            </ChatBubble>
        );
    }

    return (
        <ChatBubble variant={variant} className="group/message">
            {showAvatar && !isSent && (
                <ChatBubbleAvatar
                    src={message.user?.avatar}
                    fallback={getInitials(message.user?.name)}
                    className="w-8 h-8"
                />
            )}
            {!showAvatar && !isSent && <div className="w-8" />}
            <div className="flex flex-col relative">
                {isFirstInGroup && !isSent && (
                    <span className="text-xs text-muted-foreground mb-1 ml-1">
                        {message.user?.name}
                    </span>
                )}
                <div className="relative">
                    <ChatBubbleMessage variant={variant}>
                        {message.replyMessage && (
                            <div
                                className={cn(
                                    "text-xs p-2 mb-2 rounded border-l-2",
                                    isSent
                                        ? "bg-primary/20 border-primary-foreground/50"
                                        : "bg-muted border-muted-foreground/50"
                                )}
                            >
                                <span className="font-medium">
                                    {message.replyMessage.user?.name}
                                </span>
                                <p className="truncate opacity-75">
                                    {message.replyMessage.content}
                                </p>
                            </div>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <ChatBubbleTimestamp
                            timestamp={formatMessageTime(message.createdAt)}
                            className={cn(
                                "text-[10px] opacity-70",
                                isSent ? "text-primary-foreground/70" : "text-muted-foreground"
                            )}
                        />
                    </ChatBubbleMessage>
                    <MessageActions message={message} variant={variant} />
                </div>
                {message.reacts && message.reacts.length > 0 && (
                    <MessageReactions reactions={message.reacts} messageId={message._id} />
                )}
            </div>
        </ChatBubble>
    );
});

MessageItem.displayName = "MessageItem";

const ChatMessage = () => {
    const { messages, usersTyping } = useAppSelector((state) => state.chat);
    const { user } = useAppSelector((state) => state.global);

    const groupedMessages = useMemo(() => {
        if (!messages.length) return [];

        return messages.map((message, index) => {
            const prevMessage = messages[index - 1];
            const isSameUser = prevMessage?.user?._id === message.user?._id;
            const prevTime = prevMessage ? new Date(prevMessage.createdAt).getTime() : 0;
            const currTime = new Date(message.createdAt).getTime();
            const isWithinTimeWindow = currTime - prevTime < 60000;
            const isFirstInGroup = !isSameUser || !isWithinTimeWindow;

            return {
                ...message,
                showAvatar: isFirstInGroup,
                isFirstInGroup,
            };
        });
    }, [messages]);

    if (!messages.length) {
        return (
            <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                    <p className="text-lg font-medium">No messages yet</p>
                    <p className="text-sm">Start the conversation!</p>
                </div>
            </div>
        );
    }

    return (
        <ChatMessageList className="px-4">
            {groupedMessages.map((message) => (
                <MessageItem
                    key={message._id}
                    message={message}
                    isSent={message.user?._id === user?._id}
                    showAvatar={message.showAvatar}
                    isFirstInGroup={message.isFirstInGroup}
                />
            ))}
            {usersTyping.length > 0 && <TypingIndicator users={usersTyping} />}
        </ChatMessageList>
    );
};

export default memo(ChatMessage);
