import axiosClient from './_httpAxios';

const BASE_URL = '/stickers';

const stickerApi = {
    fetchAllSticker: () => {
        return axiosClient.get(`${BASE_URL}`);
    },
};

export default stickerApi;
