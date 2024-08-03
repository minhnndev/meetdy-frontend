import { IcUserDefault } from "@/theme/icons/MDIcons"
import { Avatar, AvatarGroup, Badge } from '@douyinfe/semi-ui';
import DEFAULT_AVATAR from '@/assets/images/user/user_default.jpg';
import PropTypes from 'prop-types';
import COVERSATION_STYLE from './ConversationAvatarStyle';
import './style.css';
import { AvatarCustom } from '@/components/molecules';
import { convertAvatarSize } from '@/utils/convertAvatarSize';
import { AvatarType } from '@/redux/slice/chat/chatSlice';
import { useEffect, useState } from 'react';
import { IconUser } from '@douyinfe/semi-icons';

type ConversationAvatarProps = {
    avatar: string | AvatarType[];
    demension?: number;
    isGroupCard: boolean;
    totalMembers: number;
    type: boolean;
    name: string;
    isActived: boolean;
    sizeAvatar: number;
    frameSize: number;
    avatarColor: string;
};

const ConversationAvatar = (props: ConversationAvatarProps) => {
    const {
        avatar,
        demension,
        isGroupCard,
        totalMembers,
        type,
        name,
        isActived,
        sizeAvatar,
        frameSize,
        avatarColor,
    } = props;

    const avatarSize = convertAvatarSize(demension);
    const converStyle3 = COVERSATION_STYLE.styleGroup3(demension) as object;
    const [avatarGroup, setAvatarGroup] = useState<AvatarType[]>([]);

    useEffect(() => {
        if (typeof avatar !== 'string') {
            setAvatarGroup(avatar)
        }
    }, [])

    const renderAvatar = () => {
        let tempAvatar = [];
        console.log("🚀 ~ renderAvatar ~ tempAvatar:", tempAvatar)

        for (let index = 0; index < totalMembers; index++) {
            if (avatarGroup[index]?.avatar) {
                tempAvatar.push(
                    <Avatar
                        key={index}
                        style={
                            totalMembers === 3 && index === 2
                                ? {
                                    position: 'relative',
                                    left: '50%',
                                    transform: 'translateX(-30%)',
                                    marginTop: (demension / 6) * -2,
                                }
                                : {}
                        }
                        size={avatarSize}
                        src={avatarGroup[index].avatar}
                    />,
                );
            } else {
                tempAvatar.push(
                    <Avatar
                        key={index}
                        style={
                            totalMembers === 3 && index === 2
                                ? {
                                    backgroundColor: avatarGroup[index]?.avatarColor, ...converStyle3
                                }
                                : {
                                    backgroundColor: avatarGroup[index]?.avatarColor
                                }
                        }
                        size={avatarSize}
                    >
                        <IcUserDefault size="small" />
                    </Avatar>,
                );
            }
        }
        return tempAvatar;
    };

    const renderMore = (restNumber) => {
        return (
            <Avatar size='small'
                style={
                    {
                        position: 'relative',
                        left: '45%',
                        top: '-2%',
                        transform: 'translateX(-55%)',
                        marginTop: (demension / 6) * -2,
                    }
                }
            >
                {`+${restNumber}`}
            </Avatar >
        );
    };

    const renderGroupManyUser = () => {
        let tempAvatar = [];
        for (let index = 0; index < totalMembers; index++) {
            if (avatarGroup[index]?.avatar) {
                tempAvatar.push(
                    <Avatar
                        key={index}
                        style={
                            index === 1
                                ? {
                                    position: 'relative',
                                    left: '70%',
                                    transform: 'translateX(0%)',
                                    marginTop: (demension / 6) * -11.5,
                                }
                                : {}
                        }
                        size={avatarSize}
                        src={avatarGroup[index].avatar}
                    />
                );
            } else {
                tempAvatar.push(
                    <Avatar
                        key={index}
                        style={
                            index === 1
                                ? {
                                    backgroundColor: avatarGroup[index]?.avatarColor, ...converStyle3
                                }
                                : {
                                    backgroundColor: avatarGroup[index]?.avatarColor
                                }
                        }
                        size={avatarSize}
                    >
                        <IcUserDefault size="small" />
                    </Avatar>
                );
            }
        }
        return tempAvatar;
    };

    return (
        <div className="avatar_conversation">
            {typeof avatar === 'string' ? (
                <Badge dot={isActived} style={{ offset: '-5 40', backgroundColor: isActived ? 'green' : 'red' }}>
                    <AvatarCustom size={sizeAvatar} src={avatar} color={avatarColor} name={name} />
                </Badge>
            ) : (
                <>
                    {totalMembers === 3 ? (
                        <div className="conversation-item_box">
                            <div className="left-side-box">
                                <div
                                    style={
                                        (isGroupCard
                                            ? COVERSATION_STYLE.friendCardAvatar(demension)
                                            : {},
                                        {
                                            width: `60px`,
                                            height: `${frameSize}px`,
                                        })
                                    }
                                    className="icon-users-group"
                                >
                                    <AvatarGroup
                                        maxCount={3}
                                        overlapFrom='start'
                                        size='small'
                                    >
                                        {renderAvatar()}
                                    </AvatarGroup>
                                </div>
                            </div>
                        </div>
                    ) : totalMembers === 2 ? (
                        <div className="conversation-item_box">
                            <div className="left-side-box">
                                <div
                                    className="icon-users-group"
                                    style={
                                        (isGroupCard
                                            ? COVERSATION_STYLE.friendCardAvatarMixStyle2(demension)
                                            : COVERSATION_STYLE.styleGroup2,
                                        {
                                            width: `${frameSize}px`,
                                            height: `${frameSize}px`,
                                        })
                                    }
                                >
                                    <AvatarGroup
                                        maxCount={3}
                                    >
                                        {renderAvatar()}
                                    </AvatarGroup>
                                </div>
                            </div>
                        </div>
                    ) : totalMembers > 3 ? (
                        <div className="conversation-item_box">
                            <div className="left-side-box">
                                <div
                                    className="icon-users-group"
                                    style={
                                        (isGroupCard
                                            ? COVERSATION_STYLE.friendCardAvatar(demension)
                                            : {},
                                        {
                                            width: `${frameSize}px`,
                                            height: `${frameSize}px`,
                                        })
                                    }
                                >
                                    <div id="group-many-user">
                                        <AvatarGroup
                                            maxCount={2}
                                            renderMore={renderMore}
                                            overlapFrom='start'
                                            size='small'>
                                            {renderGroupManyUser()}
                                        </AvatarGroup>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <Avatar
                                size={convertAvatarSize(sizeAvatar)}
                                src={avatar[0] ? avatar[0].avatar : DEFAULT_AVATAR}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

ConversationAvatar.propTypes = {
    demension: PropTypes.number,
    isGroupCard: PropTypes.bool,
    totalMembers: PropTypes.number.isRequired,
    type: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    isActived: PropTypes.bool,
    avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    sizeAvatar: PropTypes.number,
    frameSize: PropTypes.number,
    avatarColor: PropTypes.string,
};

ConversationAvatar.defaultProps = {
    demension: 28,
    isGroupCard: false,
    isActived: false,
    avatar: '',
    sizeAvatar: 40,
    frameSize: 48,
    avatarColor: '',
};

export default ConversationAvatar;
