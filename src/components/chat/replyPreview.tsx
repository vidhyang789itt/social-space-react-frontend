import React from "react";
import { X } from "lucide-react";
import { CloseButton, ReplyContent, ReplyPreviewContainer } from "../../styles/replyPreview.style";

interface ReplyPreviewProps {
  senderName: string;
  content: string;
  onClear: () => void;
}

export const ReplyPreview: React.FC<ReplyPreviewProps> = ({
  senderName,
  content,
  onClear,
}) => {
  return (
    <ReplyPreviewContainer>
      <ReplyContent>
        <div className="reply-label">Replying to {senderName}</div>
        <div className="reply-text">{content}</div>
      </ReplyContent>
      <CloseButton onClick={onClear} title="Cancel reply">
        <X size={16} />
      </CloseButton>
    </ReplyPreviewContainer>
  );
};