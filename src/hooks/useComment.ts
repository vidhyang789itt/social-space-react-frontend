import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../store/stores";
import {
  fetchPostComments,
  addComment,
  deleteComment,
  updateComment,
} from "../store/slices/commentSlice";
import { useDispatch, useSelector } from "react-redux";

export const useComments = (postId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { commentsByPostId, loading, error } = useSelector(
    (state: RootState) => state.comments,
  );
  const [commentText, setCommentText] = useState("");

  const currentComments = commentsByPostId[postId] || [];
  const commentsCount = currentComments.length;

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostComments(postId));
    }
  }, [postId, dispatch]);

  const handleSendComment = async () => {
    if (!commentText.trim()) return;
    await dispatch(addComment({ postId, content: commentText }));
    setCommentText("");
  };

  const handleDeleteComment = (commentId: string) => {
    dispatch(deleteComment({ postId, commentId }));
  };

  const handleUpdateComment = (commentId: string, content: string) => {
    dispatch(updateComment({ postId, commentId, content }));
  };

  return {
    commentsCount,
    currentComments,
    loading,
    error,
    commentText,
    setCommentText,
    handleSendComment,
    handleDeleteComment,
    handleUpdateComment,
  };
};
