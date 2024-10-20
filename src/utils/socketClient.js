import io from "socket.io-client";
import { SOCKET_URL } from "@/constants/api.constant";

export let socket;

export function init() {
  socket = io(SOCKET_URL, {
    transports: ["websocket"],
  });
}
