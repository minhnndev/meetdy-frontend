import { TMessage } from "@/models/message.model";
import axiosClient from "./_httpAxios";

const API_URL = "/messages";

const ServiceMessages = {
    fetchListMessages: (conversationId, page, size) => {
        return axiosClient.get<any, TMessage>(`${API_URL}/${conversationId}`, {
            params: {
                page,
                size,
            },
        });
    },

    sendTextMessage: (message) => {
        return axiosClient.post(`${API_URL}/text`, message);
    },

    sendFileThroughMessage: (file, attachInfo, cb) => {
        const { type, conversationId, channelId } = attachInfo;

        const config = {
            params: {
                type,
                conversationId,
                channelId,
            },
            onUploadProgress: function (progressEvent) {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                cb(percentCompleted);
            },
        };

        return axiosClient.post(`${API_URL}/files`, file, config);
    },

    redoMessage: (idMessage) => {
        return axiosClient.delete(`${API_URL}/${idMessage}`);
    },
    deleteMessageClientSide: (idMessage) => {
        return axiosClient.delete(`${API_URL}/${idMessage}/only`);
    },

    dropReaction: (idMessage, type) => {
        return axiosClient.post(`${API_URL}/${idMessage}/reacts/${type}`);
    },

    forwardMessage: (messageId, conversationId) => {
        return axiosClient.post(`${API_URL}/${messageId}/share/${conversationId}`);
    },
};

export default ServiceMessages;
