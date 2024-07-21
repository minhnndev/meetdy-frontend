import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "@/constants/APIurl";
import { DefaultEventsMap } from "@socket.io/component-emitter";

export let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export function init() {
  socket = io(SOCKET_URL, {
    transports: ["websocket"],
  });
}
