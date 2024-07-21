import PropTypes from 'prop-types';
import PersonalIcon from '@/components/molecules/PersonalIcon';
import { Empty, Spin } from '@douyinfe/semi-ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Conversation, fetchListMessages, isWaitingConversations, setCurrentConversation } from '@/redux/slice/chat/chatSlice';
import './style.css';

type ConverPersonalSearchProps = {
    data: Conversation[],
};

const ConverPersonalSearch = (props: ConverPersonalSearchProps) => {
    const {data} = props;
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const isLoading = useSelector((state: any) => isWaitingConversations(state));

    const handleClickItem = (value) => {
        dispatch(fetchListMessages({ conversationId: value._id, size: 10 }) as any);
        dispatch(setCurrentConversation(value._id));

        navigator('/chat');
    };

    const ListConversation = () => {
        return (
            <>
                {data.map((ele: any, index: number) => (
                    <>
                        <div
                            key={index}
                            className="single-conver_item"
                            onClick={() => handleClickItem(ele)}
                        >
                            <PersonalIcon avatar={ele.avatar} color={ele.avatarColor} name={ele.name} />

                            <div className="single-conver_name">{ele.name}</div>
                        </div>
                    </>
                ))}
            </>
        )
    }

    return (
        <Spin spinning={isLoading}>
            <div className="list-filter_single-conver">
                {data === null ? <Empty /> : <><ListConversation /></>} 
            </div>
        </Spin>
    );
}

ConverPersonalSearch.propTypes = {
    data: PropTypes.array,
};

ConverPersonalSearch.defaultProps = {
    data: [],
};

export default ConverPersonalSearch;
