import io from "socket.io-client";
import { SOCKET_URL } from "@/constants/APIurl";

export let socket;

export function init() {
  socket = io(SOCKET_URL, {
    transports: ["websocket"],
  });
}
