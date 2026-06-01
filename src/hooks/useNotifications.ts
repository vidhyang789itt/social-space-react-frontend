import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addLiveNotification } from "../store/slices/notificationSlice";
import type { AppDispatch } from "../store/stores";
import { getSocket } from "../api/socket";

export const useNotifications = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleNotification = (notification: any) => {
      dispatch(addLiveNotification(notification));

      if (Notification.permission === "granted") {
        new Notification(`New ${notification.type}`, {
          body: notification.content,
          icon: "/logo.png",
        });
      }
    };

    socket.on("newNotification", handleNotification);

    return () => {
      socket.off("newNotification", handleNotification);
    };
  }, [dispatch]);
};