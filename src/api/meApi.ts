import { TUserProfile } from "@/models/auth.model";
import axiosClient from "./_httpAxios";
import { API } from "@/constants/api.constant";
import {
    TAvatarResponse,
    TChangePassword,
    TCoverImageResponse,
    TRevokeToken,
    TRevokeTokenResponse,
    TUpdateProfile,
} from "@/models/me.model";

const ServiceMe = {
    fetchProfile: () => axiosClient.get<any, TUserProfile>(API.ME.FETCH_PROFILE),

    updateProfile: (params: TUpdateProfile) => axiosClient.put(API.ME.UPDATE_PROFILE, params),

    updateAvatar: (data: FormData) =>
        axiosClient.request<any, TAvatarResponse>({
            headers: { "Content-Type": "multipart/form-data" },
            method: "PATCH",
            url: API.ME.UPDATE_AVATAR,
            data,
        }),

    updateCoverImage: (data: FormData) =>
        axiosClient.request<any, TCoverImageResponse>({
            headers: { "Content-Type": "multipart/form-data" },
            method: "PATCH",
            url: API.ME.UPDATE_COVER_IMAGE,
            data,
        }),

    changePassword: (params: TChangePassword) => axiosClient.patch(API.ME.CHANGE_PASSWORD, params),

    revokeToken: (params: TRevokeToken) =>
        axiosClient.delete<TRevokeTokenResponse, any>(API.ME.REVOKE_TOKEN, {
            data: params,
        }),
};

export default ServiceMe;
