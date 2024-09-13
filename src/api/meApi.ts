import { TUserProfile } from "@/models/auth.model";
import axiosClient from "./_httpAxios";
import { API } from "@/constants/APIurl";
import {
  TChangePassword,
  TRevokeToken,
  TRevokeTokenResponse,
} from "@/models/me.model";

const ServiceMe = {
  fetchProfile: () => axiosClient.get<any, TUserProfile>(API.ME.FETCH_PROFILE),

  updateProfile: (name, dateOfBirth, gender) =>
    axiosClient.put(API.ME.UPDATE_PROFILE, { name, dateOfBirth, gender }),

  updateAvatar: (file) => axiosClient.patch(API.ME.UPDATE_AVATAR, file),

  updateCoverImage: (file) =>
    axiosClient.patch(API.ME.UPDATE_COVER_IMAGE, file),

  changePassword: (params: TChangePassword) =>
    axiosClient.patch(API.ME.CHANGE_PASSWORD, params),

  revokeToken: (params: TRevokeToken) =>
    axiosClient.delete<TRevokeTokenResponse, any>(API.ME.REVOKE_TOKEN, {
      data: params,
    }),
};

export default ServiceMe;
