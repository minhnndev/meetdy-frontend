import {useState} from 'react'
import {useSelector} from 'react-redux'
import { UserOutlined, LogoutOutlined, MessageOutlined, LockOutlined, SolutionOutlined, SettingOutlined } from "@ant-design/icons"
import { Popover, Button, Badge } from '@douyinfe/semi-ui'
import { ModalUpdateProfile } from '@/components/modal'
import NavbarStyle from './NavbarStyle'
import PersonalIcon from '../PersonalIcon'
import {Link} from 'react-router-dom'
import './style.css'

type NavbarContainerProps = {
    logout: () => void,
    showModalProfile: () => void,
}

const NavbarContainer = (props: NavbarContainerProps) => {
    const { logout, showModalProfile } = props;

    const { conversations, toTalUnread } = useSelector((state: any) => state.chat);
    const { amountNotify } = useSelector((state: any) => state.friend);

    const checkCurrentPage = (iconName) => {
        if (iconName === 'MESSAGE' && location.pathname === '/chat') {
            return true;
        }
        if (iconName === 'FRIEND' && location.pathname === '/chat/friends') {
            return true;
        }
        return false;
    };

    
    const content = (
        <div className="pop_up-personal">
            <div className="pop_up-personal--item" onClick={showModalProfile}>
                <div className="pop_up-personal--item-icon">
                    <UserOutlined />
                </div>

                <div className="pop_up-personal--item-text">Tài khoản</div>
            </div>

            <div className="pop_up-personal--item" onClick={logout}>
                <div className="pop_up-personal--item-icon">
                    <LogoutOutlined />
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
                    <LockOutlined />
                </div>

                <div className="pop_up-personal--item-text">Đổi mật khẩu</div>
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
                                        // avatar={user.avatar}
                                        // name={user.name}
                                        // color={user.avatarColor}
                                    />
                                </div>
                            </Button>
                        </Popover>
                    </li>

                    <Link className="link-icon" to="/chat">
                        <li
                            className={`sidebar_nav_item  ${
                                checkCurrentPage('MESSAGE') ? 'active' : ''
                            }`}
                            // onClick={() => handleSetTabActive(1)}
                        >
                            <div className="sidebar_nav_item--icon">
                                <Badge 
                                    count={toTalUnread > 0 ? toTalUnread : 0} 
                                    countStyle={toTalUnread <= 0 ? { visibility: 'hidden' } : {}} 
                                >
                                    <MessageOutlined />
                                </Badge>
                            </div>
                        </li>
                    </Link>

                    <Link className="link-icon" to="/chat/friends">
                        <li
                            className={`sidebar_nav_item  ${
                                checkCurrentPage('FRIEND') ? 'active' : ''
                            }`}
                        >
                            <div className="sidebar_nav_item--icon">
                                <Badge count={amountNotify} countStyle={amountNotify <= 0 ? { visibility: 'hidden' } : {}}>
                                    <SolutionOutlined />
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
                                    <SettingOutlined />
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
