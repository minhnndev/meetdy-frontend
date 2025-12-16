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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ILastGroupMessage, ILastIndividualMessage } from "@/models/message.model";
import EmojiPicker from "./EmojiPicker";
import { toast } from "sonner";

interface MessageActionsProps {
    message: ILastGroupMessage | ILastIndividualMessage;
    variant: "sent" | "received";
}

const MessageActions = memo(({ message, variant }: MessageActionsProps) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(message.content);
        toast.success("Message copied to clipboard");
    };

    const handleReply = () => {
        toast.info("Reply feature coming soon");
    };

    const handleForward = () => {
        toast.info("Forward feature coming soon");
    };

    const handlePin = () => {
        toast.info("Pin feature coming soon");
    };

    const handleDelete = () => {
        toast.info("Delete feature coming soon");
    };

    const handleReact = (emoji: string) => {
        console.log("React with:", emoji);
        setShowEmojiPicker(false);
        toast.info(`Reacted with ${emoji}`);
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
            <div className="relative">
                <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 hover:bg-accent"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
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
            >
                <Reply className="h-4 w-4" />
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost" className="h-7 w-7 hover:bg-accent">
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
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
});

MessageActions.displayName = "MessageActions";

export default MessageActions;
