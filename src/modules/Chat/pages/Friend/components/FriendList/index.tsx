import "./style.css";
import FriendItem from "../FriendItem";

const FriendList = ({ friends }) => {
  return (
    <>
      <div style={{ fontSize: 14, padding: "1rem" }}>
        Bạn bè ({Object.keys(friends).length - 1})
      </div>
      <div
        id="friend-list"
        style={{ height: "calc(100vh - 16rem)", overflow: "scroll" }}
      >
        {Object.values(friends)
          .slice(0, -1)
          .map((friend: any) => (
            <FriendItem friend={friend} />
          ))}
      </div>
    </>
  );
};

export default FriendList;
