import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/stores";
import { fetchSinglePost, deletePost } from "../store/slices/postSlice";
import { fetchProfile } from "../store/slices/authSlice";
import { getToken } from "../utils/localStorage";

export const usePostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { singlePost: post, loading } = useSelector(
    (state: RootState) => state.posts,
  );
  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  const [showEditModal, setShowEditModal] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (postId) {
      dispatch(fetchSinglePost(postId));
    }
  }, [dispatch, postId]);

  useEffect(() => {
    const token = getToken();
    if (token && !currentUser) {
      dispatch(fetchProfile());
    }
  }, [dispatch, currentUser]);

  const handleDelete = async () => {
    if (post?.postId) {
      await dispatch(deletePost(post.postId));
      navigate(-1);
    }
  };

  const refreshPost = () => {
    if (post?.postId) {
      dispatch(fetchSinglePost(post.postId));
    }
  };

  const isOwner = currentUser && post?.author?._id === currentUser._id;

  return {
    post,
    loading,
    isOwner,
    showEditModal,
    setShowEditModal,
    handleDelete,
    refreshPost,
    navigate,
    BASE_URL,
  };
};
