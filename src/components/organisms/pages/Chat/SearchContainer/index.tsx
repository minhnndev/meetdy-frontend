import { Input, Notification, Radio } from '@douyinfe/semi-ui';
import userApi from '@/api/userApi';
// import ModalAddFriend from 'components/ModalAddFriend';
// import UserCard from 'components/UserCard';
// import ModalClassify from 'features/Chat/components/ModalClassify';
// import ModalCreateGroup from 'features/Chat/components/ModalCreateGroup';
import { createGroup } from '@/redux/slice/chat/chatSlice';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { IcAddUser, IcAlignLeft, IcPlus, IcSearch, IcUserAddGroup } from '@/theme/icons/MDIcons';

type SearchContainerProps = {
    onSearchChange: (value: string) => void,
    valueText: string,
    onSubmitSearch: (value: string) => void,
    isFriendPage: boolean,
    onFilterClasify: (value: string) => void,
    valueClassify: string,
    isFilter?: boolean,
};

const SearchContainer = (props: SearchContainerProps) => {
    const {onSearchChange, onSubmitSearch, onFilterClasify} = props;
    const {valueText, isFriendPage, valueClassify, isFilter} = props;
    const [isModalCreateGroupVisible, setIsModalCreateGroupVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { classifies } = useSelector((state: any) => state.chat);
    const [isShowModalClasify, setIsShowModalClasify] = useState(false);
    const [isShowModalAddFriend, setShowModalAddFriend] = useState(false);
    const [userIsFind, setUserIsFind] = useState({});
    const [visibleUserCard, setVisbleUserCard] = useState(false);
    const refDebounce = useRef(null);
    const dispatch = useDispatch();

    const handleCreateClasify = () => {
        setIsShowModalClasify(true);
    };

    // ------

    const handleOnChange = (e: any) => {
        const value = e;
        if (onFilterClasify) {
            onFilterClasify(value);
        }
    };

    // --- HANDLE CREATE GROUP

    const handleCreateGroup = () => {
        setIsModalCreateGroupVisible(true);
    };

    // const handleCancelModalCreatGroup = (value) => {
    //     setIsModalCreateGroupVisible(value);
    // };

    // const handleOklModalCreatGroup = (value) => {
    //     setConfirmLoading(true);
    //     dispatch(createGroup(value) as any);
    //     setConfirmLoading(false);
    //     setIsModalCreateGroupVisible(false);
    // };

    // -----

    // HANDLE ADD FRIEND

    const handleOpenModalAddFriend = () => {
        setShowModalAddFriend(true);
    };

    const handleClearText = () => {
        console.log('Clear text')
        onFilterClasify('')
    }
    
    // const handeCancelModalAddFriend = () => {
    //     setShowModalAddFriend(false);
    // };

    const handFindUser = async (value: string) => {
        try {
            const user = await userApi.getUser(value);
            setUserIsFind(user);
            setVisbleUserCard(true);
            setShowModalAddFriend(false);
        } catch (error) {
            Notification.error({content: 'Không tìm thấy người dùng'});
        }
    };

    const handOnSearchUser = (value) => {
        handFindUser(value);
    };

    // const handleOnEnter = (value) => {
    //     handFindUser(value);
    // };

    // // ------------

    // const handleCancelModalUserCard = () => {
    //     setVisbleUserCard(false);
    // };

    const handleInputChange = (e: string) => {
        console.log("🚀 ~ handleInputChange ~ e:", e)
        const value = e;

        if (onSearchChange) {
            onSearchChange(value);
        }

        if (value.length > 0) {
            if (refDebounce.current) {
                clearTimeout(refDebounce.current);
            }
            refDebounce.current = setTimeout(() => {
                if (onSubmitSearch) {
                    onSubmitSearch(value);
                }
            }, 400);
        }
    };

    return (
        <div id="search-wrapper">
            <div className="search-main">
                <div className="search-top">
                    <div className="search-top_input-search">
                        <Input
                            placeholder="Tìm kiếm"
                            prefix={<IcSearch />}
                            onChange={(e) => handleInputChange(e)}
                            showClear
                            className='search-input'
                        />
                    </div>

                    <div className="search-top_add-friend" onClick={handleOpenModalAddFriend}>
                        <IcAddUser />
                    </div>

                    <div className="search-top_create-group" onClick={handleCreateGroup}>
                        <IcUserAddGroup />
                    </div>
                </div>

                {(!isFriendPage && !isFilter) && (
                    <>
                        {!(valueText.trim().length > 0) && (
                            <div className="search-bottom">
                                <div className="classify-title">
                                    <div>
                                        <IcAlignLeft /> &nbsp;
                                        <span>Phân loại</span>
                                    </div>
                                    <div className="add-classify" onClick={handleCreateClasify}>
                                        <IcPlus />
                                    </div>
                                </div>
                                <div className="classify-element">
                                    <Scrollbars
                                        autoHide={true}
                                        autoHideTimeout={1000}
                                        autoHideDuration={200}
                                        style={{ width: '100%' }}
                                    >
                                        <Radio.Group
                                            onChange={handleOnChange}
                                            value={valueClassify}
                                        >
                                            <Radio value={'0'}>Tất cả</Radio>
                                            {classifies.map((ele, index) => (
                                                <Radio key={index} value={ele._id}>
                                                    {ele.name}
                                                </Radio>
                                            ))}
                                        </Radio.Group>
                                    </Scrollbars>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

SearchContainer.propTypes = {
    onVisibleFilter: PropTypes.func,
    onSearchChange: PropTypes.func,
    valueText: PropTypes.string,
    onSubmitSearch: PropTypes.func,
    isFriendPage: PropTypes.bool,
    onFilterClasify: PropTypes.func,
    valueClassify: PropTypes.string.isRequired,
};

SearchContainer.defaultProps = {
    onVisibleFilter: null,
    valueText: '',
    onSearchChange: null,
    onSubmitSearch: null,
    isFriendPage: false,
    onFilterClasify: null,
};


export default SearchContainer;
