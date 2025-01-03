import React from "react";
import { useRef, useState } from "react";
import { IconSearch, IconUserAdd, IconUserGroup } from "@douyinfe/semi-icons";
import { Button, Input, Toast } from "@douyinfe/semi-ui";
import ServiceUser from "@/api/userApi";

import FindFriendModal from "../FindFriendModal";
import CreateGroupModal from "../CreateGroupModal";
import { UserCard } from "../UserCard";

import { TSuggestFriend } from "@/models/friend.model";
import { INIT_SUGGEST_FRIEND } from "@/constants/friend.constant";

const SearchBar = ({ onSearch, setShowFilter }) => {
    const [showFindFriend, setShowFindFriend] = useState(false);
    const [showCreateGroup, setShowCreateGroup] = useState(false);
    const [findingUser, setFindingUser] = useState<TSuggestFriend>(INIT_SUGGEST_FRIEND);
    const [showUserCard, setShowUserCard] = useState(false);
    const refDebounce = useRef(null);

    const handleInputChange = (value: string) => {
        if (setShowFilter) setShowFilter(value.trim().length > 0);

        if (refDebounce.current) {
            clearTimeout(refDebounce.current);
        }
        refDebounce.current = setTimeout(() => {
            if (onSearch) onSearch(value);
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
                style={{ marginRight: 2, width: 210 }}
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
