export type TClassify = {
  _id: string;
  name: string;
  conversationIds: Array<string>;
  color: {
    _id: string;
    name: string;
    code: string;
  };
};
