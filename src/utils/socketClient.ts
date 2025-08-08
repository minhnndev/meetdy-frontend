import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "@/constants/api.constant";
import { DefaultEventsMap } from "@socket.io/component-emitter";

export let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export function initSocket() {
    socket = io(SOCKET_URL, {
        transports: ["websocket"],
    });
}

export function closeSocket() {
    socket.disconnect();
}

export function getSocket() {
    return socket;
}
