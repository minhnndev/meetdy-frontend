import {
  TLoginResponse,
  TLogin,
  TRegister,
  TConfirmAccount,
  TConfirmPassword,
} from "@/models/auth.model";
import axiosClient from "./_httpAxios";
import { API } from "@/constants/APIurl";

const ServiceAuth = {
  login: (params: TLogin) =>
    axiosClient.post<any, TLoginResponse>(API.AUTH.LOGIN, params),

  register: (params: TRegister) => axiosClient.post(API.AUTH.REGISTER, params),

  forgot: (username: string) => axiosClient.post(API.AUTH.FORGOT, { username }),

  confirmAccount: (params: TConfirmAccount) =>
    axiosClient.post(API.AUTH.CONFIRM_ACCOUNT, params),

  confirmPassword: (params: TConfirmPassword) =>
    axiosClient.post(API.AUTH.CONFIRM_PASSWORD, params),

  fetchUser: (username: string) =>
    axiosClient.get(`${API.AUTH.FETCH_USER}/${username}`),
};

export default ServiceAuth;
