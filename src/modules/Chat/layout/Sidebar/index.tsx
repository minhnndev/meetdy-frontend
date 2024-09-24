import {
  IconUserListStroked,
  IconLockStroked,
  IconExit,
  IconCommentStroked,
  IconSettingStroked,
} from "@douyinfe/semi-icons";
import { Badge, Nav, Dropdown } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setToTalUnread } from "@/redux/slice/chat/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import "./style.css";
import {
  ChangePasswordModal,
  UpdateProfileModal,
  UserAvatar,
} from "../../components";

function Sidebar({ onSaveCodeRevoke }) {
  const { user } = useAppSelector((state) => state.global);
  const { conversations, toTalUnread } = useAppSelector((state) => state.chat);
  const { amountNotify } = useAppSelector((state) => state.friend);

  const [showSettingDropdown, setShowSettingDropdown] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(setToTalUnread());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversations]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.reload();
  };

  return (
    <>
      <Nav
        style={{ width: "65px", backgroundColor: "#4c92ff" }}
        isCollapsed={true}
        onSelect={(key) => navigate(key.itemKey.toString())}
      >
        <Nav.Header
          logo={
            <UserAvatar
              isActive
              avatar={user.avatar}
              color={user.avatarColor}
              name={user.name}
              onClick={() => setShowUpdateProfileModal(true)}
            />
          }
        />
        <Nav.Item
          className={`meetdy-nav-item ${pathname === "/chat" && "active"}`}
          itemKey="/chat"
          text="Trò chuyện"
          icon={
            <Badge count={toTalUnread > 0 ? toTalUnread : null} type="danger">
              <IconCommentStroked size="extra-large" />
            </Badge>
          }
          style={{ height: "48px" }}
        />
        <Nav.Item
          className={`meetdy-nav-item ${
            pathname === "/chat/friends" && "active"
          }`}
          itemKey="/chat/friends"
          text="Bạn bè"
          icon={
            <Badge count={amountNotify > 0 ? amountNotify : null} type="danger">
              <IconUserListStroked size="extra-large" />
            </Badge>
          }
          style={{ height: "48px" }}
        />
        <Nav.Footer style={{ color: "white", marginBottom: 16 }}>
          <Dropdown
            visible={showSettingDropdown}
            onClickOutSide={() => setShowChangePasswordModal(false)}
            position={"topLeft"}
            trigger="click"
            render={
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    setShowChangePasswordModal(true);
                    setShowSettingDropdown(false);
                  }}
                  icon={<IconLockStroked />}
                >
                  Đổi mật khẩu
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout} icon={<IconExit />}>
                  Đăng xuất
                </Dropdown.Item>
              </Dropdown.Menu>
            }
          >
            <IconSettingStroked
              style={{ cursor: "pointer" }}
              size="extra-large"
              onClick={() => setShowSettingDropdown(true)}
            />
          </Dropdown>
        </Nav.Footer>
      </Nav>
      <UpdateProfileModal
        visible={showUpdateProfileModal}
        onCancel={() => setShowUpdateProfileModal(false)}
      />
      <ChangePasswordModal
        visible={showChangePasswordModal}
        onCancel={() => setShowChangePasswordModal(false)}
        onSaveCodeRevoke={onSaveCodeRevoke}
      />
    </>
  );
}

export default Sidebar;
