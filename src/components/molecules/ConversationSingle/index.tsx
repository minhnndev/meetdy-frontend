import { TagFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classifyUtils from '@/utils/classifyUtils';
import ConversationAvatar from '../ConversationAvatar';
import ShortMessage from '@/components/composables/ShortMessage';
import './style.css';

type ConversationSingleProps = {
    conversation: any,
    onClick: (id: string) => void,
};

const ConversationSingle = (props: ConversationSingleProps) => {
    const { conversation, onClick } = props;

    const { _id, name, avatar, numberUnread, lastMessage, totalMembers, avatarColor } =
        conversation;
    const { type, createdAt } = lastMessage;

    const { classifies, conversations } = useSelector((state: any) => state.chat);
    const [classify, setClassify] = useState(null);

    const fetchData = () => {
        console.log('fetchData');
    }

    useEffect(fetchData, [])

    useEffect(() => {
        if (classifies.length > 0) {
            const temp = classifyUtils.getClassifyOfObject(_id, classifies);
            if (temp) {
                setClassify(temp);
            }
        }
    }, [conversation, conversations, classifies]);

    const handleClick = () => {
        if (onClick) onClick(_id);
    };

    return (
        <div className="conversation-item_box" onClick={handleClick}>
            <div className="left-side-box">
                <div className="icon-users">
                    <ConversationAvatar
                        totalMembers={totalMembers}
                        avatar={avatar}
                        type={conversation.type}
                        name={name}
                        avatarColor={avatarColor}
                    />
                </div>
            </div>

            {lastMessage ? (
                <>
                    <div className="middle-side-box">
                        <span className="name-box">{name}</span>

                        <div className="lastest-message">
                            {classify && (
                                <span className="tag-classify">
                                    <TagFilled style={{ color: `${classify.color?.code}` }} />
                                </span>
                            )}

                            <ShortMessage message={lastMessage} type={conversation.type} />
                        </div>
                    </div>

                    <div className="right-side-box">
                        <span className="lastest-time">{createdAt}</span>

                        <span className="message-count">{numberUnread}</span>
                    </div>
                </>
            ) : (
                ''
            )}
        </div>
    );
}

ConversationSingle.propTypes = {
    conversation: PropTypes.object,
    onClick: PropTypes.func,
};


export default ConversationSingle;
