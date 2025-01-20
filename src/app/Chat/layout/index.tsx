import NavHeader from "@/app/Chat/components/NavHeader";
import { setJoinChatLayout, setJoinFriendLayout } from "@/redux/slice/globalSlice";
import { useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const ChatLayout = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setJoinChatLayout(true));
        dispatch(setJoinFriendLayout(false));

        return () => {
            dispatch(setJoinChatLayout(false));
        };
    }, [dispatch]);

    return (
        <div className="flex divide-x divide-border h-screen w-full">
            <div className="w-80 flex-shrink-0">
                <NavHeader />
            </div>
            <div className="flex-grow">
                <Outlet />
            </div>
        </div>
    );
};
export default ChatLayout;
