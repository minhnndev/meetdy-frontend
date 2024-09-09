import {
  IconUserListStroked,
  IconLockStroked,
  IconExit,
  IconCommentStroked,
  IconSettingStroked,
} from "@douyinfe/semi-icons";
import {
  Popover,
  Badge,
  Button,
  Avatar,
  Nav,
  Space,
  Dropdown,
} from "@douyinfe/semi-ui";
import { setTabActive } from "@/redux/slice/globalSlice";
// import { PersonalIcon } from "../../components";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setToTalUnread } from "@/redux/slice/chat/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import getSummaryName from "@/utils/nameHelper";

function NavbarContainer() {
  const { user } = useAppSelector((state) => state.global);
  const { conversations, toTalUnread } = useAppSelector((state) => state.chat);
  const { amountNotify } = useAppSelector((state) => state.friend);

  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

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

  // const handleSetTabActive = (value) => {
  //   dispatch(setTabActive(value));
  // };

  const handleUpdateProfile = () => {};

  const handleChangePassword = () => {};

  console.log(user);

  return (
    <>
      <Nav
        style={{ width: "65px" }}
        isCollapsed={true}
        defaultOpenKeys={["job", "resource"]}
        items={[
          {
            itemKey: "/chat",
            icon: (
              <Badge count={toTalUnread > 0 ? toTalUnread : null}>
                <IconCommentStroked size="extra-large" />
              </Badge>
            ),
            text: "Trò chuyện",
          },
          {
            itemKey: "/chat/friends",
            icon: (
              <Badge count={amountNotify > 0 ? amountNotify : null}>
                <IconUserListStroked size="extra-large" />
              </Badge>
            ),
            text: "Bạn bè",
          },
        ]}
        onSelect={(key) => navigate(key.itemKey.toString())}
        header={{
          logo: (
            <Avatar
              onClick={handleUpdateProfile}
              style={{ cursor: "pointer" }}
              src={user.avatar}
            >
              {!user.avatar && getSummaryName(user.name)}
            </Avatar>
          ),
        }}
        footer={{
          children: (
            <Dropdown
              trigger={"click"}
              position={"topLeft"}
              render={
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={handleChangePassword}
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
              />
            </Dropdown>
          ),
        }}
      />
    </>
    // <div id="sidebar_wrapper">
    //   <div className="sidebar-main">
    //     <ul className="sidebar_nav">
    //       <li className="sidebar_nav_item icon-avatar">
    //         <Popover placement="bottomLeft" content={content} trigger="focus">
    //           <Button
    //             style={{
    //               height: "48px",
    //               width: "48px",
    //               background: "none",
    //               outline: "none",
    //               border: "red",
    //               padding: "0px",
    //               borderRadius: "50%",
    //             }}
    //           >
    //             <div className="user-icon-navbar">
    //               <PersonalIcon
    //                 isActive={true}
    //                 common={false}
    //                 avatar={user.avatar}
    //                 name={user.name}
    //                 color={user.avatarColor}
    //               />
    //             </div>
    //           </Button>
    //         </Popover>
    //       </li>

    //       <Link className="link-icon" to="/chat">
    //         <li
    //           className={`sidebar_nav_item  ${
    //             checkCurrentPage("MESSAGE") ? "active" : ""
    //           }`}
    //           onClick={() => handleSetTabActive(1)}
    //         >
    //           <div className="sidebar_nav_item--icon">
    //             <Badge
    //               count={toTalUnread > 0 ? toTalUnread : 0}
    //               dot={toTalUnread <= 0}
    //               type="danger"
    //             >
    //               <IconCommentStroked />
    //             </Badge>
    //           </div>
    //         </li>
    //       </Link>

    //       <Link className="link-icon" to="/chat/friends">
    //         <li
    //           className={`sidebar_nav_item  ${
    //             checkCurrentPage("FRIEND") ? "active" : ""
    //           }`}
    //           onClick={() => handleSetTabActive(2)}
    //         >
    //           <div className="sidebar_nav_item--icon">
    //             <Badge
    //               count={amountNotify > 0 ? amountNotify : 0}
    //               dot={amountNotify <= 0}
    //               type="danger"
    //             >
    //               <IconUserListStroked />
    //             </Badge>
    //           </div>
    //         </li>
    //       </Link>
    //     </ul>

    //     <ul className="sidebar_nav">
    //       <li className="sidebar_nav_item">
    //         <div className="sidebar_nav_item--icon">
    //           <Popover placement="rightTop" content={setting} trigger="focus">
    //             <Button
    //               style={{
    //                 height: "100%",
    //                 width: "100%",
    //                 background: "none",
    //                 outline: "none",
    //                 border: "red",
    //                 padding: "0px",
    //               }}
    //             >
    //               <IconSettingStroked />
    //             </Button>
    //           </Popover>
    //         </div>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
  );
}

export { NavbarContainer };
