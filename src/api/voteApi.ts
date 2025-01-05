import { del, get, post } from "./instance/httpMethod";

const PATH = "/votes";

const ServiceVote = {
    createVote: (content, options, conversationId) => {
        return post(`${PATH}`, {
            content,
            options,
            conversationId,
        });
    },

    addVote: (messageId, options) => {
        return post(`${PATH}/${messageId}`, {
            options,
        });
    },

    // // Comment this function because existing error in the backend
    // deleteVote: (messageId, options) => {
    //   return del(`${PATH}/${messageId}`, {
    //     options,
    //   });
    // },

    selectVote: (messageId, options) => {
        return post(`${PATH}/${messageId}/choices`, {
            options,
        });
    },

    deleteSelect: (messageId, options) => {
        return del(`${PATH}/${messageId}/choices`, {
            data: {
                options,
            },
        });
    },
    getVotes: (conversationId, page, size) => {
        return get(`${PATH}/${conversationId}/`, {
            params: {
                page,
                size,
            },
        });
    },
};

export default ServiceVote;
