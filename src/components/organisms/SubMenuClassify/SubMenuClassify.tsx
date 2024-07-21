import { TagFilled } from '@ant-design/icons';
import { Divider, Dropdown } from '@douyinfe/semi-ui';
import classifyApi from '@/api/classifyApi';
import { fetchListClassify } from '@/redux/slice/chat/chatSlice';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ModalClassify } from '@/components/modal';

SubMenuClassify.propTypes = {
    data: PropTypes.array,
    idConver: PropTypes.string.isRequired,
};

SubMenuClassify.defaultProps = {
    data: [],
};

function SubMenuClassify({ data, idConver }) {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

    const handleClickClassify = async (id) => {
        await classifyApi.addClassifyForConversation(id, idConver);
        dispatch(fetchListClassify() as any);
    };

    return (
        <Dropdown title={<span className="menu-item--highlight">Phân loại</span>} key="sub-1">
            {data.length > 0 &&
                data.map((ele) => (
                    <Dropdown.Item
                        key={ele._id}
                        icon={<TagFilled style={{ color: `${ele.color.code}` }} />}
                        onClick={() => handleClickClassify(ele._id)}
                    >
                        {ele.name}
                    </Dropdown.Item>
                ))}

            <Divider style={{ margin: '1rem 2rem' }} />
            <Dropdown.Item key="0" icon={<TagFilled />} onClick={() => setVisible(true)}>
                <span className="menu-item--highlight">Quản lý thẻ phân loại</span>
            </Dropdown.Item>

            <ModalClassify
                isVisible={visible}
                onCancel={() => setVisible(false)}
                onOpen={() => setVisible(true)}
            />
        </Dropdown>
    );
}

export default SubMenuClassify;
