import { Nav } from "@douyinfe/semi-ui";
import "./style.css";
import { SearchBar } from "../../components";
import { useAppSelector } from "@/redux/store";
import FriendList from "./components/FriendList";
import { friendSubtabs } from "@/constants/friend.constant";
import FriendHeader from "./components/FriendHeader";

const Friend = () => {
  const { friends } = useAppSelector((state) => state.friend);

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <div id="friend-sidebar">
        <Nav style={{ width: 300 }}>
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
                itemKey={option.key}
                text={option.text}
                icon={option.icon()}
              />
            ))}
          </div>
          <FriendList friends={friends} />
        </Nav>
      </div>

      <div style={{ flex: 1 }}>
        <FriendHeader subtab={0} />
      </div>
    </div>
  );
};

export { Friend };
