import { API } from "@/constants/api.constant";
import {
    TAvatarResponse,
    TChangePassword,
    TCoverImageResponse,
    TRevokeToken,
    TUpdateProfile,
} from "@/models/me.model";
import _httpsAxios from "./instance/_httpsAxios";
import { del, get, patch, put } from "./instance/httpMethod";

const ServiceMe = {
    fetchProfile: () => get(API.ME.FETCH_PROFILE),

    updateProfile: (params: TUpdateProfile) => put(API.ME.UPDATE_PROFILE, params),

    updateAvatar: (data: FormData) =>
        _httpsAxios.request<any, TAvatarResponse>({
            headers: { "Content-Type": "multipart/form-data" },
            method: "PATCH",
            url: API.ME.UPDATE_AVATAR,
            data,
        }),

    updateCoverImage: (data: FormData) =>
        _httpsAxios.request<any, TCoverImageResponse>({
            headers: { "Content-Type": "multipart/form-data" },
            method: "PATCH",
            url: API.ME.UPDATE_COVER_IMAGE,
            data,
        }),

    changePassword: (params: TChangePassword) => patch(API.ME.CHANGE_PASSWORD, params),

    revokeToken: (params: TRevokeToken) => del(API.ME.REVOKE_TOKEN, {data: params}),
};

export default ServiceMe;
