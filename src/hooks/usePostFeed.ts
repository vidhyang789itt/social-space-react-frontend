import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/stores";
import { fetchFeed } from "../store/slices/postSlice";

export const usePostFeed = (initialPage: number = 1) => {
  const dispatch = useDispatch<AppDispatch>();
  const { feed, loading, error, pagination } = useSelector(
    (state: RootState) => state.posts,
  );

  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    dispatch(fetchFeed(page));

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch, page]);

  const handleNext = () => {
    if (pagination && page < pagination.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return {
    posts: feed,
    loading,
    error,
    pagination,
    page,
    handleNext,
    handlePrev,
    setPage,
  };
};
