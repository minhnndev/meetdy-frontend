import AvatarBase from "@/components/common/AvatarBase";
import { memo } from "react";

interface UserAvatarProps {
    avatar: string;
    isActive?: boolean;
    color?: string;
    name?: string;
    onClick?: () => void;
    size?: string;
}

function UserAvatar(props: UserAvatarProps) {
    const { avatar, isActive, name, onClick, size = "w-10 h-10" } = props;

    return (
        <div className="relative inline-block" onClick={onClick}>
            <AvatarBase src={avatar} placeholder={name} className={size} />
            {isActive && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            )}
        </div>
    );
}

export default memo(UserAvatar);
