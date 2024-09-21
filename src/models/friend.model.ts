export type TFriend = {
  _id: string;
  avatar: string;
  avatarColor: string;
  name: string;
  username: string;
  isOnline: boolean;
  lastLogin: any;
};

export type TRequestFriend = {
  _id: string;
  avatar: string;
  avatarColor: string;
  name: string;
  username: string;
  numberCommonFriend: number;
  numberCommonGroup: number;
};

export type TSuggestFriend = {
  _id: string;
  name: string;
  username: string;
  dateOfBirth: {
    day: number;
    month: number;
    year: number;
  };
  gender: boolean;
  avatar: string;
  avatarColor: string;
  coverImage: string;
  isAdmin: boolean;
  phoneBooks: Array<any>;
  status: string;
  numberCommonGroup: number;
  numberCommonFriend: number;
  total: number;
};

export type TContact = {
  _id: string;
  name: string;
  username: string;
  dateOfBirth: {
    day: number;
    month: number;
    year: number;
  };
  gender: boolean;
  avatar: string;
  avatarColor: string;
  coverImage: string;
  isAdmin: boolean;
  phoneBooks: Array<any>;
  status: string;
  numberCommonGroup: number;
  numberCommonFriend: number;
  total: number;
};

export type TFetchFriends = {
  name: string;
};
