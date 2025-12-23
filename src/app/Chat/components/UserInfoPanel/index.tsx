import { memo } from "react";
import { X, Phone, Video, Mail, MessageCircle, UserMinus, Ban, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import AvatarBase from "@/components/common/AvatarBase";
import { IIndividualConversation } from "@/models/conversation.model";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface UserInfoPanelProps {
    conversation: IIndividualConversation;
    onClose: () => void;
    isOpen: boolean;
}

const UserInfoPanel = ({ conversation, onClose, isOpen }: UserInfoPanelProps) => {
    const { name, avatar, isOnline, lastLogin, friendStatus } = conversation;

    const handleCall = () => {
        toast.info("Starting voice call...");
    };

    const handleVideoCall = () => {
        toast.info("Starting video call...");
    };

    const handleUnfriend = () => {
        toast.info("Unfriend feature coming soon");
    };

    const handleBlock = () => {
        toast.info("Block feature coming soon");
    };

    return (
        <div
            className={cn(
                "fixed right-0 top-0 h-full w-80 bg-background border-l shadow-lg z-50 transition-transform duration-300",
                isOpen ? "translate-x-0" : "translate-x-full"
            )}
        >
            <div className="flex items-center justify-between p-4 border-b">
                <h2 className="font-semibold text-lg">Profile</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-5 w-5" />
                </Button>
            </div>

            <ScrollArea className="h-[calc(100%-65px)]">
                <div className="p-6">
                    <div className="flex flex-col items-center text-center mb-6">
                        <div className="relative mb-4">
                            <AvatarBase
                                src={avatar}
                                placeholder={name}
                                className="w-24 h-24"
                            />
                            {isOnline && (
                                <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full" />
                            )}
                        </div>
                        <h3 className="text-xl font-semibold">{name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            {isOnline ? "Active now" : lastLogin ? `Last seen ${lastLogin}` : "Offline"}
                        </p>
                        {friendStatus && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full mt-2">
                                {friendStatus === "FRIEND" ? "Friend" : friendStatus}
                            </span>
                        )}
                    </div>

                    <div className="flex justify-center gap-4 mb-6">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full h-12 w-12"
                            onClick={handleCall}
                        >
                            <Phone className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full h-12 w-12"
                            onClick={handleVideoCall}
                        >
                            <Video className="h-5 w-5" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full h-12 w-12"
                                >
                                    <MoreHorizontal className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center">
                                <DropdownMenuItem onClick={handleUnfriend}>
                                    <UserMinus className="h-4 w-4 mr-2" />
                                    Unfriend
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleBlock} className="text-destructive">
                                    <Ban className="h-4 w-4 mr-2" />
                                    Block
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-4">
                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                            Conversation Settings
                        </h4>
                        
                        <div className="space-y-2">
                            <Button variant="ghost" className="w-full justify-start" onClick={() => toast.info("Mute notifications")}>
                                <MessageCircle className="h-4 w-4 mr-3" />
                                Mute notifications
                            </Button>
                            <Button variant="ghost" className="w-full justify-start" onClick={() => toast.info("View shared media")}>
                                <Mail className="h-4 w-4 mr-3" />
                                Shared media
                            </Button>
                        </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-4">
                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                            Privacy & Support
                        </h4>
                        
                        <div className="space-y-2">
                            <Button 
                                variant="ghost" 
                                className="w-full justify-start text-destructive hover:text-destructive"
                                onClick={handleBlock}
                            >
                                <Ban className="h-4 w-4 mr-3" />
                                Block user
                            </Button>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};

export default memo(UserInfoPanel);
