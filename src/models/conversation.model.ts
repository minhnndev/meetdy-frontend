export type TGetListConversations = {
  name?: string;
  type?: number;
};

export type TConversation = {
  avatar: Array<{ avatar: string; avatarColor: string }>;
  isJoinFromLink: boolean;
  isNotify: boolean;
  lastMessage: any;
  leaderId: string;
  managerIds: Array<string>;
  name: string;
  numberUnread: number;
  totalMembers: number;
  type: boolean;
  _id: string;
};

export interface TGetConversation {
  avatar: string;
  totalMembers: number;
}
