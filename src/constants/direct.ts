const defaultEndpoint = "/";
const splashEndpoint = "/splash";
const authEndpoint = "/auth";
const loginEndpoint = "/auth/login";
const registryEndpoint = "/auth/registry";
const forgotEndpoint = "/auth/forgot";
const homeEndpoint = "/home";
const chatEndpoint = "/home/chat";
const friendEndpoint = "/home/friend";
const adminEndpoint = "/admin";

const direct = () => {
    return {
        defaultEndpoint,
        splashEndpoint,
        authEndpoint,
        loginEndpoint,
        registryEndpoint,
        forgotEndpoint,
        homeEndpoint,
        chatEndpoint,
        friendEndpoint,
        adminEndpoint
    }
}

export default direct;