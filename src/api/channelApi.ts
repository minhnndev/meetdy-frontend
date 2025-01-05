import { get, put, post, del } from "./instance/httpMethod";

const PATH = "/channels";

const ServiceChannel = {
    fetchChannel: (conversationId) => {
        return get(`${PATH}/${conversationId}`);
    },

    addChannel: (name, conversationId) => {
        return post(`${PATH}`, {
            name,
            conversationId,
        });
    },

    renameChannel: (name, _id) => {
        return put(`${PATH}`, {
            _id,
            name,
        });
    },

    deleteChannel: (channelId) => {
        return del(`${PATH}/${channelId}`);
    },

    getMessageInChannel: (channelId, page, size) => {
        return get(`/messages/channel/${channelId}`, {
            params: {
                page,
                size,
            },
        });
    },

    getLastViewChannel: (channelId) => {
        return get(`${PATH}/${channelId}/last-view`);
    },
};

export default ServiceChannel;
