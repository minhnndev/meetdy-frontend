export type TGetListConversations = {
  name?: string;
  type?: number;
};

export interface TGetConversation {
  avatar: string;
  totalMembers: number;
}
