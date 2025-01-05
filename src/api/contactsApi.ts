import { get } from "./instance/httpMethod";
import { API } from "@/constants/api.constant";

const ServiceContacts = {
    getContacts: () => {
        return get(`${API.PHONE_BOOK}`);
    },
};

export default ServiceContacts;
