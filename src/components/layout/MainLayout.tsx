import AppSidebar from "@/components/common/Sidebar/AppSidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useFetchListColor } from "@/hooks/classify/useFetchColors";
import { useFetchListClassify } from "@/hooks/classify/useFetchListClassify";
import { useFetchListConversations } from "@/hooks/conversation/useFetchListConversations";
import { useFetchFriends } from "@/hooks/friend/useFetchFriends";
import { useFetchListRequestFriend } from "@/hooks/friend/useFetchListRequestFriend";
import { useFetchMyRequestFriend } from "@/hooks/friend/useFetchMyRequestFriend";
import { useFetchAllStickers } from "@/hooks/sticker/useFetchAllStickers";
import {
    setClassifies,
    setColors,
    setConversations,
    setStickers,
} from "@/redux/slice/chat/chatSlice";
import {
    setFriends,
    setGroups,
    setMyRequestFriend,
    setRequestFriends,
} from "@/redux/slice/friendSlice";
import { setTabActive } from "@/redux/slice/globalSlice";
import { useAppDispatch } from "@/redux/store";
import { useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    const dispatch = useAppDispatch();

    const { requestFriends } = useFetchListRequestFriend();
    const { myRequestFriends } = useFetchMyRequestFriend();
    const { friends } = useFetchFriends({ params: { name: "" } });
    const { conversations: groupsConversations } = useFetchListConversations({
        params: { name: "", type: 2 },
    });
    const { conversations: individualConversations } = useFetchListConversations({ params: {} });
    const { classifies } = useFetchListClassify();
    const { colors } = useFetchListColor();
    const { stickers } = useFetchAllStickers();

    const initializeData = useCallback(() => {
        dispatch(setRequestFriends(requestFriends));
        dispatch(setMyRequestFriend(myRequestFriends));
        dispatch(setFriends(friends));
        dispatch(setGroups(groupsConversations));
        dispatch(setClassifies(classifies));
        dispatch(setColors(colors));
        dispatch(setConversations(individualConversations));
        dispatch(setStickers(stickers));
        dispatch(setTabActive(1));
    }, [
        dispatch,
        requestFriends,
        myRequestFriends,
        friends,
        groupsConversations,
        classifies,
        colors,
        individualConversations,
        stickers,
    ]);

    useEffect(() => {
        initializeData();
    }, [initializeData]);

    useEffect(() => {
        dispatch({ type: "socket/initSocket" });
    }, [dispatch]);

    return (
        <TooltipProvider>
            <div className="flex h-screen">
                <AppSidebar />
                <main className="flex-1 h-screen overflow-hidden">
                    <Outlet />
                </main>
            </div>
        </TooltipProvider>
    );
};
export default MainLayout;
