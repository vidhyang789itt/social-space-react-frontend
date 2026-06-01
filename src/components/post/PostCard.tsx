import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  PostCardWrapper,
  PostImage,
  HeaderSection,
  UserBrand,
  DesktopImageWrapper,
  InfoBody,
  MainTitle,
  SummaryText,
  ProfileImageDiv,
  InteractionBar,
  BottomActionsRow,
  CommentLink,
  DetailsLink,
} from "../../styles/NewPostCardStyle";
import { formatDistanceToNow } from "date-fns";
import type { Post } from "../../types/post.types";
import { Heart, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useLike } from "../../hooks/useLike";
import { useState } from "react";
import { useComments } from "../../hooks/useComment";
import { useTheme } from "styled-components";
import type { AppTheme } from "../../styles/theme";
import { getMediaUrl } from "../../utils/getMediaUrl";

interface Props {
  post: Post;
}

export const PostCard = ({ post }: Props) => {
  const navigate = useNavigate();
  const theme = useTheme() as AppTheme;
  
  const { isLiked, likeCount, toggleLike } = useLike(post.postId);
  const [showPopHeart, setShowPopHeart] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const { commentsCount } = useComments(post.postId);

  const hasMedia = post.media && post.media.length > 0;
  const mediaCount = hasMedia ? post.media.length : 0;
  const currentMedia = hasMedia ? post.media[currentMediaIndex] : null;

  const handleDoubleTap = () => {
    if (!isLiked) {
      toggleLike();
    }

    setShowPopHeart(true);
    setTimeout(() => setShowPopHeart(false), 1000);
  };

  const handlePrevMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMediaIndex((prev) =>
      prev === 0 ? mediaCount - 1 : prev - 1
    );
  };

  const handleNextMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMediaIndex((prev) =>
      prev === mediaCount - 1 ? 0 : prev + 1
    );
  };

  return (
    <PostCardWrapper>
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

      <HeaderSection>
        <UserBrand>
          <ProfileImageDiv
            onClick={() => navigate(`/profile/${post.author?.userId}`)}
          >
            <img
              src={
                post.author?.profileUrl
                  ? getMediaUrl(post.author.profileUrl)
                  : "/profileImage.jpg"
              }
              alt="user"
            />
          </ProfileImageDiv>
          <div className="meta">
            <span
              className="cursor-pointer hover:text-[#8b5cf6] transition-colors"
              onClick={() => navigate(`/profile/${post.author?.userId}`)}
            >
              {post.author?.username || "Unknown User"}
            </span>
            <small>
              {post.createdAt
                ? formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })
                : "Just now"}
            </small>
          </div>
        </UserBrand>
      </HeaderSection>

      <InfoBody>
        <MainTitle>{post.title || "Untitled"}</MainTitle>
        <SummaryText>{post.content || "No content"}</SummaryText>
      </InfoBody>

      {hasMedia && currentMedia && (
        <DesktopImageWrapper onDoubleClick={handleDoubleTap}>
          {currentMedia.type === "image" ? (
            <PostImage
              src={getMediaUrl(currentMedia.url)}
              alt={`Post media ${currentMediaIndex + 1}`}
            />
          ) : (
            <video
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
              controls
            >
              <source src={getMediaUrl(currentMedia.url)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          {mediaCount > 1 && (
            <>
              <button
                onClick={handlePrevMedia}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(139, 92, 246, 0.2)",
                  color: "#8b5cf6",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 5,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(139, 92, 246, 0.3)";
                  e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(139, 92, 246, 0.2)";
                  e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.3)";
                }}
                type="button"
                aria-label="Previous media"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={handleNextMedia}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(139, 92, 246, 0.2)",
                  color: "#8b5cf6",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 5,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(139, 92, 246, 0.3)";
                  e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(139, 92, 246, 0.2)";
                  e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.3)";
                }}
                type="button"
                aria-label="Next media"
              >
                <ChevronRight size={18} />
              </button>

              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  right: "12px",
                  background: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  padding: "4px 10px",
                  borderRadius: "16px",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  zIndex: 5,
                  backdropFilter: "blur(4px)",
                }}
              >
                {currentMediaIndex + 1} / {mediaCount}
              </div>
            </>
          )}

          <AnimatePresence>
            {showPopHeart && (
              <motion.div
                initial={{ scale: 0, opacity: 0, rotate: -20 }}
                animate={{ scale: 1.5, opacity: 1, rotate: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                style={{
                  position: "absolute",
                  zIndex: 10,
                  pointerEvents: "none",
                  filter: "drop-shadow(0 0 15px rgba(139, 92, 246, 0.8))",
                }}
              >
                <Heart
                  size={100}
                  fill="url(#social-purple-gradient)"
                  stroke="none"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </DesktopImageWrapper>
      )}

    <InteractionBar>
      <button
        onClick={toggleLike}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0.5rem",
          borderRadius: "6px",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = `rgba(139, 92, 246, 0.08)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "none";
        }}
      >
        <Heart
          size={22}
          fill={isLiked ? "url(#social-purple-gradient)" : "transparent"}
          color={isLiked ? "#8b5cf6" : theme.textSecondary}
          className={`transition-all duration-300 cursor-pointer ${
            isLiked ? "scale-110" : "hover:scale-110 active:scale-90"
          }`}
          strokeWidth={isLiked ? 1.5 : 2}
        />
        <span style={{ color: theme.textSecondary, fontSize: "0.875rem" }}>
          {likeCount > 0 ? likeCount.toLocaleString() : ""}
        </span>
      </button>

      <button
        onClick={() =>
          navigate(`/post/${post.postId}`, { state: { focusComments: true } })
        }
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0.5rem",
          borderRadius: "6px",
          transition: "all 0.2s ease",
          color: theme.textSecondary,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = `rgba(139, 92, 246, 0.08)`;
          e.currentTarget.style.color = "#8b5cf6";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "none";
          e.currentTarget.style.color = theme.textSecondary;
        }}
      >
        <MessageCircle 
          size={20} 
          color={theme.textSecondary}
        />
        <span style={{ fontSize: "0.875rem" }}>
          {commentsCount > 0 ? commentsCount : ""}
        </span>
      </button>
    </InteractionBar>

      <BottomActionsRow>
        <CommentLink onClick={() => navigate(`/post/${post.postId}`)}>
          {commentsCount > 0
            ? `View all ${commentsCount} comments`
            : "Be the first to comment"}
        </CommentLink>

        <DetailsLink onClick={() => navigate(`/post/${post.postId}`)}>
          More Details →
        </DetailsLink>
      </BottomActionsRow>
    </PostCardWrapper>
  );
};