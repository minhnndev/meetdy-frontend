export const API = {
    WEB_INFO: "/common/web-info",
    AUTH: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/registry",
        FORGOT: "/auth/reset-otp",
        CONFIRM_ACCOUNT: "/auth/confirm-account",
        CONFIRM_PASSWORD: "/auth/confirm-password",
        FETCH_USER: "/auth/users",
    },
    ME: {
        FETCH_PROFILE: "/me/profile",
        UPDATE_PROFILE: "/me/profile",
        UPDATE_AVATAR: "/me/avatar",
        UPDATE_COVER_IMAGE: "/me/cover-image",
        CHANGE_PASSWORD: "/me/password",
        REVOKE_TOKEN: "/me/revoke-token",
    },
    FRIEND: {
        FETCH: "/friends",
        ACCEPT_REQUEST: "/friends",
        DELETE: "/friends",
        FETCH_REQUEST: "/friends/invites",
        DELETE_REQUEST: "/friends/invites",
        SEND_REQUEST: "/friends/invites/me",
        DELETE_SENT_REQUEST: "/friends/invites/me",
        FETCH_SENT_REQUEST: "/friends/invites/me",
        FETCH_SUGGEST: "friends/suggest",
    },
    PHONE_BOOK: "/me/phone-books",
    SEARCH_USER: "/users/search/username",
    CONVERSATION: {
        GET: "/conversations",
        CREATE: "/conversations/individuals",
        CREATE_GROUP: "/conversations/groups",
        DELETE: "/conversations",
    },
    CLASSIFY: {
        GET: "/classifies",
        ADD: "/classifies",
        DELETE: "/classifies",
        UPDATE: "/classifies",
        GET_COLOR: "/classifies/colors",
    },
};

const URL = {
    dev: {
        API_URL: import.meta.env.VITE_API_URL_DEV,
        SOCKET_URL: import.meta.env.VITE_SOCKET_URL_DEV,
    },
    prod: {
        API_URL: import.meta.env.VITE_API_URL_PROD,
        SOCKET_URL: import.meta.env.VITE_SOCKET_URL_PROD,
    },
};
const hostByEnv = new Proxy(URL, {
    get: (target, prop) => {
        return Reflect.get(target, prop);
    },
});

export const ENV = import.meta.env.VITE_ENV === "production" ? "prod" : "dev";
const { API_URL, SOCKET_URL } = hostByEnv[ENV];
export { API_URL, SOCKET_URL };
