import { get } from "./instance/httpMethod";

const PATH = "/stickers";

const ServiceSticker = {
    getAllSticker: () =>  get(`${PATH}`),
};

export default ServiceSticker;
