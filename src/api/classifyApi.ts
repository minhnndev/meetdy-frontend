import { API } from "@/constants/APIurl";
import axiosClient from "./_httpAxios";
import { TAddClassify } from "@/models/classify.model";

const ServiceClassify = {
  getColors: () => axiosClient.get(API.CLASSIFY.GET_COLOR),

  getClassifies: () => axiosClient.get(API.CLASSIFY.GET),

  addClassify: (params: TAddClassify) =>
    axiosClient.post(API.CLASSIFY.ADD, params),

  deleteClassify: (id: string) =>
    axiosClient.delete(`${API.CLASSIFY.DELETE}/${id}`),

  addClassifyForConversation: (classifyId: string, conversationId: string) =>
    axiosClient.post(
      `${API.CLASSIFY.ADD}/${classifyId}/conversations/${conversationId}`
    ),

  removeClassifyFromConversation: (
    classifyId: string,
    conversationId: string
  ) =>
    axiosClient.delete(
      `${API.CLASSIFY.DELETE}/${classifyId}/conversations/${conversationId}`
    ),

  updateClassify: (classifyId: string, params: TAddClassify) =>
    axiosClient.put(`${API.CLASSIFY.UPDATE}/${classifyId}`, params),
};

export default ServiceClassify;
