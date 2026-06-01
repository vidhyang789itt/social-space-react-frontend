import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  followUser,
  unfollowUser,
} from "../store/slices/userSlice";
import type { RootState, AppDispatch } from "../store/stores";
import { setSearchTerm } from "../store/slices/userSlice";

export const useUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, searchTerm, error } = useSelector(
    (state: RootState) => state.users,
  );
  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  const [sortBy, setSortBy] = useState("alphabetical");
  const [filterStatus, setFilterStatus] = useState("all");

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSetSearchTerm = (val: string) => {
    dispatch(setSearchTerm(val));
  };

  const filteredUsers = useMemo(() => {
    let result = users.filter((u) => {
      const isNotSelf = u._id !== currentUser?._id;
      const matchesSearch = u.username
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const isActuallyFollowing = u.followers.includes(currentUser?._id || "");
      let matchesStatus = true;
      if (filterStatus === "following") matchesStatus = isActuallyFollowing;
      if (filterStatus === "unfollowed") matchesStatus = !isActuallyFollowing;

      return isNotSelf && matchesSearch && matchesStatus;
    });

    result.sort((a, b) => {
      if (sortBy === "alphabetical")
        return a.username.localeCompare(b.username);
      if (sortBy === "followers")
        return (b.followers?.length || 0) - (a.followers?.length || 0);
      return 0;
    });

    return result;
  }, [
    users,
    searchTerm,
    sortBy,
    filterStatus,
    currentUser?._id,
    currentUser?.following,
  ]);

  const handleFollowAction = (targetUserId: string, isFollowing: boolean) => {
    if (!currentUser?._id) return;

    const payload = {
      targetUserId,
      currentUserId: currentUser._id,
    };

    if (isFollowing) {
      dispatch(unfollowUser(payload));
    } else {
      dispatch(followUser(payload));
    }
  };

  return {
    users: filteredUsers,
    loading,
    currentUser,
    searchTerm,
    setSearchTerm: handleSetSearchTerm,
    sortBy,
    setSortBy,
    filterStatus,
    setFilterStatus,
    handleFollowAction,
    BASE_URL,
    error
  };
};
