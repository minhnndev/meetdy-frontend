import axiosClient from './_httpAxios';
const BASE_URL = 'users';

const ServiceUser = {
    getUser: (username) => {
        return axiosClient.get(`${BASE_URL}/search/username/${username}`);
    },
};

export default ServiceUser;
