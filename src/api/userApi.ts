import { API } from "@/constants/api.constant";
import axiosClient from "./_httpAxios";
import { TSuggestFriend } from "@/models/friend.model";

const ServiceUser = {
  getUser: (username: string) => {
    return axiosClient.get<any, TSuggestFriend>(
      `${API.SEARCH_USER}/${username}`
    );
  },
};

export default ServiceUser;
