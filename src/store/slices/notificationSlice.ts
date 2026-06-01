import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNotificationsApi, markNotificationReadApi, markNotificationsReadApi } from "../../api/notification.api";
import type { NotificationType } from "../../types/NotificationType";

interface NotificationState {
  notifications: NotificationType[];
  unreadCount: number;
  loading: boolean;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
};

export const fetchNotifications = createAsyncThunk("notifications/fetchAll", async () => {
  return await getNotificationsApi();
});

export const markAllAsRead = createAsyncThunk("notifications/markRead", async () => {
  return await markNotificationsReadApi();
});

export const markNotificationAsRead = createAsyncThunk(
  "notifications/markSingleRead",
  async (notificationId: string) => {
    await markNotificationReadApi(notificationId);
    return {notificationId};
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addLiveNotification: (state, action) => {
      const exists = state.notifications.find(n => n._id === action.payload._id);
      if (!exists) {
        state.notifications.unshift(action.payload); 
        state.unreadCount += 1;
      }
    },
    clearUnreadCount: (state) => {
      state.unreadCount = 0;
      state.notifications = state.notifications.map(n => ({ ...n, isRead: true }));
    },
    fetchUnreadNotificationCount: (state, action) => {
      state.unreadCount = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => { state.loading = true; })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.notifications;
        state.unreadCount = action.payload.notifications.filter((n: any) => !n.isRead).length;
      })
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.unreadCount = 0;
        state.notifications = state.notifications.map(n => ({ ...n, isRead: true }));
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const notification = state.notifications.find(
          n => n._id === action.payload.notificationId
        );
        if (notification && !notification.isRead) {
          notification.isRead = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      });
  },
});

export const { addLiveNotification, clearUnreadCount, fetchUnreadNotificationCount } = notificationSlice.actions;
export default notificationSlice.reducer;