const storeToken = (token: string, refreshToken: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
};
const removeStoreToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
};

export default {
    storeToken,
    removeStoreToken,
};