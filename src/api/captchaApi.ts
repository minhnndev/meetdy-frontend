import { get } from "@/api/instance/httpMethod";

export type ICaptcha = {
    ENABLE_GOOGLE_CAPTCHA: boolean;
    KEY_GOOGLE_CAPTCHA: string;
};

const PATH = "/common/google-captcha";

const ServiceCaptcha = {
    fetchCaptcha: async (): Promise<ICaptcha> => {
        const url = PATH;
        const response = await get<ICaptcha>(url);
        return response.data;
    },
};

export default ServiceCaptcha;
