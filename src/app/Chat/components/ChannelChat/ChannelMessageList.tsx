import { memo, useRef, useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChannelMessageItem from "./ChannelMessageItem";
import { ChannelMessage } from "@/hooks/channel/useChannelChat";
import { cn } from "@/lib/utils";

interface ChannelMessageListProps {
    messages: ChannelMessage[];
    currentUserId: string;
    isLoading: boolean;
    isLoadingMore: boolean;
    hasMore: boolean;
    onLoadMore: () => void;
    onDelete: (messageId: string) => void;
    onPin: (messageId: string) => void;
    onUnpin: (messageId: string) => void;
    onReply: (message: ChannelMessage) => void;
    onMediaClick: (url: string, type: string, name: string) => void;
    onRetryUpload?: (messageId: string) => void;
    isPinned: (messageId: string) => boolean;
    typingUsers: string[];
    className?: string;
}

const ChannelMessageList = ({
    messages,
    currentUserId,
    isLoading,
    isLoadingMore,
    hasMore,
    onLoadMore,
    onDelete,
    onPin,
    onUnpin,
    onReply,
    onMediaClick,
    onRetryUpload,
    isPinned,
    typingUsers,
    className,
}: ChannelMessageListProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages.length]);

    useEffect(() => {
        if (!loadMoreTriggerRef.current || !hasMore) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
                    onLoadMore();
                }
            },
            { threshold: 0.1 }
        );

        observerRef.current.observe(loadMoreTriggerRef.current);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [hasMore, isLoadingMore, onLoadMore]);

    const shouldShowAvatar = useCallback(
        (message: ChannelMessage, index: number) => {
            if (index === 0) return true;
            const prevMessage = messages[index - 1];
            if (!prevMessage) return true;
            return prevMessage.user?._id !== message.user?._id;
        },
        [messages]
    );

    const isFirstInGroup = useCallback(
        (message: ChannelMessage, index: number) => {
            if (index === 0) return true;
            const prevMessage = messages[index - 1];
            if (!prevMessage) return true;
            return prevMessage.user?._id !== message.user?._id;
        },
        [messages]
    );

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (messages.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                    <p className="text-lg font-medium">No messages yet</p>
                    <p className="text-sm">Start the conversation!</p>
                </div>
            </div>
        );
    }

    return (
        <ScrollArea className={cn("flex-1", className)} ref={scrollRef}>
            <div className="py-4">
                {hasMore && (
                    <div
                        ref={loadMoreTriggerRef}
                        className="flex items-center justify-center py-4"
                    >
                        {isLoadingMore ? (
                            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        ) : (
                            <span className="text-sm text-muted-foreground">Load more messages</span>
                        )}
                    </div>
                )}

                {messages.map((message, index) => (
                    <ChannelMessageItem
                        key={message._id}
                        message={message}
                        isOwn={message.user?._id === currentUserId}
                        showAvatar={shouldShowAvatar(message, index)}
                        isFirstInGroup={isFirstInGroup(message, index)}
                        onDelete={onDelete}
                        onPin={onPin}
                        onUnpin={onUnpin}
                        onReply={onReply}
                        onMediaClick={onMediaClick}
                        onRetryUpload={onRetryUpload}
                        isPinned={isPinned(message._id)}
                    />
                ))}

                {typingUsers.length > 0 && (
                    <div className="px-4 py-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" />
                                <span
                                    className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"
                                    style={{ animationDelay: "0.1s" }}
                                />
                                <span
                                    className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"
                                    style={{ animationDelay: "0.2s" }}
                                />
                            </div>
                            <span>
                                {typingUsers.length === 1
                                    ? `${typingUsers[0]} is typing...`
                                    : `${typingUsers.length} people are typing...`}
                            </span>
                        </div>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>
        </ScrollArea>
    );
};

export default memo(ChannelMessageList);
