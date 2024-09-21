import {
  TFetchFriends,
  TFriend,
  TRequestFriend,
  TSuggestFriend,
} from "@/models/friend.model";
import axiosClient from "./_httpAxios";
import { API } from "@/constants/APIurl";

const FriendService = {
  fetchFriends: (params: TFetchFriends) =>
    axiosClient.get<any, Array<TFriend>>(API.FRIEND.FETCH_FRIENDS, { params }),

  acceptRequestFriend: (userId: string) =>
    axiosClient.post(`${API.FRIEND.ACCEPT_REQUEST_FRIEND}/${userId}`),

  deleteFriend: (userId: string) =>
    axiosClient.delete(`${API.FRIEND.DELETE_FRIEND}/${userId}`),

  fetchListRequestFriend: () =>
    axiosClient.get<any, Array<TRequestFriend>>(
      API.FRIEND.FETCH_REQUEST_FRIENDS
    ),

  deleteRequestFriend: (userId: string) =>
    axiosClient.delete(`${API.FRIEND.DELETE_REQUEST_FRIEND}/${userId}`),

  sendRequestFriend: (userId: string) =>
    axiosClient.post(`${API.FRIEND.SEND_REQUEST_FRIEND}/${userId}`),

  deleteSentRequestFriend: (userId: string) =>
    axiosClient.delete(`${API.FRIEND.DELETE_SENT_REQUEST_FRIEND}/${userId}`),

  fetchMyRequestFriend: () =>
    axiosClient.get<any, Array<TRequestFriend>>(
      API.FRIEND.FETCH_SENT_REQUEST_FRIENDS
    ),

  fetchSuggestFriend: (page = 0, size = 12) =>
    axiosClient.get<any, Array<TSuggestFriend>>(
      API.FRIEND.FETCH_SUGGEST_FRIENDS,
      {
        params: { page, size },
      }
    ),
};

export default FriendService;
