import { GroupAvatar, UserAvatar } from "@/modules/Chat/components";
import { Nav, Typography } from "@douyinfe/semi-ui";
import ShortMessage from "../ShortMessage";

const ConversationItem = ({ conversation }) => {
  const { Paragraph } = Typography;
  const {
    _id,
    avatar,
    avatarColor,
    name,
    totalMembers,
    lastMessage,
    numberUnread,
  } = conversation;

  console.log(lastMessage?.createdAt);
  console.log(numberUnread);

  return (
    <>
      {lastMessage && (
        <Nav.Item
          itemKey={_id}
          icon={
            typeof avatar === "string" ? (
              <UserAvatar
                avatar={avatar.toString()}
                color={avatarColor}
                name={name}
              />
            ) : (
              <GroupAvatar
                avatars={avatar}
                totalMembers={totalMembers}
                smallSize={30}
                largeSize={30}
              />
            )
          }
          text={
            <div
              className="flex-center"
              style={{ width: 215, justifyContent: "space-between" }}
            >
              <div
                style={{
                  margin: "4px 0",
                  padding: 0,
                }}
                onClick={() => {}}
              >
                <Paragraph
                  style={{ width: 170 }}
                  ellipsis={{ showTooltip: true }}
                  strong
                >
                  {name}
                </Paragraph>
                <ShortMessage message={lastMessage} type={conversation.type} />
              </div>
              <div style={{ marginLeft: -30 }}>
                <Paragraph type="tertiary" size="small">
                  {lastMessage?.createdAt}
                </Paragraph>
                {numberUnread > 0 && (
                  <Paragraph type="tertiary" size="small">
                    {numberUnread}
                  </Paragraph>
                )}
              </div>
            </div>
          }
        />
      )}
    </>
  );
};

export default ConversationItem;
