export const API = {
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
};

const URL = {
  dev: {
    API_URL: import.meta.env.REACT_APP_API_URL,
    SOCKET_URL: import.meta.env.REACT_APP_SOCKET_URL,
  },
  prod: {
    API_URL: import.meta.env.REACT_APP_API_URL,
    SOCKET_URL: import.meta.env.REACT_APP_SOCKET_URL,
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
