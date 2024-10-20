import {
  TFetchFriends,
  TFriend,
  TRequestFriend,
  TSuggestFriend,
} from "@/models/friend.model";
import axiosClient from "./_httpAxios";
import { API } from "@/constants/api.constant";

const FriendService = {
  fetchFriends: (params: TFetchFriends) =>
    axiosClient.get<any, Array<TFriend>>(API.FRIEND.FETCH, { params }),

  acceptRequestFriend: (userId: string) =>
    axiosClient.post(`${API.FRIEND.ACCEPT_REQUEST}/${userId}`),

  deleteFriend: (userId: string) =>
    axiosClient.delete(`${API.FRIEND.DELETE}/${userId}`),

  fetchListRequestFriend: () =>
    axiosClient.get<any, Array<TRequestFriend>>(API.FRIEND.FETCH_REQUEST),

  deleteRequestFriend: (userId: string) =>
    axiosClient.delete(`${API.FRIEND.DELETE_REQUEST}/${userId}`),

  sendRequestFriend: (userId: string) =>
    axiosClient.post(`${API.FRIEND.SEND_REQUEST}/${userId}`),

  deleteSentRequestFriend: (userId: string) =>
    axiosClient.delete(`${API.FRIEND.DELETE_SENT_REQUEST}/${userId}`),

  fetchMyRequestFriend: () =>
    axiosClient.get<any, Array<TRequestFriend>>(API.FRIEND.FETCH_SENT_REQUEST),

  fetchSuggestFriend: (page = 0, size = 12) =>
    axiosClient.get<any, Array<TSuggestFriend>>(API.FRIEND.FETCH_SUGGEST, {
      params: { page, size },
    }),
};

export default FriendService;
