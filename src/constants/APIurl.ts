const URL = {
  dev: {
    API_URL: import.meta.env.VITE_DEV_API_URL,
  },
  prod: {
    API_URL: import.meta.env.VITE_PROD_API_URL,
  },
};

const hostByEnv = new Proxy(URL, {
  get: (target, prop) => {
    return Reflect.get(target, prop);
  },
});

export const ENV = import.meta.env.VITE_ENV === "production" ? "prod" : "dev";
const { API_URL } = hostByEnv[ENV];
export { API_URL };
