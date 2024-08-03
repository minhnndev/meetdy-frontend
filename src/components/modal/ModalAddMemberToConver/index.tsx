import { Checkbox, Col, Divider, Input, Modal, Row, Typography } from '@douyinfe/semi-ui';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';
import { ItemsSelected, PersonalIcon } from '@/components/molecules';
import { ChatStateType, Friend } from '@/redux/slice/chat/chatSlice';
import { 
    IcEdit, 
    IcInfo, 
    IcSearch,
} from '@/theme/icons/MDIcons';

const { Text } = Typography;

type ItemsSelectedProps = {
    loading?: boolean,
    onOk?: (userIds?: string[], name?: string) => void,
    onCancel?: (value: any) => void,
    isVisible: boolean,
    typeModal: number,
};

const ModalAddMemberToConver = (props: ItemsSelectedProps) => {
    const { onOk, loading, onCancel, isVisible, typeModal } = props;

    const [itemSelected, setItemSelected] = useState([]);
    const { friends, memberInConversation } = useSelector((state: any) => state.chat) as ChatStateType;
    const [frInput, setFrInput] = useState('');
    const initialValue = memberInConversation.map((ele) => ele._id);
    const [checkList, setCheckList] = useState([]);
    const [nameGroup, setNameGroup] = useState('');
    const [isShowError, setIsShowError] = useState(false);
    const [initalFriend, setInitalFriend] = useState<Friend[]>([]);

    useEffect(() => {
        if (isVisible) {
            setInitalFriend(friends);
        } else {
            setFrInput('');
            setCheckList([]);
            setItemSelected([]);
            setNameGroup('');
            setIsShowError(false);
        }
    }, [isVisible]);

    const handleOk = () => {
        const userIds = itemSelected.map((ele) => ele._id);

        if (onOk) {
            if (typeModal === 1) {
                onOk([...checkList], nameGroup);
            } else {
                onOk(userIds);
            }
        }
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel(false);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setFrInput(value);
        console.log('value', value);

        if (!value && isVisible) {
            setInitalFriend(friends);
        } else {
            // const tempFriends = [...initalFriend];
            const realFriends = [];
            // console.log('friends', friends);

            friends.forEach((ele) => {
                const index = ele.name.search(value);

                if (index > -1) {
                    realFriends.push(ele);
                }
            });
            setInitalFriend(realFriends);
        }
    };

    const handleChangeCheckBox = (e) => {
        const value = e.target.value;

        // check xem có trong checklist chưa
        const index = checkList.findIndex((element) => element === value);
        let checkListTemp = [...checkList];
        let itemSelectedTemp = [...itemSelected];

        // nếu như đã có
        if (index !== -1) {
            itemSelectedTemp = itemSelectedTemp.filter((element) => element._id !== value);

            checkListTemp = checkListTemp.filter((element) => element !== value);

            // chưa có
        } else {
            checkListTemp.push(value);
            const index = initalFriend.findIndex((element) => element._id === value);

            if (index !== -1) {
                itemSelectedTemp.push(initalFriend[index]);
            }
        }
        setCheckList(checkListTemp);
        setItemSelected(itemSelectedTemp);
    };

    const handleRemoveItem = (id: string) => {
        let checkListTemp = [...checkList];
        let itemSelectedTemp = [...itemSelected];

        itemSelectedTemp = itemSelectedTemp.filter((element) => element._id !== id);

        checkListTemp = checkListTemp.filter((element) => element !== id);

        setCheckList(checkListTemp);
        setItemSelected(itemSelectedTemp);

        setFrInput('');
        setInitalFriend(friends);
    };

    const handleChange = (e: any) => {
        const value = e.target.value;
        setNameGroup(value);
    };

    const handleOnBlur = (e: any) => {
        !(nameGroup.length > 0) ? setIsShowError(true) : setIsShowError(false);
    };

    // kiểm tra người có trong nhóm và disable những đối tượng đó
    const checkInitialValue = (value) => {
        const index = initialValue.findIndex((ele) => ele === value);
        return index > -1;
    };

    return (
        <Modal
            title={typeModal === 2 ? 'Thêm thành viên' : 'Tạo nhóm'}
            visible={isVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            centered={true}
            okText="Xác nhận"
            cancelText="Hủy"
            okButtonProps={{
                disabled: (!(nameGroup.trim().length > 0) && typeModal === 1) || checkList.length < 1,
            }}
            confirmLoading={loading}
        >
            <div id="modal-add-member-to-conver">
                {typeModal === 1 && (
                    <>
                        <div className="heading-group">
                            <div className="select-background">
                                <IcEdit />
                            </div>

                            <div className="input-name-group">
                                <Input
                                    size="default"
                                    placeholder="Nhập tên nhóm"
                                    style={{ width: '100%' }}
                                    onBlur={handleOnBlur}
                                    value={nameGroup}
                                    onChange={handleChange}
                                />

                                {isShowError && (
                                    <Text type="danger">
                                        <IcInfo /> Tên nhóm không được để trống
                                    </Text>
                                )}
                            </div>
                        </div>
                        <Divider align='left' >
                            <span className="divider-title">Thêm bạn vào nhóm</span>
                        </Divider>
                    </>
                )}

                <div className="search-friend-input">
                    <Input
                        size="default"
                        placeholder="Nhập tên bạn muốn tìm kiếm"
                        style={{ width: '100%' }}
                        prefix={<IcSearch />}
                        onChange={handleSearch}
                        value={frInput}
                    />
                </div>

                <Divider />

                <div className="list-friend-interact">
                    {/* ${itemSelected.length > 0 ? '' : 'full-container'} */}
                    <div className={`list-friend-interact--left `}>
                        <div className="title-list-friend">
                            <span>Danh sách bạn bè</span>
                        </div>

                        <div className="checkbox-list-friend">
                            <Checkbox.Group
                                style={{ width: '100%' }}
                                // onChange={handleCheckBoxChange}
                                value={checkList}
                            >
                                <Row gutter={[0, 12]}>
                                    {initalFriend.map((element, index) => (
                                        <Col span={24} key={index}>
                                            <Checkbox
                                                disabled={checkInitialValue(element._id)}
                                                value={element._id}
                                                onChange={handleChangeCheckBox}
                                            >
                                                <div className="item-checkbox">
                                                    <PersonalIcon
                                                        demention="small"
                                                        avatar={element.avatar}
                                                        name={element.name}
                                                        color={element.avatarColor}
                                                    />

                                                    <span className="item-name">
                                                        {element.name}
                                                    </span>
                                                </div>
                                            </Checkbox>
                                        </Col>
                                    ))}
                                </Row>
                            </Checkbox.Group>
                        </div>
                    </div>

                    {/* ${itemSelected.length > 0 ? '' : 'close'} */}

                    <div
                        className={`list-friend-interact--right ${
                            itemSelected.length > 0 ? '' : 'close'
                        } `}
                    >
                        <div className="title-list-friend-checked">
                            <strong>
                                Đã chọn: {itemSelected.length > 0 && itemSelected.length}
                            </strong>
                        </div>

                        <div className="checkbox-list-friend">
                            <ItemsSelected items={itemSelected} onRemove={handleRemoveItem} />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

ModalAddMemberToConver.propTypes = {
    onOk: PropTypes.func,
    loading: PropTypes.bool,
    onCancel: PropTypes.func,
    isVisible: PropTypes.bool.isRequired,
    typeModal: PropTypes.number.isRequired,
};

ModalAddMemberToConver.defaultProps = {
    onOk: null,
    loading: false,
    onCancel: null,
};

export default ModalAddMemberToConver;
