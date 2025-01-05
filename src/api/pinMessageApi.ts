import { del, get, post } from "./instance/httpMethod";

const PATH = "/pin-messages";

const ServicePinMessage = {
    getPinMessages: (conversationId) => {
        return get(`${PATH}/${conversationId}`);
    },

    pinMessage: (messageId) => {
        return post(`${PATH}/${messageId}`);
    },

    removePinMessage: (messageId) => {
        return del(`${PATH}/${messageId}`);
    },
};

export default ServicePinMessage;
