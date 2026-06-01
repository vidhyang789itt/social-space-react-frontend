import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../store/slices/userSlice";
import type { RootState, AppDispatch } from "../../store/stores";
import { FollowButton } from "../../styles/Profile.style";
import { useToast } from "../notifications/toastContext";

interface FollowActionProps {
  targetUser: {
    _id: string;
    userId: string;
    followers: string[];
  };
}

export const FollowAction = ({ targetUser }: FollowActionProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user: currentUser } = useSelector((state: RootState) => state.auth);
   const { showToast } = useToast();

  if (!currentUser || currentUser._id === targetUser._id) {
    return null;
  }

  const isFollowing = targetUser.followers.includes(currentUser._id);

  const handleToggleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();

    const payload = {
      targetUserId: targetUser.userId,
      currentUserId: currentUser._id,
    };

    if (isFollowing) {
      dispatch(unfollowUser(payload));
    } else {
      dispatch(followUser(payload));
    }
    showToast("user Followed", "success")
  };

  return (
    <FollowButton $isFollowing={isFollowing} onClick={handleToggleFollow}>
      {isFollowing ? "Following" : "Follow"}
    </FollowButton>
  );
};
