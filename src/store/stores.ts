import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";
import userReducer from "./slices/userSlice";
import likeReducer from "./slices/likeSlice";
import commentReducer from "./slices/commentSlice";
import chatReducer from "./slices/chatSlice"
import notificationReducer from "./slices/notificationSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    users: userReducer,
    likes: likeReducer,
    comments: commentReducer,
    chats: chatReducer,
    notifications: notificationReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
