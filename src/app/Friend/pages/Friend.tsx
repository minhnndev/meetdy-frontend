import FriendHeader from "@/app/Friend/components/FriendHeader";
import SubtabFriend from "@/app/Friend/components/Subtab/SubtabFriend";
import { useFetchListRequestFriend } from "@/hooks/friend/useFetchListRequestFriend";
import { useFetchMyRequestFriend } from "@/hooks/friend/useFetchMyRequestFriend";
import { useFetchSuggestFriend } from "@/hooks/friend/useFetchSuggestFriend";
import {
    setMyRequestFriend,
    setRequestFriends,
    setSuggestFriends,
} from "@/redux/slice/friendSlice";
import { useAppDispatch } from "@/redux/store";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const Friend = () => {
    const subTab = useOutletContext<string>();
    const dispatch = useAppDispatch();

    const { requestFriends } = useFetchListRequestFriend();
    const { myRequestFriends } = useFetchMyRequestFriend();
    const { suggestFriends, isFetched: isFetchedSuggestFriends } = useFetchSuggestFriend({
        params: {
            page: 0,
            size: 10,
        },
    });

    useEffect(() => {
        dispatch(setRequestFriends(requestFriends));
        dispatch(setSuggestFriends(suggestFriends));
        dispatch(setMyRequestFriend(myRequestFriends));
    }, [suggestFriends, dispatch, myRequestFriends, requestFriends]);

    return (
        <div className="w-full h-full flex flex-col">
            <FriendHeader subtab={subTab} />
            {isFetchedSuggestFriends ? (
                <div className="flex-grow overflow-hidden">
                    {subTab === "subtab-friends" && <SubtabFriend />}
                </div>
            ) : (
                <div className="flex justify-center items-center flex-grow">
                    <Loader2 className="animate-spin h-5 w-5" />
                </div>
            )}
        </div>
    );
};

export default Friend;
