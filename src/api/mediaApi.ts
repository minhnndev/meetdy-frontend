import { get } from "./instance/httpMethod";

const PATH = "/messages";

const ServiceMedia = {
    fetchAllMedia: (
        conversationId: any,
        type = "ALL",
        senderId?: any,
        startTime?: any,
        endTime?: any
    ) => {
        return get(`${PATH}/${conversationId}/files`, {
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
