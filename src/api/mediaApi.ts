import axiosClient from "./_httpAxios";

const API_URL = "/messages";

const ServiceMedia = {
    fetchAllMedia: (
        conversationId: any,
        type = "ALL",
        senderId?: any,
        startTime?: any,
        endTime?: any
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
