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
