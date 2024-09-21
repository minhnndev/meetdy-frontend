import { Nav } from "@douyinfe/semi-ui";
import { SearchBar } from "../../components";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { friendSubtabs } from "@/constants/friend.constant";
import { useEffect, useState } from "react";
import { fetchSuggestFriend } from "@/redux/slice/friendSlice";
import {
  FriendHeader,
  FriendList,
  SubtabFriend,
  SubtabContact,
} from "./components";
import "./style.css";
import SubtabGroup from "./components/Subtab/SubtabGroup";

const Friend = () => {
  const dispatch = useAppDispatch();
  const {
    friends,
    requestFriends,
    myRequestFriend,
    suggestFriends,
    phoneBook,
    groups,
  } = useAppSelector((state) => state.friend);
  const [subTab, setSubTab] = useState<string>(friendSubtabs[0].key);

  useEffect(() => {
    dispatch(fetchSuggestFriend());
  }, [dispatch]);

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <div id="friend-sidebar">
        <Nav
          style={{ width: 300 }}
          onSelect={(data) =>
            data.itemKey.toString().includes("subtab") &&
            setSubTab(data.itemKey.toString())
          }
        >
          <Nav.Header
            style={{
              padding: "1rem",
              borderBottom: "1px solid rgba(var(--semi-grey-1), 1)",
            }}
          >
            <SearchBar />
          </Nav.Header>
          <div
            style={{ borderBottom: "1px solid rgba(var(--semi-grey-1), 1)" }}
          >
            {friendSubtabs.map((option) => (
              <Nav.Item
                key={option.key}
                itemKey={option.key}
                text={option.text}
                icon={option.icon()}
              />
            ))}
          </div>
          <FriendList friends={friends} />
        </Nav>
      </div>

      <div id="friend-content" style={{ flex: 1 }}>
        <FriendHeader subtab={subTab} />

        <div
          style={{
            height: "calc(100vh - 61px)",
            overflow: "scroll",
            padding: "0rem 3rem 0 3rem",
            backgroundColor: "#F9F7F8",
          }}
        >
          {subTab === "subtab-friends" && (
            <SubtabFriend
              requestFriends={requestFriends}
              myRequestFriend={myRequestFriend}
              suggestFriends={suggestFriends}
            />
          )}

          {subTab === "subtab-group" && <SubtabGroup groups={groups} />}

          {subTab === "subtab-contact" && (
            <SubtabContact phoneBook={phoneBook} />
          )}
        </div>
      </div>
    </div>
  );
};

export { Friend };
