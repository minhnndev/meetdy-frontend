import { API } from "@/constants/api.constant";
import { get } from "./instance/httpMethod";

const ServiceUser = {
    getUser: (username: string) => {
        return get(`${API.SEARCH_USER}/${username}`);
    },
};

export default ServiceUser;
