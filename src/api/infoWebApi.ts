import { API } from "@/constants/api.constant";
import axiosClient from "./_httpAxios";

type TWebInfo = {
  meta: any;
  payload: Array<any>;
  type: string;
};

const ServiceInfoWeb = {
  getInfoWeb: () => {
    return axiosClient.get<TWebInfo, any>(`${API.WEB_INFO}`);
  },
};

export default ServiceInfoWeb;
