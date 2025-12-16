import { memo } from "react";
import { IUser } from "@/models/auth.model";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat/chat-bubble";

interface TypingIndicatorProps {
    users: IUser[];
}

const TypingIndicator = memo(({ users }: TypingIndicatorProps) => {
    if (!users.length) return null;

    const getTypingText = () => {
        if (users.length === 1) {
            return `${users[0].name} is typing`;
        } else if (users.length === 2) {
            return `${users[0].name} and ${users[1].name} are typing`;
        } else {
            return `${users[0].name} and ${users.length - 1} others are typing`;
        }
    };

    return (
        <ChatBubble variant="received">
            <ChatBubbleAvatar
                src={users[0]?.avatar}
                fallback={users[0]?.name?.[0]?.toUpperCase() || "U"}
                className="w-8 h-8"
            />
            <div className="flex flex-col">
                <span className="text-xs text-muted-foreground mb-1 ml-1">
                    {getTypingText()}
                </span>
                <ChatBubbleMessage variant="received" isLoading />
            </div>
        </ChatBubble>
    );
});

TypingIndicator.displayName = "TypingIndicator";

export default TypingIndicator;
