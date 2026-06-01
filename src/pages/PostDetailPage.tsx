import { usePostDetail } from "../hooks/usePostDeatils";
import {
  PostWrapper,
  PostLayout,
  ContentCard,
  MediaContainer,
  MediaWrapper,
  MediaImage,
  MediaVideo,
  MediaNavigation,
  MediaArrowButton,
  MediaCounter,
  MediaThumbnails,
  MediaThumbnail,
  PostHeader,
  PostAuthorSection,
  AuthorWrapper,
  AuthorInfo,
  ProfileImageDiv,
  ActionButtonsGroup,
  EditButton,
  DeleteButton,
  PostTitle,
  PostContent,
  InteractionBar,
  InteractionItem,
  CommentCard,
  BackButton,
} from "../styles/PostDetail.style";
import { useLike } from "../hooks/useLike";
import { useComments } from "../hooks/useComment";
import { useSelector } from "react-redux";
import type { RootState } from "../store/stores";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { CommentSection } from "../components/comments/CommentSection";
import { ConfirmModal } from "../components/post/DeletePostModal";
import Loader from "../components/common/Loader";
import { Heart, MessageCircle, ChevronLeft, ChevronRight, Edit2, Trash2, ArrowLeft } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const PostDetailPage = () => {
  const location = useLocation();
  const { post, loading, isOwner, BASE_URL, handleDelete, navigate } =
    usePostDetail();

  const { isLiked, likeCount, toggleLike } = useLike(post?.postId || "");
  const commentInputRef = useRef<HTMLTextAreaElement | null>(null);

  const {
    commentText,
    setCommentText,
    handleSendComment,
    handleDeleteComment,
    currentComments,
    handleUpdateComment,
  } = useComments(post?.postId || "");

  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const hasMedia = post?.media && post.media.length > 0;
  const mediaCount = hasMedia ? post.media.length : 0;
  const currentMedia = hasMedia ? post.media[currentMediaIndex] : null;

  useEffect(() => {
    if (location.state?.focusComments && !loading && post && commentInputRef.current) {
      const timeoutId = setTimeout(() => {
        if (commentInputRef.current) {
          const element = commentInputRef.current;
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.focus();
        }
        window.history.replaceState({}, document.title);
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [location.state, loading, post]);

  const focusCommentInput = () => {
    if (!commentInputRef.current) return;
    commentInputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    commentInputRef.current.focus();
  };

  const handleEditPost = () => {
    if (post?.postId) {
      navigate(`/post/${post.postId}/edit`);
    }
  };

  const handlePrevMedia = () => {
    setCurrentMediaIndex((prev) =>
      prev === 0 ? mediaCount - 1 : prev - 1
    );
  };

  const handleNextMedia = () => {
    setCurrentMediaIndex((prev) =>
      prev === mediaCount - 1 ? 0 : prev + 1
    );
  };

  const getMediaUrl = (url: string) => {
    if (url.startsWith("http")) return url;
    return `${BASE_URL}/${url}`;
  };

  if (loading) return <Loader />;

  if (!post) return <h2 className="text-white p-10">Post not found</h2>;

  return (
    <PostWrapper>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient
            id="social-purple-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
        </defs>
      </svg>

      <PostLayout>
        <ContentCard>
          <BackButton onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            Back
          </BackButton>

          <PostHeader>
            <PostAuthorSection>
              <AuthorWrapper>
                <ProfileImageDiv
                  onClick={() => navigate(`/profile/${post.author?.userId}`)}
                >
                  <img
                    src={
                      post.author?.profileUrl
                        ? getMediaUrl(post.author?.profileUrl)
                        : "/profileImage.jpg"
                    }
                    alt="author"
                  />
                </ProfileImageDiv>

                <AuthorInfo>
                  <span
                    className="author-name"
                    onClick={() => navigate(`/profile/${post.author?.userId}`)}
                  >
                    {post.author?.username}
                  </span>
                  <span className="post-time">
                    {post.createdAt
                      ? formatDistanceToNow(new Date(post.createdAt), {
                          addSuffix: true,
                        })
                      : "Just now"}
                  </span>
                </AuthorInfo>
              </AuthorWrapper>

              {isOwner && (
                <ActionButtonsGroup>
                  <EditButton onClick={handleEditPost}>
                    <Edit2 size={16} />
                    Edit
                  </EditButton>
                  <DeleteButton onClick={() => setShowDeleteModal(true)}>
                    <Trash2 size={16} />
                  </DeleteButton>
                </ActionButtonsGroup>
              )}
            </PostAuthorSection>
          </PostHeader>

          <PostTitle>{post.title}</PostTitle>

          {hasMedia && currentMedia && (
            <MediaContainer>
              <MediaWrapper>
                {currentMedia.type === "image" ? (
                  <MediaImage
                    src={getMediaUrl(currentMedia.url)}
                    alt="Post media"
                  />
                ) : (
                  <MediaVideo controls>
                    <source src={getMediaUrl(currentMedia.url)} type="video/mp4" />
                    Your browser does not support the video tag.
                  </MediaVideo>
                )}
              </MediaWrapper>

              {mediaCount > 1 && (
                <>
                  <MediaNavigation>
                    <MediaArrowButton onClick={handlePrevMedia}>
                      <ChevronLeft size={20} />
                    </MediaArrowButton>

                    <MediaCounter>
                      {currentMediaIndex + 1} / {mediaCount}
                    </MediaCounter>

                    <MediaArrowButton onClick={handleNextMedia}>
                      <ChevronRight size={20} />
                    </MediaArrowButton>
                  </MediaNavigation>

                  <MediaThumbnails>
                    {post.media.map((media, index) => (
                      <MediaThumbnail
                        key={index}
                        $isActive={index === currentMediaIndex}
                        onClick={() => setCurrentMediaIndex(index)}
                      >
                        {media.type === "image" ? (
                          <img src={getMediaUrl(media.url)} alt={`Media ${index + 1}`} />
                        ) : (
                          <video>
                            <source src={getMediaUrl(media.url)} type="video/mp4" />
                          </video>
                        )}
                      </MediaThumbnail>
                    ))}
                  </MediaThumbnails>
                </>
              )}
            </MediaContainer>
          )}

          <PostContent>{post.content}</PostContent>

          <InteractionBar>
            <InteractionItem onClick={toggleLike}>
              <Heart
                size={24}
                fill={isLiked ? "url(#social-purple-gradient)" : "transparent"}
                color={isLiked ? "#8b5cf6" : "currentColor"}
                style={{ transition: "all 0.3s" }}
              />
              <span>{likeCount > 0 ? likeCount.toLocaleString() : "Like"}</span>
            </InteractionItem>

            <InteractionItem onClick={focusCommentInput}>
              <MessageCircle size={24} />
              <span>{currentComments.length}</span>
            </InteractionItem>
          </InteractionBar>
        </ContentCard>

        <CommentCard>
          <CommentSection
            commentInputRef={commentInputRef}
            currentComments={currentComments}
            commentText={commentText}
            setCommentText={setCommentText}
            handleSendComment={handleSendComment}
            handleDeleteComment={handleDeleteComment}
            handleUpdateComment={handleUpdateComment}
            BASE_URL={BASE_URL}
            navigate={navigate}
            currentUserId={currentUser?.userId || ""}
            isFixedLayout={false}
          />
        </CommentCard>

        <ConfirmModal
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={async () => {
            await handleDelete();
            setShowDeleteModal(false);
          }}
          action="Delete"
          message="Are you sure you want to delete this post?"
          messageHead="Delete Post"
        />
      </PostLayout>
    </PostWrapper>
  );
};