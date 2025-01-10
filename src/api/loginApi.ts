import {
    TLogin,
    TRegister,
    TConfirmAccount,
    TConfirmPassword,
} from "@/models/auth.model";
import { get, post } from "./instance/httpMethod";
import { API } from "@/constants/api.constant";

const ServiceAuth = {
    login: (params: TLogin) => post(API.AUTH.LOGIN, params),

    register: (params: TRegister) => post(API.AUTH.REGISTER, params),

    forgot: (username: string) => post(API.AUTH.FORGOT, { username }),

    confirmAccount: (params: TConfirmAccount) => post(API.AUTH.CONFIRM_ACCOUNT, params),

    confirmPassword: (params: TConfirmPassword) =>
        post(API.AUTH.CONFIRM_PASSWORD, params),

    fetchUser: (username: string) =>
        get(`${API.AUTH.FETCH_USER}/${username}`),
};

export default ServiceAuth;
