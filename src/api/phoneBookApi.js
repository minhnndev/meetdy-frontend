import axiosClient from './_httpAxios';

const BASE_URL = '/me/phone-books';

const phoneBookApi = {
    fetchPhoneBook: () => {
        return axiosClient.get(`${BASE_URL}`);
    },
};

export default phoneBookApi;
