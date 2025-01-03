import axiosClient from "./_httpAxios";

const BASE_URL = "/stickers";

const ServiceSticker = {
    getAllSticker: () => {
        return axiosClient.get(`${BASE_URL}`);
    },
};

export default ServiceSticker;
