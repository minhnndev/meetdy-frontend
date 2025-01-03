import FriendService from "@/api/friendApi";
import { TRequestFriend } from "@/models/friend.model";
import { UserAvatar } from "@/modules/Chat/components/common";
import { fetchListFriends } from "@/redux/slice/chat/chatSlice";
import {
    fetchFriends,
    fetchListMyRequestFriend,
    fetchListRequestFriend,
    setAmountNotify,
} from "@/redux/slice/friendSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Button, Card, Toast } from "@douyinfe/semi-ui";
import Meta from "@douyinfe/semi-ui/lib/es/card/meta";

const FriendCard = ({ request, isMine = false }: { request: TRequestFriend; isMine?: boolean }) => {
    const { _id, avatar, avatarColor, name } = request;
    const dispatch = useAppDispatch();
    const { amountNotify } = useAppSelector((state) => state.friend);

    const handleCancelRequest = async () => {
        await FriendService.deleteSentRequestFriend(_id);
        dispatch(fetchListMyRequestFriend());
    };

    const handleDenyRequest = async () => {
        await FriendService.deleteRequestFriend(_id);
        dispatch(setAmountNotify(amountNotify - 1));
        dispatch(fetchListRequestFriend());
    };

    const handleAcceptFriend = async () => {
        await FriendService.acceptRequestFriend(_id);
        dispatch(fetchListRequestFriend());
        dispatch(fetchFriends({ name: "" }));
        dispatch(fetchListFriends({ name: "" }));
        dispatch(setAmountNotify(amountNotify - 1));
        Toast.success("Thêm bạn thành công");
    };

    return (
        <Card
            shadows="hover"
            bodyStyle={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
            style={{ margin: "0.5rem 0" }}
        >
            <Meta
                title={name}
                avatar={
                    <UserAvatar avatar={avatar} color={avatarColor} name={name} size="medium" />
                }
            />
            {isMine ? (
                <Button
                    theme="solid"
                    type="danger"
                    style={{ marginLeft: 8 }}
                    onClick={handleCancelRequest}
                >
                    Huỷ yêu cầu
                </Button>
            ) : (
                <div>
                    <Button theme="outline" type="tertiary" onClick={handleDenyRequest}>
                        Bỏ qua
                    </Button>
                    <Button
                        theme="solid"
                        type="primary"
                        style={{ marginLeft: 8 }}
                        onClick={handleAcceptFriend}
                    >
                        Đồng ý
                    </Button>
                </div>
            )}
        </Card>
    );
};

export default FriendCard;
