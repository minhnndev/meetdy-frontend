import { memo, useState, useEffect } from "react";
import {
    X,
    UserPlus,
    LogOut,
    Edit2,
    Image,
    Link2,
    Bell,
    BellOff,
    Shield,
    Trash2,
    Crown,
    MoreHorizontal,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import AvatarBase from "@/components/common/AvatarBase";
import { IGroupConversation } from "@/models/conversation.model";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/store";

interface GroupInfoPanelProps {
    conversation: IGroupConversation;
    onClose: () => void;
    isOpen: boolean;
}

interface MemberItemProps {
    member: any;
    isLeader: boolean;
    isManager: boolean;
    isCurrentUser: boolean;
    onRemove: (id: string) => void;
    onMakeManager: (id: string) => void;
    onRemoveManager: (id: string) => void;
}

const MemberItem = memo(({ member, isLeader, isManager, isCurrentUser, onRemove, onMakeManager, onRemoveManager }: MemberItemProps) => (
    <div className="flex items-center justify-between py-2 px-1 hover:bg-muted/50 rounded-lg transition-colors">
        <div className="flex items-center gap-3">
            <div className="relative">
                <AvatarBase
                    src={member.avatar}
                    placeholder={member.name}
                    className="w-10 h-10"
                />
                {member.isOnline && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-background rounded-full" />
                )}
            </div>
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{member.name}</span>
                    {isLeader && (
                        <Crown className="h-3.5 w-3.5 text-yellow-500" />
                    )}
                    {isManager && !isLeader && (
                        <Shield className="h-3.5 w-3.5 text-blue-500" />
                    )}
                    {isCurrentUser && (
                        <span className="text-xs text-muted-foreground">(You)</span>
                    )}
                </div>
            </div>
        </div>
        {!isCurrentUser && !isLeader && (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {isManager ? (
                        <DropdownMenuItem onClick={() => onRemoveManager(member._id)}>
                            <Shield className="h-4 w-4 mr-2" />
                            Remove as admin
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem onClick={() => onMakeManager(member._id)}>
                            <Shield className="h-4 w-4 mr-2" />
                            Make admin
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onRemove(member._id)} className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove from group
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )}
    </div>
));

MemberItem.displayName = "MemberItem";

const GroupInfoPanel = ({ conversation, onClose, isOpen }: GroupInfoPanelProps) => {
    const { name, totalMembers, leaderId, managerIds, isJoinFromLink, isNotify } = conversation;
    const { memberInConversation } = useAppSelector((state) => state.chat);
    const { user } = useAppSelector((state) => state.global);
    
    const [isEditingName, setIsEditingName] = useState(false);
    const [groupName, setGroupName] = useState(name);
    const [membersExpanded, setMembersExpanded] = useState(true);
    const [settingsExpanded, setSettingsExpanded] = useState(false);

    useEffect(() => {
        setGroupName(name);
    }, [name]);

    const currentUserId = user?._id;
    const isLeader = currentUserId === leaderId;
    const isManager = managerIds?.includes(currentUserId || "") || isLeader;

    const handleSaveName = () => {
        if (groupName.trim() && groupName !== name) {
            toast.info(`Renaming group to "${groupName}"...`);
        }
        setIsEditingName(false);
    };

    const handleChangeAvatar = () => {
        toast.info("Change avatar feature coming soon");
    };

    const handleAddMembers = () => {
        toast.info("Add members feature coming soon");
    };

    const handleLeaveGroup = () => {
        toast.info("Leave group feature coming soon");
    };

    const handleDeleteGroup = () => {
        toast.info("Delete group feature coming soon");
    };

    const handleRemoveMember = (_memberId: string) => {
        toast.info("Remove member feature coming soon");
    };

    const handleMakeManager = (_memberId: string) => {
        toast.info("Make admin feature coming soon");
    };

    const handleRemoveManager = (_memberId: string) => {
        toast.info("Remove admin feature coming soon");
    };

    const handleToggleNotifications = () => {
        toast.info(isNotify ? "Notifications muted" : "Notifications enabled");
    };

    const handleToggleJoinLink = () => {
        toast.info(isJoinFromLink ? "Join link disabled" : "Join link enabled");
    };

    const handleCopyJoinLink = () => {
        toast.success("Join link copied to clipboard");
    };

    return (
        <div
            className={cn(
                "fixed right-0 top-0 h-full w-80 bg-background border-l shadow-lg z-50 transition-transform duration-300",
                isOpen ? "translate-x-0" : "translate-x-full"
            )}
        >
            <div className="flex items-center justify-between p-4 border-b">
                <h2 className="font-semibold text-lg">Group Info</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-5 w-5" />
                </Button>
            </div>

            <ScrollArea className="h-[calc(100%-65px)]">
                <div className="p-6">
                    <div className="flex flex-col items-center text-center mb-6">
                        <div className="relative mb-4 group cursor-pointer" onClick={isManager ? handleChangeAvatar : undefined}>
                            <AvatarBase
                                src=""
                                placeholder={name}
                                className="w-24 h-24"
                            />
                            {isManager && (
                                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Image className="h-6 w-6 text-white" />
                                </div>
                            )}
                        </div>
                        
                        {isEditingName ? (
                            <div className="flex items-center gap-2 w-full max-w-[200px]">
                                <Input
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                    className="text-center"
                                    autoFocus
                                    onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                                />
                                <Button size="sm" onClick={handleSaveName}>Save</Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <h3 className="text-xl font-semibold">{name}</h3>
                                {isManager && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => setIsEditingName(true)}
                                    >
                                        <Edit2 className="h-3.5 w-3.5" />
                                    </Button>
                                )}
                            </div>
                        )}
                        
                        <p className="text-sm text-muted-foreground mt-1">
                            {totalMembers} members
                        </p>
                    </div>

                    <div className="flex justify-center gap-3 mb-6">
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={handleAddMembers}
                        >
                            <UserPlus className="h-4 w-4 mr-2" />
                            Add
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={handleToggleNotifications}
                        >
                            {isNotify ? (
                                <>
                                    <Bell className="h-4 w-4 mr-2" />
                                    Mute
                                </>
                            ) : (
                                <>
                                    <BellOff className="h-4 w-4 mr-2" />
                                    Unmute
                                </>
                            )}
                        </Button>
                    </div>

                    <Separator className="my-4" />

                    <Collapsible open={membersExpanded} onOpenChange={setMembersExpanded}>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-full justify-between px-1">
                                <span className="text-sm font-medium">
                                    Members ({memberInConversation?.length || totalMembers})
                                </span>
                                {membersExpanded ? (
                                    <ChevronUp className="h-4 w-4" />
                                ) : (
                                    <ChevronDown className="h-4 w-4" />
                                )}
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2">
                            <div className="space-y-1">
                                {memberInConversation?.map((member: any) => (
                                    <MemberItem
                                        key={member._id}
                                        member={member}
                                        isLeader={member._id === leaderId}
                                        isManager={managerIds?.includes(member._id)}
                                        isCurrentUser={member._id === currentUserId}
                                        onRemove={handleRemoveMember}
                                        onMakeManager={handleMakeManager}
                                        onRemoveManager={handleRemoveManager}
                                    />
                                ))}
                            </div>
                        </CollapsibleContent>
                    </Collapsible>

                    <Separator className="my-4" />

                    <Collapsible open={settingsExpanded} onOpenChange={setSettingsExpanded}>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-full justify-between px-1">
                                <span className="text-sm font-medium">Settings</span>
                                {settingsExpanded ? (
                                    <ChevronUp className="h-4 w-4" />
                                ) : (
                                    <ChevronDown className="h-4 w-4" />
                                )}
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 space-y-1">
                            {isManager && (
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start"
                                    onClick={handleToggleJoinLink}
                                >
                                    <Link2 className="h-4 w-4 mr-3" />
                                    {isJoinFromLink ? "Disable join link" : "Enable join link"}
                                </Button>
                            )}
                            {isJoinFromLink && (
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start"
                                    onClick={handleCopyJoinLink}
                                >
                                    <Link2 className="h-4 w-4 mr-3" />
                                    Copy join link
                                </Button>
                            )}
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-orange-500 hover:text-orange-500"
                                onClick={handleLeaveGroup}
                            >
                                <LogOut className="h-4 w-4 mr-3" />
                                Leave group
                            </Button>
                            {isLeader && (
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-destructive hover:text-destructive"
                                    onClick={handleDeleteGroup}
                                >
                                    <Trash2 className="h-4 w-4 mr-3" />
                                    Delete group
                                </Button>
                            )}
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </ScrollArea>
        </div>
    );
};

export default memo(GroupInfoPanel);
