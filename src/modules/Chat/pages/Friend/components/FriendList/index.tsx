import "./style.css";
import FriendItem from "../FriendItem";

const FriendList = ({ friends }) => {
  return (
    <>
      <div style={{ fontSize: 14, padding: "0.75rem 1rem 0.5rem 1rem" }}>
        Bạn bè ({Object.keys(friends).length})
      </div>
      <div
        id="friend-list"
        style={{ height: "calc(100vh - 16rem)", overflow: "scroll" }}
      >
        {friends.map((friend: any) => (
          <FriendItem key={friend._id} friend={friend} />
        ))}
      </div>
    </>
  );
};

export { FriendList };
