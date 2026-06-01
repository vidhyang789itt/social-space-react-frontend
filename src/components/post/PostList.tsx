import { PostCard } from "./PostCard";
import {
  FeedContainer,
  PaginationWrapper,
  NavButton,
  NoPostMsg,
  PageNumber,
  PageNumbers,
  ResultsCount,
} from "../../styles/Post.style";
import { usePostFeed } from "../../hooks/usePostFeed";
import type { Post } from "../../types/post.types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loader from "../common/Loader";

export const PostList = () => {
  const {
    posts,
    loading,
    error,
    pagination,
    page,
    handleNext,
    handlePrev,
    setPage,
  } = usePostFeed(1);

  if (loading && page === 1) {
    return (
      <Loader/>
    );
  }

  if (error) {
    return (
      <p style={{ textAlign: "center", color: "#ef4444", marginTop: "20px" }}>
        {error}
      </p>
    );
  }

  const renderPageNumbers = () => {
    const pages = [];
    const total = pagination?.totalPages || 1;

    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= page - 1 && i <= page + 1)) {
        pages.push(
          <PageNumber
            key={i}
            $active={page === i}
            onClick={() => setPage && setPage(i)}
          >
            {i}
          </PageNumber>,
        );
      } else if (i === page - 2 || i === page + 2) {
        pages.push(
          <span key={i} className="text-slate-600">
            ...
          </span>,
        );
      }
    }
    return pages;
  };

  const hasNoPosts = posts.length === 0;

  return (
    <FeedContainer>
      {hasNoPosts ? (
        <NoPostMsg>No posts found. ✨</NoPostMsg>
      ) : (
        <>
          {posts.map((post: Post) => (
            <PostCard key={post.postId} post={post} />
          ))}

          {pagination && (
            <PaginationWrapper>
              <NavButton onClick={handlePrev} disabled={page === 1 || loading}>
                <ChevronLeft size={18} />
                <span>Previous</span>
              </NavButton>

              <PageNumbers>{renderPageNumbers()}</PageNumbers>

              <NavButton
                onClick={handleNext}
                disabled={page === pagination.totalPages || loading}
              >
                <span>Next</span>
                <ChevronRight size={18} />
              </NavButton>

              <ResultsCount>Total {pagination.totalPost} posts</ResultsCount>
            </PaginationWrapper>
          )}
        </>
      )}
    </FeedContainer>
  );
};
