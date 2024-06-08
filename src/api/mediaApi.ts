import axiosClient from "./_httpAxios";

const API_URL = "/messages";

const ServiceMedia = {
  fetchAllMedia: (
    conversationId,
    type = "ALL",
    senderId,
    startTime,
    endTime
  ) => {
    return axiosClient.get(`${API_URL}/${conversationId}/files`, {
      params: {
        type,
        senderId,
        startTime,
        endTime,
      },
    });
  },
};

export default ServiceMedia;
