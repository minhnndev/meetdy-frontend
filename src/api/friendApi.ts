import { API } from "@/constants/api.constant";
import { TFetchFriends } from "@/models/friend.model";
import { del, get, post } from "./instance/httpMethod";

const FriendService = {
    fetchFriends: (params: TFetchFriends) =>
        get(API.FRIEND.FETCH, { params }),

    acceptRequestFriend: (userId: string) =>
        post(`${API.FRIEND.ACCEPT_REQUEST}/${userId}`, {}),

    deleteFriend: (userId: string) => del(`${API.FRIEND.DELETE}/${userId}`),

    fetchListRequestFriend: () =>
        get(API.FRIEND.FETCH_REQUEST),

    deleteRequestFriend: (userId: string) =>
        del(`${API.FRIEND.DELETE_REQUEST}/${userId}`),

    sendRequestFriend: (userId: string) => post(`${API.FRIEND.SEND_REQUEST}/${userId}`, {}),

    deleteSentRequestFriend: (userId: string) =>
        del(`${API.FRIEND.DELETE_SENT_REQUEST}/${userId}`),

    fetchMyRequestFriend: () =>
        get(API.FRIEND.FETCH_SENT_REQUEST),

    fetchSuggestFriend: (page = 0, size = 10) =>
        get(API.FRIEND.FETCH_SUGGEST, {
            params: { page, size },
        }),
};

export default FriendService;
