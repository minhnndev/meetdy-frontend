import { del, get, post } from "./instance/httpMethod";

const PATH = "/messages";

const ServiceMessages = {
    fetchListMessages: (conversationId, page, size) => {
        return get(`${PATH}/${conversationId}`, {
            params: {
                page,
                size,
            },
        });
    },

    sendTextMessage: (message) => {
        return post(`${PATH}/text`, message);
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

        return post(`${PATH}/files`, file, config);
    },

    redoMessage: (idMessage) => {
        return del(`${PATH}/${idMessage}`);
    },
    deleteMessageClientSide: (idMessage) => {
        return del(`${PATH}/${idMessage}/only`);
    },

    dropReaction: (idMessage, type) => {
        return post(`${PATH}/${idMessage}/reacts/${type}`, {});
    },

    forwardMessage: (messageId, conversationId) => {
        return post(`${PATH}/${messageId}/share/${conversationId}`, {});
    },
};

export default ServiceMessages;
