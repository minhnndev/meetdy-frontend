export type TLoginResponse = {
  token: string;
  refreshToken: string;
};

export type TLogin = {
  username: string;
  password: string;
};

export type TUserProfile = {
  avatar: string;
  avatarColor: string;
  dateOfBirth: {
    day: number;
    month: number;
    year: number;
  };
  gender: boolean;
  isAdmin: boolean;
  isOnline: boolean;
  lastLogin: string;
  name: string;
  phoneBooks: Array<any>;
  username: string;
};

export type TUser = {
  avatar: string;
  name: string;
  username: string;
  isActived: boolean;
};

export type TRegister = {
  name: string;
  username: string;
  password: string;
};

export type TConfirmAccount = {
  username: string;
  otp: string;
};

export type TConfirmPassword = {
  username: string;
  otp: string;
  password: string;
};
