import {
  TGroupConversation,
  TIndividualConversation,
} from "@/models/conversation.model";
import { Nav, TabPane, Tabs, Typography } from "@douyinfe/semi-ui";
import { UserAvatar } from "../UserAvatar";
import "./style.css";
import { GroupAvatar } from "../GroupAvatar";
import { useAppDispatch } from "@/redux/store";
import { useNavigate } from "react-router";
import {
  fetchListMessages,
  setCurrentConversation,
} from "@/redux/slice/chat/chatSlice";

const SearchResultTabs = ({ individuals, groups }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (value) => {
    dispatch(fetchListMessages({ conversationId: value._id, size: 10 }));
    dispatch(setCurrentConversation(value._id));
    navigate("/chat");
  };

  return (
    <Tabs>
      <TabPane
        tab="Cá nhân"
        itemKey="1"
        style={{ height: "calc(100vh - 130px)", overflow: "scroll" }}
      >
        {individuals?.map((individual: TIndividualConversation) => (
          <Nav.Item
            itemKey={individual._id}
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => handleClick(individual)}
          >
            <UserAvatar
              avatar={individual.avatar.toString()}
              color={individual.avatarColor}
              name={individual.name}
            />
            <Typography.Text style={{ marginLeft: 8 }}>
              {individual.name}
            </Typography.Text>
          </Nav.Item>
        ))}
      </TabPane>
      <TabPane
        tab="Nhóm"
        itemKey="2"
        style={{ height: "calc(100vh - 130px)", overflow: "scroll" }}
      >
        {groups?.map((group: TGroupConversation) => (
          <Nav.Item
            itemKey={group._id}
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => handleClick(group)}
          >
            <div
              style={{
                margin: `${group.totalMembers == 2 ? "11px 0" : "0 0"}`,
              }}
            >
              <GroupAvatar
                avatars={group.avatar}
                totalMembers={group.totalMembers}
                smallSize={30}
                largeSize={30}
              />
            </div>
            <Typography.Text style={{ marginLeft: 8 }}>
              {group.name}
            </Typography.Text>
          </Nav.Item>
        ))}
      </TabPane>
    </Tabs>
  );
};

export { SearchResultTabs };
