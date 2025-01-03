import React from "react";
import { GroupAvatar } from "../GroupAvatar";
import { UserAvatar } from "../UserAvatar";

const ConversationAvatar = ({ conversation, totalMembers }) => {
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
                <GroupAvatar
                    avatars={avatar}
                    totalMembers={totalMembers}
                    smallSize={30}
                    largeSize={30}
                />
            )}
        </>
    );
};

export { ConversationAvatar };
