import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FeedPage } from "./pages/FeedPage";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import { ProfilePage } from "./pages/ProfilePage";
import { PostDetailPage } from "./pages/PostDetailPage";
import { UsersPage } from "./pages/UsersPage";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store/stores";
import { useEffect } from "react";
import { fetchProfile } from "./store/slices/authSlice";
import { fetchUsers } from "./store/slices/userSlice"; 
import { UserConnectionsPage } from "./pages/UserConnectionsPage";
import LandingPage from "./components/common/PageNotFound";
import { AppLayout } from "./components/layout/AppLayout";
import { AuthPage } from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";
import NotificationPage from "./pages/NotificationPage";
import { initializeSocket } from "./api/socket";
import PostCreatePage from "./pages/CreatePost";
import PostEditPage from "./pages/EditPostPage";
import { ToastProvider } from "./components/notifications/toastContext";
import ToastContainer from "./components/notifications/ToastContainer";
import CallPage from "./pages/CallPage";
import CallWidget from "./components/call/callWidget";
import { CallProvider, useCallContext } from "./components/call/callContext";

const AppRoutes = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { users, loading: usersLoading } = useSelector(
    (state: RootState) => state.users
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user?.userId && users.length === 0 && !usersLoading) {
      dispatch(fetchUsers());
    }
  }, [user?.userId, users.length, usersLoading, dispatch]);

  useEffect(() => {
    if (user?.userId) {
      initializeSocket(user.userId);
    }
  }, [user?.userId]);

  return (
    <Routes>
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />

      <Route element={<AppLayout />}>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <FeedPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/:userId/:connectionType"
          element={
            <ProtectedRoute>
              <UserConnectionsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/post/:postId"
          element={
            <ProtectedRoute>
              <PostDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat/:otherUserId"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat/group/:groupId"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/post/create"
          element={
            <ProtectedRoute>
              <PostCreatePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/:postId/edit"
          element={
            <ProtectedRoute>
              <PostEditPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/call/room/:roomId"  
          element={
            <ProtectedRoute>
              <CallPage/>
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
};

const CallWidgetManager = () => {
  const { activeCall, isOnCallPage, endCall } = useCallContext();

  return (
    <>
      {activeCall && !isOnCallPage && (
        <CallWidget call={activeCall} onClose={endCall} />
      )}
    </>
  );
};

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <CallProvider>
          <AppRoutes />
          <CallWidgetManager />
          <ToastContainer />
        </CallProvider>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;