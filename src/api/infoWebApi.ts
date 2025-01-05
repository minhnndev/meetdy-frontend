import { API } from "@/constants/api.constant";
import { get } from "./instance/httpMethod";

export type TWebInfo = {
    meta: any;
    payload: Array<any>;
    type: string;
};

const ServiceInfoWeb = {
    getInfoWeb: () => {
        return get(`${API.WEB_INFO}`);
    },
};

export default ServiceInfoWeb;
