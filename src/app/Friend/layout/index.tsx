import NavHeader from "@/app/Friend/components/NavHeader";
import { FRIEND_SUB_TABS } from "@/constants/friend.constant";
import { setJoinChatLayout, setJoinFriendLayout } from "@/redux/slice/globalSlice";
import { useAppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const FriendLayout = () => {
    const dispatch = useAppDispatch();
    const [subTab, setSubTab] = useState<string>(FRIEND_SUB_TABS[0].key);

    useEffect(() => {
        dispatch(setJoinFriendLayout(true));
        dispatch(setJoinChatLayout(false));

        return () => {
            dispatch(setJoinFriendLayout(false));
        };
    }, [dispatch]);

    return (
        <div className="flex divide-x divide-border h-screen w-full">
            <div className="w-80 flex-shrink-0">
                <NavHeader subTab={subTab} setSubTab={setSubTab} />
            </div>
            <div className="flex-grow">
                <Outlet context={subTab} />
            </div>
        </div>
    );
};
export default FriendLayout;
