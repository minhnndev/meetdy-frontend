import { memo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
    Reply,
    Forward,
    Pin,
    Copy,
    Trash2,
    MoreHorizontal,
    SmilePlus,
    Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ILastGroupMessage, ILastIndividualMessage } from "@/models/message.model";
import EmojiPicker from "./EmojiPicker";
import { toast } from "sonner";
import { useDropReaction } from "@/hooks/message/useDropReaction";
import { useDeleteMessageClientSide } from "@/hooks/message/useDeleteMessageClientSide";
import { useRedoMessage } from "@/hooks/message/useRedoMessage";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setReplyMessage, deleteMessage } from "@/redux/slice/chat/chatSlice";

const emojiToReactionType: Record<string, string> = {
    "👍": "LIKE",
    "❤️": "HEART",
    "😂": "HAHA",
    "😮": "WOW",
    "😢": "SAD",
    "😡": "ANGRY",
    "🎉": "CELEBRATE",
    "🔥": "FIRE",
};

interface MessageActionsProps {
    message: ILastGroupMessage | ILastIndividualMessage;
    variant: "sent" | "received";
}

const MessageActions = memo(({ message, variant }: MessageActionsProps) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.global);

    const dropReactionMutation = useDropReaction();
    const deleteClientSideMutation = useDeleteMessageClientSide();
    const redoMessageMutation = useRedoMessage();

    const isOwnMessage = message.user?._id === user?._id;
    const isLoading = dropReactionMutation.isPending || deleteClientSideMutation.isPending || redoMessageMutation.isPending;

    const handleCopy = () => {
        navigator.clipboard.writeText(message.content);
        toast.success("Message copied to clipboard");
    };

    const handleReply = () => {
        dispatch(setReplyMessage(message));
    };

    const handleForward = () => {
        toast.info("Forward feature coming soon");
    };

    const handlePin = () => {
        toast.info("Pin feature coming soon");
    };

    const handleDelete = () => {
        if (isOwnMessage) {
            redoMessageMutation.mutate(message._id, {
                onSuccess: () => {
                    toast.success("Message deleted");
                },
                onError: () => {
                    toast.error("Failed to delete message");
                },
            });
        } else {
            deleteClientSideMutation.mutate(message._id, {
                onSuccess: () => {
                    dispatch(deleteMessage(message._id));
                    toast.success("Message hidden");
                },
                onError: () => {
                    toast.error("Failed to hide message");
                },
            });
        }
    };

    const handleReact = (emoji: string) => {
        setShowEmojiPicker(false);
        const reactionType = emojiToReactionType[emoji] || emoji;
        dropReactionMutation.mutate(
            { idMessage: message._id, type: reactionType },
            {
                onError: () => {
                    toast.error("Failed to add reaction");
                },
            }
        );
    };

    return (
        <div
            className={cn(
                "absolute top-1/2 -translate-y-1/2 flex items-center gap-0.5 opacity-0 group-hover/message:opacity-100 transition-all duration-200 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg border p-0.5",
                variant === "sent"
                    ? "-left-2 -translate-x-full"
                    : "-right-2 translate-x-full"
            )}
        >
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
                    <Loader2 className="h-4 w-4 animate-spin" />
                </div>
            )}
            <div className="relative">
                <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 hover:bg-accent"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    disabled={isLoading}
                >
                    <SmilePlus className="h-4 w-4" />
                </Button>
                {showEmojiPicker && (
                    <EmojiPicker
                        onSelect={handleReact}
                        onClose={() => setShowEmojiPicker(false)}
                        position={variant === "sent" ? "left" : "right"}
                    />
                )}
            </div>
            <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 hover:bg-accent"
                onClick={handleReply}
                disabled={isLoading}
            >
                <Reply className="h-4 w-4" />
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost" className="h-7 w-7 hover:bg-accent" disabled={isLoading}>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={variant === "sent" ? "start" : "end"} className="w-48">
                    <DropdownMenuItem onClick={handleReply}>
                        <Reply className="h-4 w-4 mr-2" />
                        Reply
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleForward}>
                        <Forward className="h-4 w-4 mr-2" />
                        Forward
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handlePin}>
                        <Pin className="h-4 w-4 mr-2" />
                        Pin message
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCopy}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy text
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        {isOwnMessage ? "Delete for everyone" : "Hide message"}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
});

MessageActions.displayName = "MessageActions";

export default MessageActions;
