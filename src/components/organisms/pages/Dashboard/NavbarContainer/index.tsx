import {useDispatch, useSelector} from 'react-redux'
import {
    IcUserDefault,
   IcLock,
   IcLogout,
   IcListConversations,
   IcSetting,
   IcListFriends,
} from "@/theme/icons/MDIcons";
import { Popover, Button, Badge } from '@douyinfe/semi-ui'
import NavbarStyle from './NavbarStyle'
import PersonalIcon from '@/components/molecules/PersonalIcon'
import {Link} from 'react-router-dom'
import './style.css'
import direct from '@/constants/direct'
import { GlobalState, setTabActive, TabActive } from '@/redux/slice/globalSlice'

type NavbarContainerProps = {
    logout: () => void,
    showModalProfile: () => void,
    showModalChangePassword: () => void
}

const NavbarContainer = (props: NavbarContainerProps) => {
    const { logout, showModalProfile, showModalChangePassword } = props;

    const { toTalUnread } = useSelector((state: any) => state.chat);
    const { amountNotify } = useSelector((state: any) => state.friend);
    const { userProfile } = useSelector((state: any) => state.account);
    const { tabActive } = useSelector((state: any) => state.global) as GlobalState;

    const { chatEndpoint, friendEndpoint } = direct();
    const dispatch = useDispatch();

    const isChatPage = (location.pathname === chatEndpoint && tabActive === TabActive.Chat);

    const isFriendPage = (location.pathname === friendEndpoint && tabActive === TabActive.Friend);

    const handleShowModalProfile = () => showModalProfile();
    const handleShowChangePassword = () => showModalChangePassword();

    const handleSetTabActive = (tab: TabActive) => {
        dispatch(setTabActive(tab))
    }

    
    const content = (
        <div className="pop_up-personal">
            <div className="pop_up-personal--item" onClick={handleShowModalProfile}>
                <div className="pop_up-personal--item-icon">
                    <IcUserDefault />
                </div>

                <div className="pop_up-personal--item-text">Tài khoản</div>
            </div>

            <div className="pop_up-personal--item" onClick={logout}>
                <div className="pop_up-personal--item-icon">
                    <IcLogout />
                </div>

                <div className="pop_up-personal--item-text">
                    Đăng xuất
                </div>
            </div>
        </div>
    );

    const setting = (
        <div className="pop_up-personal">
            <div className="pop_up-personal--item">
                <div className="pop_up-personal--item-icon">
                    <IcLock />
                </div>

                <div 
                    className="pop_up-personal--item-text"
                    onClick={handleShowChangePassword}
                >
                    Đổi mật khẩu
                </div>
            </div>
        </div>
    );

    return (
        <div id="sidebar_wrapper">
            <div className="sidebar-main">
                <ul className="sidebar_nav">
                    <li className="sidebar_nav_item icon-avatar">
                        <Popover position="bottomLeft" content={content} trigger="focus" showArrow>
                            <Button style={NavbarStyle.BUTTON}>
                                <div className="user-icon-navbar">
                                    <PersonalIcon
                                        isActive={true}
                                        common={false}
                                        avatar={userProfile.avatar}
                                        name={userProfile.name}
                                        color={userProfile.avatarColor}
                                        demention='medium'
                                    />
                                </div>
                            </Button>
                        </Popover>
                    </li>

                    <Link className="link-icon" to={chatEndpoint}>
                        <li
                            className={`sidebar_nav_item  ${
                                isChatPage ? 'active' : ''
                            }`}
                            onClick={() => handleSetTabActive(TabActive.Chat)}
                        >
                            <div className="sidebar_nav_item--icon">
                                <Badge 
                                    count={toTalUnread > 0 ? toTalUnread : 0} 
                                    countStyle={toTalUnread <= 0 ? { visibility: 'hidden' } : {}} 
                                >
                                    <IcListConversations size='extra-large' />
                                </Badge>
                            </div>
                        </li>
                    </Link>

                    <Link className="link-icon" to={friendEndpoint}>
                        <li
                            className={`sidebar_nav_item  ${
                                isFriendPage ? 'active' : ''
                            }`}
                            onClick={() => handleSetTabActive(TabActive.Friend)}
                        >
                            <div className="sidebar_nav_item--icon">
                                <Badge count={amountNotify} countStyle={amountNotify <= 0 ? { visibility: 'hidden' } : {}}>
                                    <IcListFriends size='extra-large' />
                                </Badge>
                            </div>
                        </li>
                    </Link>
                </ul>

                <ul className="sidebar_nav">
                    <li className="sidebar_nav_item">
                        <div className="sidebar_nav_item--icon">
                            <Popover position="rightTop" showArrow content={setting} trigger="focus">
                                <Button style={NavbarStyle.BUTTON_SETTING}>
                                    <IcSetting size='extra-large' />
                                </Button>
                            </Popover>
                        </div>
                    </li>
                </ul>
                
            </div>
        </div>
    )
}

export default NavbarContainer;
