import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

export const initializeSocket = (userId: string) => {
  if (socket?.connected) {
    return socket;
  }

  if (socket) {
    socket.emit("userConnected", userId);
    return socket;
  }

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  socket = io(BASE_URL, {
    query: {
      userId,
    },
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
    transports: ["websocket", "polling"],
  });

  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket?.id);
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
      reconnectTimeout = null;
    }
    socket?.emit("userConnected", userId);
  });

  socket.on("disconnect", (reason) => {
    console.log("❌ Socket disconnected:", reason);
  });

  socket.on("connect_error", (error) => {
    console.error("❌ Socket connection error:", error);
  });

  socket.on("error", (error) => {
    console.error("❌ Socket error:", error);
  });

  return socket;
};

export const getSocket = (): Socket | null => {
  if (!socket) {
    console.warn("⚠️ Socket is null - call initializeSocket first");
    return null;
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};