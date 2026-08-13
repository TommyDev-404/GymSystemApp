import { io } from "socket.io-client";
import { baseUrl } from "./baseURL";

export const socket = io(
  baseUrl,
  {
    transports: ["websocket"],
    autoConnect: true,
  }
);