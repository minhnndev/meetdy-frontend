import "./style.css";
import FriendItem from "../FriendItem";
import { Typography } from "@douyinfe/semi-ui";
import React from "react";

const FriendList = ({ friends }) => {
    return (
        <>
            <div style={{ fontSize: 14, padding: "0.75rem 1rem 0.5rem 1rem" }}>
                <Typography.Text>Bạn bè ({Object.keys(friends).length})</Typography.Text>
            </div>
            <div
                id="friend-list"
                className="hide-scroll"
                style={{ height: "calc(100vh - 242px)", overflow: "scroll" }}
            >
                {friends.map((friend: any) => (
                    <FriendItem key={friend._id} friend={friend} />
                ))}
            </div>
        </>
    );
};

export { FriendList };
