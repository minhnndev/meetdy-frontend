import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import HeaderOptional from '@/components/molecules/HeaderOptional';
import { ChatStateType, Conversation } from '@/redux/slice/chat/chatSlice';
import './style.css';


type HeaderChatContainerProps = {
    info: Conversation,
    onPopUpInfo: () => void,
    onOpenDrawer: () => void,
    addMemberToGroup: () => void,
};

const HeaderChatContainer = (props: HeaderChatContainerProps) => {

    const { info } = props;
    const { onPopUpInfo, onOpenDrawer, addMemberToGroup } = props;

    const { memberInConversation } = useSelector(
        (state: any) => state.chat,
    ) as ChatStateType;

    return (
        <div id="header-main">
            <HeaderOptional
                avatar={info.avatar}
                totalMembers={memberInConversation.length}
                name={info.name}
                typeConver={info.type}
                isLogin={info?.isOnline}
                lastLogin={info?.lastLogin}
                avatarColor={info?.avatarColor}
                onPopUpInfo={onPopUpInfo}
                onOpenDrawer={onOpenDrawer}
                addMemberToGroup={addMemberToGroup}
            />
        </div>
    );
}

HeaderChatContainer.propTypes = {
    onPopUpInfo: PropTypes.func,
    onOpenDrawer: PropTypes.func,
};

HeaderChatContainer.defaultProps = {
    onPopUpInfo: null,
    onOpenDrawer: null,
};

export default HeaderChatContainer;
