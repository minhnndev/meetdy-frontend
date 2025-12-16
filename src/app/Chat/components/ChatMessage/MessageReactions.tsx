import { memo } from "react";
import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface Reaction {
    type: string;
    user: {
        _id: string;
        name: string;
    };
}

interface MessageReactionsProps {
    reactions: Reaction[];
    messageId: string;
}

const MessageReactions = memo(({ reactions }: MessageReactionsProps) => {
    const groupedReactions = reactions.reduce(
        (acc, reaction) => {
            if (!acc[reaction.type]) {
                acc[reaction.type] = [];
            }
            acc[reaction.type].push(reaction.user);
            return acc;
        },
        {} as Record<string, { _id: string; name: string }[]>
    );

    if (Object.keys(groupedReactions).length === 0) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-1 mt-1 ml-1">
            <TooltipProvider>
                {Object.entries(groupedReactions).map(([emoji, users]) => (
                    <Tooltip key={emoji}>
                        <TooltipTrigger asChild>
                            <button
                                className={cn(
                                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs",
                                    "bg-accent/50 hover:bg-accent transition-colors border"
                                )}
                            >
                                <span>{emoji}</span>
                                {users.length > 1 && (
                                    <span className="text-muted-foreground">{users.length}</span>
                                )}
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{users.map((u) => u.name).join(", ")}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </TooltipProvider>
        </div>
    );
});

MessageReactions.displayName = "MessageReactions";

export default MessageReactions;
