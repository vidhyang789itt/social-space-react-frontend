import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState, AppDispatch } from "../store/stores";
import {
  fetchUserById,
  editProfile,
  updatePassword,
} from "../store/slices/userSlice";
import { fetchUserPosts } from "../store/slices/postSlice";

export const useProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { user: currentUser } = useSelector((state: RootState) => state.auth);
  const { viewedUser, loading: userLoading } = useSelector(
    (state: RootState) => state.users,
  );
  const { userPosts: posts, loading: postsLoading } = useSelector(
    (state: RootState) => state.posts,
  );

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const refreshPosts = () => {
    const userId = id || currentUser?.userId;
    if (userId) {
      dispatch(fetchUserPosts(userId));
    }
  };

  useEffect(() => {
    const userId = id || currentUser?.userId;
    if (userId) {
      dispatch(fetchUserById(userId));
      dispatch(fetchUserPosts(userId));
    }
  }, [dispatch, id, currentUser]);

  useEffect(() => {
    if (viewedUser) {
      setFormData({ username: viewedUser.username, email: viewedUser.email });
    }
  }, [viewedUser]);

  const handleSaveProfile = async () => {
    if (!formData.username.trim() || !formData.email.trim())
      return setError("Fields cannot be empty.");
    setError("");
    await dispatch(editProfile(formData));
    setIsEditing(false);
  };

  const handlePasswordUpdate = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword)
      return setError("Fill all fields.");
    const resultAction = await dispatch(updatePassword(passwordData));
    if (updatePassword.fulfilled.match(resultAction)) {
      setIsChangingPassword(false);
      setPasswordData({ currentPassword: "", newPassword: "" });
    } else if (typeof resultAction.payload === "string") {
      setError(resultAction.payload);
    }
  };

  return {
    viewedUser,
    currentUser,
    posts,
    loading: userLoading || postsLoading,
    isEditing,
    setIsEditing,
    isChangingPassword,
    setIsChangingPassword,
    formData,
    setFormData,
    passwordData,
    setPasswordData,
    error,
    setError,
    handleSaveProfile,
    handlePasswordUpdate,
    refreshPosts,
  };
};
