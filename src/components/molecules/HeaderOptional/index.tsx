import { 
    IcCloseDrawer, 
    IcOpenDrawer, 
    IcUserDefault, 
    IcBack,
    IcChannel,
    IcUserAddGroup,
} from '@/theme/icons/MDIcons';

import {
    AvatarType,
    fetchListMessages,
    getLastViewOfMembers,
    setCurrentChannel,
    setCurrentConversation,
} from '@/redux/slice/chat/chatSlice';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import dateUtils from '@/utils/dateUtils';


import ConversationAvatar from '../ConversationAvatar';
import './style.css';



type HeaderOptionProps = {
    avatar: string | AvatarType[],
    totalMembers: number,
    name: string,
    typeConver: boolean,
    isLogin: boolean,
    lastLogin: string,
    avatarColor: string,
    isOpenInfo: boolean,
    onPopUpInfo: () => void,
    onOpenDrawer: () => void,
    addMemberToGroup: () => void,
}

const HeaderOptional = (props: HeaderOptionProps) => {
    const {
        avatar,
        totalMembers,
        name,
        typeConver,
        isLogin,
        lastLogin,
        avatarColor,
        isOpenInfo
    } = props;
    const { onPopUpInfo, onOpenDrawer, addMemberToGroup } = props
    const type = typeof avatar;
    const { currentConversation, currentChannel, channels } = useSelector((state: any) => state.chat);
    

    const dispatch = useDispatch();
    const { width } = useWindowDimensions();

    const handleCutText = (text) => {
        if (width < 577) {
            return text.slice(0, 14) + '...';
        }
        return text;
    };

    const handlePopUpInfo = () => {
        if (onPopUpInfo) {
            onPopUpInfo();
        }
    };

    const checkTime = () => {
        if (lastLogin) {
            const time = dateUtils.toTime(lastLogin);
            if (
                lastLogin.indexOf('ngày') ||
                lastLogin.indexOf('giờ') ||
                lastLogin.indexOf('phút')
            ) {
                return true;
            }
            return false;
        }
    };

    const handleViewGeneralChannel = () => {
        dispatch(setCurrentChannel(''));
        dispatch(fetchListMessages({ conversationId: currentConversation, size: 10 }) as any);
        dispatch(getLastViewOfMembers({ conversationId: currentConversation }) as any);
    };

    const handleOpenDrawer = () => {
        if (onOpenDrawer) {
            onOpenDrawer();
        }
    };

    const handleBackToListConver = () => {
        dispatch(setCurrentConversation(''));
    };

    return (
        <div id="header-optional">
            <div className="header_wrapper">
                <div className="header_leftside">
                    <div className="icon-header back-list" onClick={handleBackToListConver}>
                        <IcBack />
                    </div>
                    <div className="icon_user">
                        {
                            <ConversationAvatar
                                avatar={avatar}
                                totalMembers={totalMembers}
                                type={typeConver}
                                name={name}
                                isActived={isLogin}
                                avatarColor={avatarColor}
                            />
                        }
                    </div>

                    <div className="info_user">
                        <div className="info_user-name">
                            <span>{handleCutText(name)}</span>
                        </div>

                        {currentChannel ? (
                            <div className="channel_info">
                                <div className="channel-icon">
                                    <IcChannel />
                                </div>

                                <div className="channel-name">
                                    {channels.find((ele) => ele._id === currentChannel).name}
                                </div>
                            </div>
                        ) : (
                            <div className="lastime-access">
                                {typeConver ? (
                                    <div className="member-hover">
                                        <IcUserDefault size='small'/>
                                        &nbsp;{totalMembers}
                                        <span>&nbsp;Thành viên</span>
                                    </div>
                                ) : (
                                    <>
                                        {isLogin ? (
                                            <span>Đang hoạt động</span>
                                        ) : (
                                            <>
                                                {lastLogin && (
                                                    <span>
                                                        {`Truy cập ${dateUtils
                                                            .toTime(lastLogin)
                                                            .toLowerCase()}`}{' '}
                                                        {`${checkTime() ? 'trước' : ''}`}
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="header_rightside">
                    {currentChannel ? (
                        <div
                            title="Trở lại kênh chính"
                            className="icon-header back-channel"
                            onClick={handleViewGeneralChannel}
                        >
                            <IcBack />
                        </div>
                    ) : (
                        <>
                            <div
                                className="icon-header create-group"
                                onClick={addMemberToGroup}
                            >
                                <IcUserAddGroup size='large' />
                            </div>
                        </>
                    )}

                    <div 
                        className="icon-header pop-up-layout"
                        onClick={handlePopUpInfo}
                    >
                        { isOpenInfo ? (<IcOpenDrawer size='large' />) : (<IcCloseDrawer size='large' />) }
                    </div>

                    {/* <div className="icon-header pop-up-responsive">
                        <SplitCellsOutlined onClick={handleOpenDrawer} />
                    </div> */}
                </div>
            </div>
        </div>
    );
}

HeaderOptional.propTypes = {
    avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    totalMembers: PropTypes.number,
    name: PropTypes.string,
    typeConver: PropTypes.bool.isRequired,
    isLogin: PropTypes.bool,
    lastLogin: PropTypes.object,
    avatarColor: PropTypes.string,
    onPopUpInfo: PropTypes.func,
    onOpenDrawer: PropTypes.func,
};

HeaderOptional.defaultProps = {
    totalMembers: 0,
    name: '',
    isLogin: false,
    lastLogin: null,
    avatarColor: '',
    onPopUpInfo: null,
    onOpenDrawer: null,
};

export default HeaderOptional;
