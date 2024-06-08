import axiosClient from './_httpAxios';

const API_URL = '/common/web-info';

const InfoWebApi = {
    getInfoWeb: () => {
        return axiosClient.get(`${API_URL}`);
    },
};

export default InfoWebApi;
