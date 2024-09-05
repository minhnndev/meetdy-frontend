import { TFetchFriends } from "@/models/friend.model";
import axiosClient from "./_httpAxios";

const API_URL = "/friends";

const FriendService = {
  fetchFriends: (params: TFetchFriends) =>
    axiosClient.get(`${API_URL}`, { params }),

  acceptRequestFriend: (userId: string) =>
    axiosClient.post(`${API_URL}/${userId}`),

  deleteFriend: (userId: string) => axiosClient.delete(`${API_URL}/${userId}`),

  fetchListRequestFriend: () => axiosClient.get(`${API_URL}/invites`),

  deleteRequestFriend: (userId: string) =>
    axiosClient.delete(`${API_URL}/invites/${userId}`),

  sendRequestFriend: (userId: string) =>
    axiosClient.post(`${API_URL}/invites/me/${userId}`),

  deleteSentRequestFriend: (userId: string) =>
    axiosClient.delete(`${API_URL}/invites/me/${userId}`),

  fetchMyRequestFriend: () => axiosClient.get(`${API_URL}/invites/me`),

  fetchSuggestFriend: (page = 0, size = 12) =>
    axiosClient.get(`${API_URL}/suggest`, { params: { page, size } }),
};

export default FriendService;
