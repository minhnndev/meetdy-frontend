import { TVote } from "@/models/vote.model";
import axiosClient from "./_httpAxios";

const API_URL = "/votes";

const ServiceVote = {
  createVote: (content, options, conversationId) => {
    return axiosClient.post(`${API_URL}`, {
      content,
      options,
      conversationId,
    });
  },

  addVote: (messageId, options) => {
    return axiosClient.post(`${API_URL}/${messageId}`, {
      options,
    });
  },

  // // Comment vì không dùng và đang báo lỗi
  // deleteVote: (messageId, options) => {
  //   return axiosClient.delete(`${API_URL}/${messageId}`, {
  //     options,
  //   });
  // },

  selectVote: (messageId, options) => {
    return axiosClient.post(`${API_URL}/${messageId}/choices`, {
      options,
    });
  },

  deleteSelect: (messageId, options) => {
    return axiosClient.delete(`${API_URL}/${messageId}/choices`, {
      data: {
        options,
      },
    });
  },
  getVotes: (conversationId, page, size) => {
    return axiosClient.get<any, TVote>(`${API_URL}/${conversationId}/`, {
      params: {
        page,
        size,
      },
    });
  },
};

export default ServiceVote;
