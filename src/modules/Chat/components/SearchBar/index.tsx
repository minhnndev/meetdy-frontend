import { IconSearch, IconUserAdd, IconUserGroup } from "@douyinfe/semi-icons";
import { Button, Input, Toast } from "@douyinfe/semi-ui";
import { useRef, useState } from "react";
import FindFriendModal from "../FindFriendModal";
import ServiceUser from "@/api/userApi";
import { UserCard } from "../UserCard";
import { TSuggestFriend } from "@/models/friend.model";
import { INIT_SUGGEST_FRIEND } from "@/constants/friend.constant";
import CreateGroupModal from "../CreateGroupModal";

const SearchBar = ({ onChange, onSearch }) => {
  const [showFindFriend, setShowFindFriend] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [findingUser, setFindingUser] =
    useState<TSuggestFriend>(INIT_SUGGEST_FRIEND);
  const [showUserCard, setShowUserCard] = useState(false);
  const refDebounce = useRef(null);

  const handleInputChange = (value: string) => {
    if (onChange) onChange(value);

    if (refDebounce.current) {
      clearTimeout(refDebounce.current);
    }
    refDebounce.current = setTimeout(() => {
      if (onSearch) onSearch();
    }, 400);
  };

  const searchUser = async (value: string) => {
    try {
      const user = await ServiceUser.getUser(value);
      setFindingUser(user);
      setShowUserCard(true);
      setShowFindFriend(false);
    } catch (error) {
      Toast.error("Không tìm thấy người dùng");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Input
        prefix={<IconSearch />}
        style={{ marginRight: 2 }}
        placeholder="Tìm kiếm"
        showClear
        onChange={handleInputChange}
      />
      <Button
        theme="borderless"
        type="tertiary"
        icon={<IconUserAdd />}
        style={{ marginRight: 2 }}
        onClick={() => setShowFindFriend(true)}
      />
      <Button
        theme="borderless"
        type="tertiary"
        icon={<IconUserGroup />}
        onClick={() => setShowCreateGroup(true)}
      />
      <FindFriendModal
        visible={showFindFriend}
        onCancel={() => setShowFindFriend(false)}
        onSearch={searchUser}
      />
      <UserCard
        visible={showUserCard}
        onCancel={() => setShowUserCard(false)}
        user={findingUser}
      />
      <CreateGroupModal
        visible={showCreateGroup}
        onCancel={() => setShowCreateGroup(false)}
      />
    </div>
  );
};

export { SearchBar };
