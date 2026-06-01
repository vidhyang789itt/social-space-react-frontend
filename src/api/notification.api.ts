import { API_ROUTES } from "../constants/apiRoutes";
import type { NotificationType } from "../types/NotificationType";
import { fetchClient } from "./fetchClient";


export const getNotificationsApi = async () => {
  return fetchClient<{notifications : NotificationType[]}>(API_ROUTES.GETALLNOTIFICATIONS, {
    method: "GET",
    requireAuth: true,
  });
};

export const markNotificationsReadApi = async () => {
  return fetchClient<{}>(API_ROUTES.MARKNOTIFICATIONASREAD, {
    method: "PATCH",
    requireAuth: true,
  });
};

export const markNotificationReadApi = async (notificationId: string) => {
  return fetchClient<{}>(API_ROUTES.MARKNOTIFICATIONREAD(notificationId), {
    method: "PUT",
    requireAuth: true,
  });
};