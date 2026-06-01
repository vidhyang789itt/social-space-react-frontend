import { startOfDay, startOfToday, startOfYesterday } from "date-fns";
import type { NotificationType } from "../types/NotificationType";

export interface GroupedNotification {
  label: string;
  notifications: NotificationType[];
}

export const groupNotificationsByDate = (notifications: NotificationType[]): GroupedNotification[] => {
  const groups: { [key: string]: NotificationType[] } = {
    today: [],
    yesterday: [],
    thisWeek: [],
    older: []
  };

  const now = new Date();
  const todayStart = startOfToday();
  const yesterdayStart = startOfYesterday();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  notifications.forEach((notification) => {
    const notifDate = new Date(notification.createdAt);
    const notifDateStart = startOfDay(notifDate);
    const todayStartTime = todayStart.getTime();
    const yesterdayStartTime = yesterdayStart.getTime();
    const notifStartTime = notifDateStart.getTime();

    if (notifStartTime === todayStartTime) {
      groups.today.push(notification);
    } else if (notifStartTime === yesterdayStartTime) {
      groups.yesterday.push(notification);
    } else if (notifDate >= sevenDaysAgo) {
      groups.thisWeek.push(notification);
    } else {
      groups.older.push(notification);
    }
  });

  const result: GroupedNotification[] = [];

  if (groups.today.length > 0) {
    result.push({
      label: "Today",
      notifications: groups.today.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    });
  }

  if (groups.yesterday.length > 0) {
    result.push({
      label: "Yesterday",
      notifications: groups.yesterday.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    });
  }

  if (groups.thisWeek.length > 0) {
    result.push({
      label: "This Week",
      notifications: groups.thisWeek.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    });
  }

  if (groups.older.length > 0) {
    result.push({
      label: "Older",
      notifications: groups.older.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    });
  }

  return result;
};