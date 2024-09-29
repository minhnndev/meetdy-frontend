import { TRequestFriend, TSuggestFriend } from "@/models/friend.model";
import { CardGroup, Row, Typography } from "@douyinfe/semi-ui";
import FriendCard from "../FriendCard";
import SuggestCard from "../SuggestCard";

const SubtabFriend = ({ requestFriends, myRequestFriend, suggestFriends }) => {
  const { Text } = Typography;
  return (
    <>
      <Row style={{ marginTop: "1rem" }}>
        <Text style={{ fontWeight: 500 }}>
          Lời mời kết bạn ({requestFriends.length ?? 0})
        </Text>
        {requestFriends?.map((request: TRequestFriend) => (
          <FriendCard key={request._id} request={request} />
        ))}
      </Row>
      <Row
        style={{
          marginTop: `${requestFriends.length == 0 ? "1rem" : "0.5rem"}`,
        }}
      >
        <Text style={{ fontWeight: 500 }}>
          Yêu cầu kết bạn đã gửi ({myRequestFriend.length ?? 0})
        </Text>

        {myRequestFriend?.map((request: TRequestFriend) => (
          <FriendCard key={request._id} request={request} isMine />
        ))}
      </Row>
      <Row
        style={{
          marginTop: `${myRequestFriend.length == 0 ? "1rem" : "0.5rem"}`,
          marginBottom: "1rem",
        }}
      >
        <Text style={{ fontWeight: 500 }}>
          Gợi ý kết bạn (
          {suggestFriends.filter((suggest) => suggest.status === "NOT_FRIEND")
            .length ?? 0}
          )
        </Text>

        <div style={{ marginTop: "0.75rem" }}>
          <CardGroup>
            {suggestFriends
              ?.filter((suggest) => suggest.status === "NOT_FRIEND")
              .map((suggest: TSuggestFriend) => (
                <SuggestCard key={suggest._id} suggest={suggest} />
              ))}
          </CardGroup>
        </div>
      </Row>
    </>
  );
};

export { SubtabFriend };
