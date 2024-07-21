import { DeleteFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { Dropdown, Notification, Modal } from '@douyinfe/semi-ui';
import conversationApi from '@/api/conversationApi';
import {
    fetchChannels,
    fetchListMessages,
    getLastViewOfMembers,
    setCurrentChannel,
    setTypeOfConversation,
    getMembersConversation,
    Conversation
} from '@/redux/slice/chat/chatSlice';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import SubMenuClassify from '@/components/organisms/SubMenuClassify/SubMenuClassify';
import ConversationSingle from '@/components/molecules/ConversationSingle';

type ConversationContainerProps = {
    valueClassify: string,
    conversations: Conversation[] | null,
    onClickConver?: (value: string) => void,
};

const ConversationContainer = (props: ConversationContainerProps) => {
    const { valueClassify, conversations } = props;
    const dispatch = useDispatch();
    const { classifies } = useSelector((state: any) => state.chat);
    const { userProfile } = useSelector((state: any) => state.account);

    const tempClassify = classifies.find((ele) => ele._id === valueClassify) || 0;

    const checkConverInClassify = (idMember) => {
        if (tempClassify === 0) return true;
        const index = tempClassify.conversationIds.findIndex((ele) => ele === idMember);
        return index > -1;
    };

    const converFilter = (): Conversation[] => {
        if (conversations === null) return [];
        return conversations.filter((ele) => checkConverInClassify(ele._id));
    }

    const handleConversationClick = async (conversationId) => {
        // dispatch(setCurrentConversation(conversationId));

        dispatch(setCurrentChannel(''));
        dispatch(getLastViewOfMembers({ conversationId }) as any);
        dispatch(fetchListMessages({ conversationId, size: 10 }) as any);

        dispatch(getMembersConversation({ conversationId }) as any);
        dispatch(setTypeOfConversation(conversationId));
        dispatch(fetchChannels({ conversationId }) as any);
    };

    const handleOnClickItem = (e, id) => {
        if (e.key === 1) {
            confirm(id);
        }
    };

    const deleteConver = async (id) => {
        try {
            await conversationApi.deleteConversation(id);
            Notification.success({content: 'Xóa thành công'});
        } catch (error) {
            Notification.error({content: 'Đã có lỗi xảy ra'});
        }
    };

    const confirm = (id) => {
        Modal.confirm({
            title: 'Xác nhận',
            icon: <ExclamationCircleOutlined />,
            content: (
                <span>Toàn bộ nội dung cuộc trò chuyện sẻ bị xóa, bạn có chắc chắn muốn xóa ?</span>
            ),
            okText: 'Xóa',
            cancelText: 'Không',
            onOk: () => {
                deleteConver(id);
            },
        });
    }

    return (
        <>
            <div id="conversation-main">
                <ul className="list_conversation">
                    {converFilter().map((conversationEle, index) => {
                        if (true) {
                            const { numberUnread } = conversationEle;
                            if (conversationEle.lastMessage) {
                                return (
                                    <Dropdown
                                        key={index}
                                        render={
                                            <Dropdown.Menu>
                                                <SubMenuClassify
                                                    data={classifies}
                                                    idConver={conversationEle._id}
                                                />

                                                {userProfile._id === conversationEle.leaderId && (
                                                    <Dropdown.Item
                                                        type='danger'
                                                        key="1"
                                                        icon={<DeleteFilled />}
                                                    >
                                                        Xoá hội thoại
                                                    </Dropdown.Item>
                                                )}
                                            </Dropdown.Menu>
                                        }
                                        trigger='contextMenu'
                                    >
                                        <li
                                            key={index}
                                            className={`conversation-item ${
                                                numberUnread === 0 ? '' : 'arrived-message'
                                            } `}
                                        >
                                            <ConversationSingle
                                                conversation={conversationEle}
                                                onClick={handleConversationClick}
                                            />
                                        </li>
                                    </Dropdown>
                                );
                            }
                        }
                    })}
                </ul>
            </div>
        </>
    );
}

ConversationContainer.propTypes = {
    valueClassify: PropTypes.string.isRequired,
};

ConversationContainer.defaultProps = {
    valueClassify: '',
};

export default ConversationContainer;
