import axiosClient from './_httpAxios';

const BASE_URL = '/me/phone-books';

const ServiceContacts = {
    getContacts: () => {
        return axiosClient.get(`${BASE_URL}`);
    },
};

export default ServiceContacts;
