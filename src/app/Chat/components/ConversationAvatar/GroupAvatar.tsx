import AvatarBase from "@/components/common/AvatarBase";
import { isEmpty } from "lodash";
import { memo } from "react";

interface GroupAvatarProps {
    avatars: any[];
    totalMembers: number;
    name: string;
}

const GroupAvatar = ({ avatars, totalMembers, name }: GroupAvatarProps) => {
    return (
        <div className="flex items-center">
            {isEmpty(avatars) && totalMembers <= 0 && (
                <AvatarBase src="" placeholder="?" className="w-10 h-10" />
            )}
            <AvatarBase src="" placeholder={name} className="w-10 h-10" />
        </div>
    );
};

export default memo(GroupAvatar);
