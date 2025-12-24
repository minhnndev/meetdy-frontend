import { memo, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
    MoreHorizontal,
    Pin,
    Trash2,
    Forward,
    Reply,
    RefreshCw,
    FileIcon,
    ImageIcon,
    VideoIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import AvatarBase from "@/components/common/AvatarBase";
import { cn } from "@/lib/utils";
import { ChannelMessage } from "@/hooks/channel/useChannelChat";

interface ChannelMessageItemProps {
    message: ChannelMessage;
    isOwn: boolean;
    showAvatar: boolean;
    isFirstInGroup: boolean;
    onDelete: (messageId: string) => void;
    onPin: (messageId: string) => void;
    onUnpin: (messageId: string) => void;
    onReply: (message: ChannelMessage) => void;
    onMediaClick: (url: string, type: string, name: string) => void;
    onRetryUpload?: (messageId: string) => void;
    isPinned: boolean;
}

const ChannelMessageItem = ({
    message,
    isOwn,
    showAvatar,
    isFirstInGroup,
    onDelete,
    onPin,
    onUnpin,
    onReply,
    onMediaClick,
    onRetryUpload,
    isPinned,
}: ChannelMessageItemProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const isImage = message.type === "IMAGE";
    const isVideo = message.type === "VIDEO";
    const isFile = message.type === "FILE";

    const renderContent = () => {
        if (message.isPending && message.uploadProgress !== undefined) {
            return (
                <div className="flex flex-col gap-2 min-w-[200px]">
                    <div className="flex items-center gap-2">
                        {isImage ? (
                            <ImageIcon className="h-4 w-4" />
                        ) : isVideo ? (
                            <VideoIcon className="h-4 w-4" />
                        ) : (
                            <FileIcon className="h-4 w-4" />
                        )}
                        <span className="text-sm truncate">{message.content}</span>
                    </div>
                    <Progress value={message.uploadProgress} className="h-1" />
                    <span className="text-xs text-muted-foreground">
                        {message.uploadError ? (
                            <span className="text-destructive flex items-center gap-1">
                                Upload failed
                                {onRetryUpload && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 px-2"
                                        onClick={() => onRetryUpload(message._id)}
                                    >
                                        <RefreshCw className="h-3 w-3 mr-1" />
                                        Retry
                                    </Button>
                                )}
                            </span>
                        ) : (
                            `Uploading... ${message.uploadProgress}%`
                        )}
                    </span>
                </div>
            );
        }

        if (isImage) {
            return (
                <div
                    className="cursor-pointer rounded overflow-hidden max-w-[300px]"
                    onClick={() => onMediaClick(message.content, "image", message.content)}
                >
                    <img
                        src={message.content}
                        alt="Image"
                        className="max-w-full h-auto rounded hover:opacity-90 transition-opacity"
                        loading="lazy"
                    />
                </div>
            );
        }

        if (isVideo) {
            return (
                <div
                    className="cursor-pointer rounded overflow-hidden max-w-[400px]"
                    onClick={() => onMediaClick(message.content, "video", message.content)}
                >
                    <video
                        src={message.content}
                        className="max-w-full h-auto rounded"
                        controls
                    />
                </div>
            );
        }

        if (isFile) {
            return (
                <div
                    className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => onMediaClick(message.content, "file", message.content)}
                >
                    <FileIcon className="h-8 w-8 text-primary" />
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium truncate">{message.content}</span>
                        <span className="text-xs text-muted-foreground">Click to download</span>
                    </div>
                </div>
            );
        }

        return <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>;
    };

    if (message.isDeleted) {
        return (
            <div
                className={cn(
                    "flex items-start gap-2 px-4 py-1",
                    isOwn && "flex-row-reverse"
                )}
            >
                {showAvatar && !isOwn ? (
                    <AvatarBase
                        src={message.user?.avatar}
                        placeholder={message.user?.name}
                        className="w-8 h-8"
                    />
                ) : !isOwn ? (
                    <div className="w-8" />
                ) : null}
                <div
                    className={cn(
                        "max-w-[70%] px-3 py-2 rounded-lg",
                        isOwn ? "bg-primary/10" : "bg-muted"
                    )}
                >
                    <p className="text-sm italic text-muted-foreground">This message was deleted</p>
                </div>
            </div>
        );
    }

    return (
        <div
            className={cn(
                "flex items-start gap-2 px-4 py-1 group",
                isOwn && "flex-row-reverse"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {showAvatar && !isOwn ? (
                <AvatarBase
                    src={message.user?.avatar}
                    placeholder={message.user?.name}
                    className="w-8 h-8"
                />
            ) : !isOwn ? (
                <div className="w-8" />
            ) : null}

            <div className={cn("flex flex-col max-w-[70%]", isOwn && "items-end")}>
                {isFirstInGroup && !isOwn && (
                    <span className="text-xs text-muted-foreground mb-1 ml-1">
                        {message.user?.name}
                    </span>
                )}

                {message.replyMessage && (
                    <div
                        className={cn(
                            "text-xs p-2 mb-1 rounded border-l-2 max-w-full",
                            isOwn
                                ? "bg-primary/10 border-primary/50"
                                : "bg-muted border-muted-foreground/50"
                        )}
                    >
                        <span className="text-muted-foreground">
                            Reply to {message.replyMessage.user?.name}
                        </span>
                        <p className="truncate">{message.replyMessage.content}</p>
                    </div>
                )}

                <div className="relative">
                    <div
                        className={cn(
                            "px-3 py-2 rounded-lg relative",
                            isOwn ? "bg-primary text-primary-foreground" : "bg-muted",
                            isPinned && "ring-2 ring-yellow-500/50"
                        )}
                    >
                        {isPinned && (
                            <Pin className="absolute -top-2 -right-2 h-4 w-4 text-yellow-500" />
                        )}
                        {renderContent()}
                    </div>

                    {isHovered && !message.isPending && (
                        <div
                            className={cn(
                                "absolute top-0 flex items-center gap-1 bg-background border rounded-md shadow-sm p-1",
                                isOwn ? "left-0 -translate-x-full -ml-2" : "right-0 translate-x-full ml-2"
                            )}
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => onReply(message)}
                            >
                                <Reply className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-7 w-7">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align={isOwn ? "start" : "end"}>
                                    {isPinned ? (
                                        <DropdownMenuItem onClick={() => onUnpin(message._id)}>
                                            <Pin className="h-4 w-4 mr-2" />
                                            Unpin message
                                        </DropdownMenuItem>
                                    ) : (
                                        <DropdownMenuItem onClick={() => onPin(message._id)}>
                                            <Pin className="h-4 w-4 mr-2" />
                                            Pin message
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem>
                                        <Forward className="h-4 w-4 mr-2" />
                                        Forward
                                    </DropdownMenuItem>
                                    {isOwn && (
                                        <>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={() => onDelete(message._id)}
                                                className="text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Delete
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}
                </div>

                <span className="text-[10px] text-muted-foreground mt-1 px-1">
                    {message.createdAt &&
                        formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                </span>
            </div>
        </div>
    );
};

export default memo(ChannelMessageItem);
