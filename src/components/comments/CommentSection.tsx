import {
  CommentHeader,
  ScrollableComments,
  CommentItem,
  CommentInputArea,
  CommentInputField,
  CommentButtonWrapper,
  SendButton,
  CommentEditButton,
  CommentDeleteButton,
} from "../../styles/PostDetail.style";
import { Send, Edit2, Trash2, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import type { Comment } from "../../types/comment.type";
import { getMediaUrl } from "../../utils/getMediaUrl";

interface CommentSectionProps {
  commentInputRef: React.RefObject<HTMLTextAreaElement | null>;
  currentComments: Comment[];
  commentText: string;
  setCommentText: (text: string) => void;
  handleSendComment: () => void;
  handleDeleteComment: (commentId: string) => void;
  handleUpdateComment: (commentId: string, newText: string) => void;
  BASE_URL: string;
  navigate: (path: string) => void;
  currentUserId: string;
  isFixedLayout?: boolean;
}

export const CommentSection = ({
  commentInputRef,
  currentComments,
  commentText,
  setCommentText,
  handleSendComment,
  handleDeleteComment,
  handleUpdateComment,
  navigate,
  currentUserId,
}: CommentSectionProps) => {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      if (editingCommentId) {
        saveEdit(editingCommentId);
      } else {
        handleSendComment();
      }
    }
  };

  const startEdit = (comment: Comment) => {
    setEditingCommentId(comment._id);
    setEditingText(comment.content);
    if (commentInputRef.current) {
      commentInputRef.current.focus();
      commentInputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const saveEdit = (commentId: string) => {
    if (editingText.trim()) {
      handleUpdateComment(commentId, editingText);
      setEditingCommentId(null);
      setEditingText("");
      setCommentText("");
    }
  };

  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditingText("");
  };

  return (
    <>
      <CommentInputArea>
        <div style={{ position: "relative" }}>
          {editingCommentId && (
            <div
              style={{
                position: "absolute",
                top: "-2.5vh",
                left: "1vw",
                fontSize: "0.85rem",
                color: "var(--accent)",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "0.5vw",
              }}
            >
              <Edit2 size={14} />
              Editing comment...
            </div>
          )}
          <CommentInputField
            ref={commentInputRef}
            name="comment-input"
            placeholder={editingCommentId ? "Edit your comment..." : "Write a comment..."}
            value={editingCommentId ? editingText : commentText}
            onChange={(e) => {
              if (editingCommentId) {
                setEditingText(e.target.value);
              } else {
                setCommentText(e.target.value);
              }
            }}
            onKeyPress={handleKeyPress}
          />
        </div>
        <CommentButtonWrapper>
          {editingCommentId ? (
            <>
              <SendButton
                onClick={() => saveEdit(editingCommentId)}
                disabled={!editingText.trim()}
                style={{
                  background: "linear-gradient(135deg, #10b981, #059669)",
                }}
              >
                <Send size={16} />
                Save Edit
              </SendButton>
              <SendButton
                onClick={cancelEdit}
                disabled={false}
                style={{
                  background: "var(--divider)",
                  color: "var(--text-secondary)",
                }}
              >
                <X size={16} />
                Cancel
              </SendButton>
            </>
          ) : (
            <SendButton
              onClick={handleSendComment}
              disabled={!commentText.trim()}
            >
              <Send size={16} />
              Send
            </SendButton>
          )}
        </CommentButtonWrapper>
      </CommentInputArea>

      <CommentHeader>
        <h3>Comments ({currentComments.length})</h3>
      </CommentHeader>

      <ScrollableComments>
        {currentComments.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2vh", color: "var(--text-secondary)" }}>
            No comments yet. Be the first to comment!
          </div>
        ) : (
          currentComments.map((comment) => (
            <CommentItem key={comment._id}>
              <div
                className="avatar"
                onClick={() => navigate(`/profile/${comment.user.userId}`)}
              >
                <img
                  src={
                    comment.user.profileUrl
                      ? getMediaUrl(comment.user.profileUrl)
                      : "/profileImage.jpg"
                  }
                  alt={comment.user.username}
                />
              </div>
              <div className="content">
                <div className="author-info">
                  <strong onClick={() => navigate(`/profile/${comment.user.userId}`)}>
                    {comment.user.username}
                  </strong>
                  <span>
                    {comment.createdAt
                      ? formatDistanceToNow(new Date(comment.createdAt), {
                          addSuffix: true,
                        })
                      : "Just now"}
                  </span>
                </div>

                <p>{comment.content}</p>

                {currentUserId === comment.user.userId && (
                  <div className="comment-actions">
                    <CommentEditButton onClick={() => startEdit(comment)}>
                      <Edit2 size={14} />
                      Edit
                    </CommentEditButton>
                    <CommentDeleteButton
                      onClick={() => handleDeleteComment(comment._id)}
                    >
                      <Trash2 size={14} />
                      Delete
                    </CommentDeleteButton>
                  </div>
                )}
              </div>
            </CommentItem>
          ))
        )}
      </ScrollableComments>
    </>
  );
};