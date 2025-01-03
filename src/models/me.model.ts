import { TUserProfile } from "./auth.model";

export type TChangePassword = {
    oldPassword: string;
    newPassword: string;
};

export type TRevokeTokenResponse = {
    token: string;
    refreshToken: string;
};

export type TRevokeToken = {
    password: string;
    key: string;
};

export type TUpdateProfile = Pick<TUserProfile, "name" | "gender" | "dateOfBirth">;

export type TCoverImageResponse = {
    coverImage: string;
};

export type TAvatarResponse = {
    avatar: string;
};
