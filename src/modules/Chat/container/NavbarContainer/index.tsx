import {
  IconUserListStroked,
  IconLockStroked,
  IconExit,
  IconCommentStroked,
  IconSettingStroked,
  IconUserStroked,
} from "@douyinfe/semi-icons";
import { Popover, Badge, Button } from "@douyinfe/semi-ui";
import { setTabActive } from "@/redux/slice/globalSlice";
import { PersonalIcon } from "../../components";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { setToTalUnread } from "@/redux/slice/chat/chatSlice";
import NavbarStyle from "./NavbarStyle";
import "./style.css";
import { useAppDispatch, useAppSelector } from "@/redux/store";

function NavbarContainer() {
  const { user } = useAppSelector((state) => state.global);
  const { conversations, toTalUnread } = useAppSelector((state) => state.chat);
  const { amountNotify } = useAppSelector((state) => state.friend);

  const dispatch = useAppDispatch();
  const location = useLocation();

  const checkCurrentPage = (iconName) => {
    if (iconName === "MESSAGE" && location.pathname === "/chat") {
      return true;
    }
    if (iconName === "FRIEND" && location.pathname === "/chat/friends") {
      return true;
    }
    return false;
  };

  useEffect(() => {
    dispatch(setToTalUnread());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversations]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.reload();
  };

  const handleSetTabActive = (value) => {
    dispatch(setTabActive(value));
  };

  const handleUpdateProfile = () => {};

  const content = (
    <div className="pop_up-personal" style={{ padding: "12px" }}>
      <div className="pop_up-personal--item" onClick={handleUpdateProfile}>
        <div className="pop_up-personal--item-icon">
          <IconUserStroked />
        </div>

        <div className="pop_up-personal--item-text">Tài khoản</div>
      </div>

      <div className="pop_up-personal--item">
        <div className="pop_up-personal--item-icon">
          <IconExit />
        </div>

        <div className="pop_up-personal--item-text" onClick={handleLogout}>
          Đăng xuất
        </div>
      </div>
    </div>
  );

  const handleChangePassword = () => {};

  const setting = (
    <div className="pop_up-personal" style={{ padding: "12px" }}>
      <div className="pop_up-personal--item" onClick={handleChangePassword}>
        <div className="pop_up-personal--item-icon">
          <IconLockStroked />
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
            <Popover placement="bottomLeft" content={content} trigger="focus">
              <Button style={NavbarStyle.BUTTON}>
                <div className="user-icon-navbar">
                  <PersonalIcon
                    isActive={true}
                    common={false}
                    avatar={user.avatar}
                    name={user.name}
                    color={user.avatarColor}
                  />
                </div>
              </Button>
            </Popover>
          </li>

          <Link className="link-icon" to="/chat">
            <li
              className={`sidebar_nav_item  ${
                checkCurrentPage("MESSAGE") ? "active" : ""
              }`}
              onClick={() => handleSetTabActive(1)}
            >
              <div className="sidebar_nav_item--icon">
                <Badge
                  count={toTalUnread > 0 ? toTalUnread : 0}
                  dot={toTalUnread <= 0}
                  type="danger"
                >
                  <IconCommentStroked />
                </Badge>
              </div>
            </li>
          </Link>

          <Link className="link-icon" to="/chat/friends">
            <li
              className={`sidebar_nav_item  ${
                checkCurrentPage("FRIEND") ? "active" : ""
              }`}
              onClick={() => handleSetTabActive(2)}
            >
              <div className="sidebar_nav_item--icon">
                <Badge
                  count={amountNotify > 0 ? amountNotify : 0}
                  dot={amountNotify <= 0}
                  type="danger"
                >
                  <IconUserListStroked />
                </Badge>
              </div>
            </li>
          </Link>
        </ul>

        <ul className="sidebar_nav">
          <li className="sidebar_nav_item">
            <div className="sidebar_nav_item--icon">
              <Popover placement="rightTop" content={setting} trigger="focus">
                <Button style={NavbarStyle.BUTTON_SETTING}>
                  <IconSettingStroked />
                </Button>
              </Popover>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export { NavbarContainer };
