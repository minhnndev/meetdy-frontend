import { TUserProfile } from "./auth.model";

export type TMessage = {
  page: any;
  totalPages: any;
  data: any;
};

export type TLastIndividualMessage = {
  _id: string;
  content: string;
  type: string;
  conversationId: string;
  reacts: Array<any>;
  createdAt: string;
  replyMessage: any;
  user: Pick<TUserProfile, "_id" | "name" | "avatar">;
};

export type TLastGroupMessage = {
  _id: string;
  content: string;
  type: string;
  conversationId: string;
  reacts: Array<any>;
  options: Array<any>;
  createdAt: string;
  user: Pick<TUserProfile, "_id" | "name" | "avatar" | "avatarColor">;
  manipulatedUsers: Array<any>;
  userOptions: Array<any>;
  replyMessage: any;
  tagUsers: Array<any>;
};
