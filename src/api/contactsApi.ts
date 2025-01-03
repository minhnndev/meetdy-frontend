import { TContact } from "@/models/friend.model";
import axiosClient from "./_httpAxios";
import { API } from "@/constants/api.constant";

const ServiceContacts = {
    getContacts: () => {
        return axiosClient.get<any, Array<TContact>>(`${API.PHONE_BOOK}`);
    },
};

export default ServiceContacts;
