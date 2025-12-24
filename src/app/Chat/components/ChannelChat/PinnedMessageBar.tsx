import { memo } from "react";
import { Pin, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IPinMessage } from "@/api/pinMessageApi";
import { cn } from "@/lib/utils";

interface PinnedMessageBarProps {
    pinnedMessages: IPinMessage[];
    currentIndex: number;
    onNavigate: (direction: "next" | "prev") => void;
    onClose: () => void;
    onMessageClick: (messageId: string) => void;
    className?: string;
}

const PinnedMessageBar = ({
    pinnedMessages,
    currentIndex,
    onNavigate,
    onClose,
    onMessageClick,
    className,
}: PinnedMessageBarProps) => {
    if (pinnedMessages.length === 0) return null;

    const currentMessage = pinnedMessages[currentIndex];
    if (!currentMessage) return null;

    return (
        <div
            className={cn(
                "flex items-center gap-2 px-4 py-2 bg-muted/50 border-b",
                className
            )}
        >
            <Pin className="h-4 w-4 text-primary shrink-0" />
            
            <div
                className="flex-1 min-w-0 cursor-pointer hover:bg-muted rounded px-2 py-1 transition-colors"
                onClick={() => onMessageClick(currentMessage.id)}
            >
                <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                        Pinned message {currentIndex + 1} of {pinnedMessages.length}
                    </span>
                </div>
                <p className="text-sm truncate">{currentMessage.content}</p>
            </div>

            {pinnedMessages.length > 1 && (
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => onNavigate("prev")}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => onNavigate("next")}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}

            <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 shrink-0"
                onClick={onClose}
            >
                <X className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default memo(PinnedMessageBar);
