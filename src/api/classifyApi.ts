import { API } from "@/constants/api.constant";
import { get, put, post, del } from "./instance/httpMethod";
import { TAddClassify } from "@/models/classify.model";

const ServiceClassify = {
    getColors: () => get(API.CLASSIFY.GET_COLOR),

    getClassifies: () => get(API.CLASSIFY.GET),

    addClassify: (params: TAddClassify) => post(API.CLASSIFY.ADD, params),

    deleteClassify: (id: string) =>  del(`${API.CLASSIFY.DELETE}/${id}`),

    addClassifyForConversation: (classifyId: string, conversationId: string) =>
         post(`${API.CLASSIFY.ADD}/${classifyId}/conversations/${conversationId}`, {}),

    removeClassifyFromConversation: (classifyId: string, conversationId: string) =>
         del(`${API.CLASSIFY.DELETE}/${classifyId}/conversations/${conversationId}`),

    updateClassify: (classifyId: string, params: TAddClassify) =>
         put(`${API.CLASSIFY.UPDATE}/${classifyId}`, params),
};

export default ServiceClassify;
