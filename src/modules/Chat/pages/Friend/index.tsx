import { Nav } from "@douyinfe/semi-ui";
import { SearchBar, SearchResultTabs } from "../../components/common";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { FRIEND_SUB_TABS } from "@/constants/friend.constant";
import { useEffect, useState } from "react";
import {
    fetchContacts,
    fetchFriends,
    fetchListGroup,
    fetchListMyRequestFriend,
    fetchListRequestFriend,
    fetchSuggestFriend,
} from "@/redux/slice/friendSlice";
import { FriendHeader, FriendList, SubtabFriend, SubtabContact } from "./components";
import "./style.css";
import SubtabGroup from "./components/Subtab/SubtabGroup";
import ServiceConversation from "@/api/conversationApi";
import React from "react";

const Friend = () => {
    const dispatch = useAppDispatch();
    const { friends, requestFriends, myRequestFriend, suggestFriends, phoneBook, groups } =
        useAppSelector((state) => state.friend);
    const [subTab, setSubTab] = useState<string>(FRIEND_SUB_TABS[0].key);
    const [showSearchFilter, setShowSearchFilter] = useState(false);
    const [individualSearch, setIndividualSearch] = useState([]);
    const [groupSearch, setGroupSearch] = useState([]);

    useEffect(() => {
        dispatch(fetchListRequestFriend());
        dispatch(fetchListMyRequestFriend());
        dispatch(fetchFriends({ name: "" }));
        dispatch(fetchListGroup({ name: "", type: 2 }));
        dispatch(fetchContacts());
        dispatch(fetchSuggestFriend());
    }, [dispatch]);

    const handleOnSearch = async (value: string) => {
        try {
            const individuals = await ServiceConversation.getListConversations({
                name: value,
                type: 1,
            });
            const groups = await ServiceConversation.getListConversations({
                name: value,
                type: 2,
            });
            setIndividualSearch(individuals);
            setGroupSearch(groups);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ display: "flex", flex: 1 }}>
            <div id="friend-sidebar">
                <Nav
                    style={{ width: 310 }}
                    onSelect={(data) =>
                        data.itemKey.toString().includes("subtab") &&
                        setSubTab(data.itemKey.toString())
                    }
                >
                    <Nav.Header
                        style={{
                            padding: "1rem",
                        }}
                    >
                        <SearchBar onSearch={handleOnSearch} setShowFilter={setShowSearchFilter} />
                    </Nav.Header>
                    {showSearchFilter ? (
                        <SearchResultTabs individuals={individualSearch} groups={groupSearch} />
                    ) : (
                        <>
                            <div
                                style={{
                                    borderTop: "1px solid rgba(var(--semi-grey-1), 1)",
                                    borderBottom: "1px solid rgba(var(--semi-grey-1), 1)",
                                }}
                            >
                                {FRIEND_SUB_TABS.map((option) => (
                                    <Nav.Item
                                        key={option.key}
                                        itemKey={option.key}
                                        text={option.text}
                                        icon={option.icon()}
                                    />
                                ))}
                            </div>
                            <FriendList friends={friends} />
                        </>
                    )}
                </Nav>
            </div>

            <div id="friend-content" style={{ flex: 1 }}>
                <FriendHeader subtab={subTab} />

                <div
                    className="hide-scroll"
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

                    {subTab === "subtab-contact" && <SubtabContact phoneBook={phoneBook} />}
                </div>
            </div>
        </div>
    );
};

export { Friend };
