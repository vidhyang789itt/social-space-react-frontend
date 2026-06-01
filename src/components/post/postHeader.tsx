import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, Pencil, Trash2 } from "lucide-react";
import {
  InteractionBar,
  PostImage,
  ProfileImageDiv,
} from "../../styles/NewPostCardStyle";
import {
  PostTitle,
  PostContent,
  HeaderSection,
  ScrollableInner,
} from "../../styles/PostDetail.style";

interface Props {
  post: any;
  isOwner: boolean;
  BASE_URL: string;
  likeCount: number;
  isLiked: boolean;
  toggleLike: () => void;
  currentCommentsCount: number;
  navigate: (path: string) => void;
  onEditClick: () => void;
  setShowDeleteModal: (v: boolean) => void;
  onCommentClick: () => void;
}

export const PostHeader = ({
  post,
  isOwner,
  BASE_URL,
  likeCount,
  isLiked,
  toggleLike,
  currentCommentsCount,
  navigate,
  onEditClick,
  setShowDeleteModal,
  onCommentClick,
}: Props) => {
  return (
    <ScrollableInner>
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
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>

      <div className="flex justify-between items-start">
        <PostTitle>{post.title}</PostTitle>

        {isOwner && (
          <div className="flex gap-4 mt-2">
            <Pencil
              size={18}
              className="cursor-pointer text-gray-500 hover:text-purple-500 transition-all duration-200 hover:scale-110"
              onClick={onEditClick}
            />

            <Trash2
              size={18}
              className="cursor-pointer text-gray-500 hover:text-red-500 transition-all duration-200 hover:scale-110"
              onClick={() => setShowDeleteModal(true)}
            />
          </div>
        )}
      </div>

      <HeaderSection>
        <div className="flex items-center gap-3">
          <ProfileImageDiv
            onClick={() => navigate(`/profile/${post.author.userId}`)}
          >
            <img src={`${BASE_URL}/${post.author?.profileUrl}`} alt="User" />
          </ProfileImageDiv>

          <div>
            <h4
              className="font-bold cursor-pointer hover:text-purple-500 transition-colors"
              onClick={() => navigate(`/profile/${post.author.userId}`)}
            >
              {post.author?.username}
              {isOwner ? " (you)" : ""}
            </h4>

            <small className="text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt))} ago
            </small>
          </div>
        </div>
      </HeaderSection>

      {post.imageUrl && (
        <div className="image-container" style={{ marginTop: "1rem", borderRadius: "0.75rem", overflow: "hidden" }}>
          <PostImage 
            src={`${BASE_URL}/${post.imageUrl}`} 
            alt={post.title}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </div>
      )}

      <InteractionBar>
        <div className="flex items-center gap-2">
          <Heart
            size={24}
            onClick={toggleLike}
            fill={isLiked ? "url(#social-purple-gradient)" : "transparent"}
            color={isLiked ? "#8b5cf6" : "currentColor"}
            className={`
              transition-all duration-300 cursor-pointer 
              ${isLiked ? "scale-110 filter drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]" : "hover:scale-110 active:scale-90"}
            `}
            strokeWidth={isLiked ? 1.5 : 2}
          />
          <span>{likeCount}</span>
        </div>

        <div 
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" 
          onClick={onCommentClick}
        >
          <MessageCircle size={24} />
          <span>{currentCommentsCount}</span>
        </div>
      </InteractionBar>

      <div className="pt-4 pl-1">
        <PostContent>{post.content}</PostContent>
      </div>
    </ScrollableInner>
  );
};