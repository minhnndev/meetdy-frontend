import GroupAvatar from "@/app/Chat/components/ConversationAvatar/GroupAvatar";
import UserAvatar from "@/app/Chat/components/ConversationAvatar/UserAvatar";
import { memo } from "react";

interface ConversationAvatarProps {
    conversation: any;
    totalMembers: number;
}
const ConversationAvatar = ({ conversation, totalMembers }: ConversationAvatarProps) => {
    const { avatar, avatarColor, name, isOnline } = conversation || {};
    return (
        <>
            {typeof avatar === "string" ? (
                <UserAvatar
                    avatar={avatar.toString()}
                    color={avatarColor}
                    name={name}
                    isActive={isOnline}
                />
            ) : (
                <GroupAvatar avatars={avatar} name={name} totalMembers={totalMembers} />
            )}
        </>
    );
};

export default memo(ConversationAvatar);
