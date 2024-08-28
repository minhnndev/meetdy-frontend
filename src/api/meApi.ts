import { TUserProfile } from "@/models/auth.model";
import axiosClient from "./_httpAxios";
import { API } from "@/constants/APIurl";

const ServiceMe = {
  fetchProfile: () => axiosClient.get<any, TUserProfile>(API.ME.FETCH_PROFILE),

  updateProfile: (name, dateOfBirth, gender) =>
    axiosClient.put(API.ME.UPDATE_PROFILE, { name, dateOfBirth, gender }),

  updateAvatar: (file) => axiosClient.patch(API.ME.UPDATE_AVATAR, file),

  updateCoverImage: (file) =>
    axiosClient.patch(API.ME.UPDATE_COVER_IMAGE, file),

  changePassword: (oldPassword, newPassword) =>
    axiosClient.patch(API.ME.CHANGE_PASSWORD, { oldPassword, newPassword }),

  revokeToken: (password, key) =>
    axiosClient.delete(API.ME.REVOKE_TOKEN, { data: { password, key } }),
};

export default ServiceMe;
