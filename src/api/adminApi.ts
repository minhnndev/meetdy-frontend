import { get, patch, put, post, del } from "./instance/httpMethod";

const PATH = "/admin";

const ServiceAdmin = {
    getListUsersByUserName: (username, page, size) => {
        const url = `${PATH}/users-manager`;
        return get(url, {
            params: {
                username,
                page,
                size,
            },
        });
    },
    active: (id, isActived) => {
        const url = `${PATH}/users-manager/${id}/${isActived}`;
        return patch(url);
    },
    delete: (id, isDeleted) => {
        const url = `${PATH}/users-manager/${id}/${isDeleted}`;
        return patch(url);
    },

    //sticker manager
    getAllGroupSticker: () => {
        const url = `/stickers`;
        return get(url);
    },
    creatGroupSticker: (name, description) => {
        const url = `${PATH}/stickers-manager`;
        return post(url, { name, description });
    },
    updateGroupSticker: (_id, name, description) => {
        const url = `${PATH}/stickers-manager/${_id}`;
        return put(url, { name, description });
    },
    deleteGroupSticker: (_id) => {
        const url = `${PATH}/stickers-manager/${_id}`;
        return del(url);
    },
    deleteSticker: (_id, url) => {
        const url1 = `${PATH}/stickers-manager/${_id}/sticker`;
        return del(url1, {
            params: {
                url,
            },
        });
    },
    addSticker: (_id, file) => {
        const url = `${PATH}/stickers-manager/${_id}`;
        return  post(url, file);
    },
};
export default ServiceAdmin;
