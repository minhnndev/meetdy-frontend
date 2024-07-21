import PropTypes from 'prop-types';
import './style.css';
import { ConversationAvatar } from '@/components/molecules';
import { Empty } from '@douyinfe/semi-ui';
import { useDispatch } from 'react-redux';
import { Conversation, fetchListMessages, setCurrentConversation } from '@/redux/slice/chat/chatSlice';
import { useNavigate } from 'react-router-dom';

type ConverMutipleSearchProps = {
    data: Conversation[],
};

const ConverMutipleSearch = (props: ConverMutipleSearchProps) => {
    const {data} = props;
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const handleClickItem = (value) => {
        dispatch(fetchListMessages({ conversationId: value._id, size: 10 }) as any);
        dispatch(setCurrentConversation(value._id));

        navigator('/chat');
    };

    const ListConversation = () => {
        return (
            <>
                {data !== null && data.map((ele, index) => (
                    <div
                        key={index}
                        className="single-conver_item"
                        onClick={() => handleClickItem(ele)}
                    >
                        <ConversationAvatar
                            avatar={ele.avatar}
                            totalMembers={ele.totalMembers}
                            type={ele.type}
                            name={ele.name}
                        />

                        <div className="single-conver_name">{ele.name}</div>
                    </div>
                ))}
            </>
        )
    }

    return (
        <div className="list-filter_single-conver">
            {data === null ? <Empty /> : <><ListConversation /></>} 
        </div>
    );
}

ConverMutipleSearch.propTypes = {
    data: PropTypes.array,
};

ConverMutipleSearch.defaultProps = {
    data: [],
};

export default ConverMutipleSearch;
