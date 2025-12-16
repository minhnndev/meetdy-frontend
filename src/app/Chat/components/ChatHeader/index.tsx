import AvatarBase from "@/components/common/AvatarBase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IGroupConversation, IIndividualConversation } from "@/models/conversation.model";
import { useAppSelector } from "@/redux/store";
import {
    Info,
    Phone,
    Video,
    Search,
    MoreVertical,
    Pin,
    Users,
    Settings,
    X,
} from "lucide-react";
import { memo, useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const ChatHeader = () => {
    const [conversationDetail, setConversationDetail] = useState<
        IIndividualConversation | IGroupConversation
    >();
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { currentConversation, conversations, memberInConversation } = useAppSelector(
        (state) => state.chat
    );

    useEffect(() => {
        if (currentConversation) {
            const conversation = conversations.find((conver) => conver._id === currentConversation);
            if (conversation) {
                setConversationDetail(conversation);
            }
        }
    }, [currentConversation, conversations]);

    const isGroup = conversationDetail?.type === true;
    const isOnline = !isGroup && (conversationDetail as IIndividualConversation)?.isOnline;

    const handleSearch = () => {
        if (searchQuery.trim()) {
            toast.info(`Searching for "${searchQuery}"`);
        }
    };

    const handleCall = () => {
        toast.info("Voice call starting...");
    };

    const handleVideoCall = () => {
        toast.info("Video call starting...");
    };

    return (
        <div className="flex items-center justify-between px-4 py-3 h-16 border-b sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="relative">
                    <AvatarBase
                        src={
                            Array.isArray(conversationDetail?.avatar)
                                ? ""
                                : conversationDetail?.avatar || ""
                        }
                        placeholder={conversationDetail?.name || ""}
                        className="w-10 h-10"
                    />
                    {isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                    )}
                </div>
                <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-base truncate">
                        {conversationDetail?.name || "Chat"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        {isGroup
                            ? `${memberInConversation?.length || conversationDetail?.totalMembers || 0} members`
                            : isOnline
                              ? "Active now"
                              : (conversationDetail as IIndividualConversation)?.lastLogin
                                ? `Last seen ${(conversationDetail as IIndividualConversation).lastLogin}`
                                : "Offline"}
                    </span>
                </div>
            </div>

            <div
                className={cn(
                    "flex items-center transition-all duration-200",
                    showSearch ? "gap-2" : "gap-1"
                )}
            >
                {showSearch ? (
                    <div className="flex items-center gap-2 animate-in slide-in-from-right-4">
                        <Input
                            type="text"
                            placeholder="Search in conversation..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            className="w-64 h-9"
                            autoFocus
                        />
                        <Button size="icon" variant="ghost" className="h-9 w-9" onClick={handleSearch}>
                            <Search className="h-4 w-4" />
                        </Button>
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-9 w-9"
                            onClick={() => {
                                setShowSearch(false);
                                setSearchQuery("");
                            }}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-9 w-9"
                                    onClick={() => setShowSearch(true)}
                                >
                                    <Search className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Search messages</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button size="icon" variant="ghost" className="h-9 w-9" onClick={handleCall}>
                                    <Phone className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Voice call</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-9 w-9"
                                    onClick={handleVideoCall}
                                >
                                    <Video className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Video call</TooltipContent>
                        </Tooltip>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="ghost" className="h-9 w-9">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem onClick={() => toast.info("View pinned messages")}>
                                    <Pin className="h-4 w-4 mr-2" />
                                    Pinned messages
                                </DropdownMenuItem>
                                {isGroup && (
                                    <DropdownMenuItem onClick={() => toast.info("View members")}>
                                        <Users className="h-4 w-4 mr-2" />
                                        View members
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuItem onClick={() => toast.info("Conversation info")}>
                                    <Info className="h-4 w-4 mr-2" />
                                    Conversation info
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => toast.info("Settings")}>
                                    <Settings className="h-4 w-4 mr-2" />
                                    Settings
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TooltipProvider>
                )}
            </div>
        </div>
    );
};

export default memo(ChatHeader);
