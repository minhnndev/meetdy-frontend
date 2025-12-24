import { memo, useState, useCallback } from "react";
import { useChannelChat, ChannelMessage } from "@/hooks/channel/useChannelChat";
import { usePinnedMessages } from "@/hooks/channel/usePinnedMessages";
import { useMediaManager } from "@/hooks/media/useMediaManager";
import { useAppSelector } from "@/redux/store";
import ChannelMessageList from "./ChannelMessageList";
import ChannelMessageInput from "./ChannelMessageInput";
import PinnedMessageBar from "./PinnedMessageBar";
import MediaPreview from "./MediaPreview";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChannelChatProps {
    channelId: string;
    conversationId: string;
    className?: string;
}

const ChannelChat = ({ channelId, conversationId, className }: ChannelChatProps) => {
    const { user } = useAppSelector((state) => state.global);
    const [replyMessage, setReplyMessage] = useState<ChannelMessage | null>(null);
    const [showPinnedBar, setShowPinnedBar] = useState(true);

    const {
        messages,
        isLoading,
        isLoadingMore,
        hasNextPage,
        error: chatError,
        loadMore,
        sendMessage,
        sendFileMessage,
        deleteMessage,
        retryUpload,
        typingUsers,
        setTyping,
    } = useChannelChat({
        channelId,
        conversationId,
        enabled: !!channelId && !!conversationId,
    });

    const {
        pinnedMessages,
        pinMessage,
        unpinMessage,
        isPinned,
        currentPinnedIndex,
        navigatePinned,
    } = usePinnedMessages({
        conversationId,
        enabled: !!conversationId,
    });

    const {
        selectedMedia,
        isPreviewOpen,
        openPreview,
        closePreview,
        navigateMedia,
        media,
    } = useMediaManager({
        conversationId,
        enabled: !!conversationId,
    });

    const handleReply = useCallback((message: ChannelMessage) => {
        setReplyMessage(message);
    }, []);

    const handleCancelReply = useCallback(() => {
        setReplyMessage(null);
    }, []);

    const handleMediaClick = useCallback(
        (url: string, type: string, name: string) => {
            openPreview({
                id: url,
                name,
                type,
                url,
                createdAt: new Date().toISOString(),
                senderId: user?._id || "",
            });
        },
        [openPreview, user]
    );

    const handlePinnedMessageClick = useCallback((messageId: string) => {
        const element = document.getElementById(`message-${messageId}`);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            element.classList.add("bg-yellow-100/50");
            setTimeout(() => {
                element.classList.remove("bg-yellow-100/50");
            }, 2000);
        }
    }, []);

    const handleRetryUpload = useCallback(
        async (messageId: string) => {
            await retryUpload(messageId);
        },
        [retryUpload]
    );

    if (chatError) {
        return (
            <div className={cn("flex flex-col items-center justify-center h-full gap-4", className)}>
                <AlertCircle className="h-12 w-12 text-destructive" />
                <p className="text-lg font-medium">Failed to load messages</p>
                <p className="text-sm text-muted-foreground">{chatError.message}</p>
                <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col h-full", className)}>
            {showPinnedBar && pinnedMessages.length > 0 && (
                <PinnedMessageBar
                    pinnedMessages={pinnedMessages}
                    currentIndex={currentPinnedIndex}
                    onNavigate={navigatePinned}
                    onClose={() => setShowPinnedBar(false)}
                    onMessageClick={handlePinnedMessageClick}
                />
            )}

            <ChannelMessageList
                messages={messages}
                currentUserId={user?._id || ""}
                isLoading={isLoading}
                isLoadingMore={isLoadingMore}
                hasMore={hasNextPage}
                onLoadMore={loadMore}
                onDelete={deleteMessage}
                onPin={pinMessage}
                onUnpin={unpinMessage}
                onReply={handleReply}
                onMediaClick={handleMediaClick}
                onRetryUpload={handleRetryUpload}
                isPinned={isPinned}
                typingUsers={typingUsers}
            />

            <ChannelMessageInput
                onSend={sendMessage}
                onSendFile={sendFileMessage}
                onTyping={setTyping}
                replyMessage={replyMessage}
                onCancelReply={handleCancelReply}
            />

            <MediaPreview
                media={selectedMedia}
                isOpen={isPreviewOpen}
                onClose={closePreview}
                onNavigate={navigateMedia}
                hasNext={media.length > 1}
                hasPrev={media.length > 1}
            />
        </div>
    );
};

export default memo(ChannelChat);

export { default as ChannelMessageList } from "./ChannelMessageList";
export { default as ChannelMessageInput } from "./ChannelMessageInput";
export { default as ChannelMessageItem } from "./ChannelMessageItem";
export { default as PinnedMessageBar } from "./PinnedMessageBar";
export { default as MediaPreview } from "./MediaPreview";
