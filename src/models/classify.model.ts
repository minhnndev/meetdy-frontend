export type TColor = {
    _id: string;
    name: string;
    code: string;
};

export type TClassify = {
    _id: string;
    name: string;
    conversationIds: Array<string>;
    color: TColor;
};

export type TAddClassify = {
    name: string;
    colorId: string;
};
