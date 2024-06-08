import axiosClient from './_httpAxios';

const BASE_URL = '/me/phone-books';

const ServiceContacts = {
    fetchContacts: () => {
        return axiosClient.get(`${BASE_URL}`);
    },
};

export default ServiceContacts;
