import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/stores";
import {
  likePost,
  unlikePost,
  fetchLikeCount,
} from "../store/slices/likeSlice";
import { useCallback, useEffect, useState } from "react";

export const useLike = (postId: string) => {
  const dispatch = useDispatch<AppDispatch>();

  const currentUserId = useSelector((state: RootState) => state.auth.user?._id);

  const isLiked = useSelector((state: RootState) =>
    state.likes.userLikes.includes(postId),
  );

  const likeCount = useSelector(
    (state: RootState) => state.likes.likeCounts[postId] || 0,
  );

  useEffect(() => {
    if (postId) {
      dispatch(fetchLikeCount({ postId, currentUserId }));
    }
  }, [dispatch, postId, currentUserId]);

  const [isActionLoading, setIsActionLoading] = useState(false);

  const toggleLike = useCallback(async () => {
    if (isActionLoading) return;

    setIsActionLoading(true);
    try {
      if (isLiked) {
        await dispatch(unlikePost(postId)).unwrap();
      } else {
        await dispatch(likePost(postId)).unwrap();
      }
    } finally {
      setIsActionLoading(false);
    }
  }, [isLiked, postId, isActionLoading]);

  return { isLiked, likeCount, toggleLike };
};
