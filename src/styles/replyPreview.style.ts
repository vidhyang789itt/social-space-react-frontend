
import styled from "styled-components";


export const ReplyPreviewContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #f3f4f6;
  border-left: 3px solid #8b5cf6;
  border-radius: 6px;
  margin-bottom: 12px;
  align-items: flex-start;
`;

export const ReplyContent = styled.div`
  flex: 1;
  min-width: 0;

  .reply-label {
    font-size: 12px;
    font-weight: 600;
    color: #8b5cf6;
    margin-bottom: 4px;
  }

  .reply-text {
    font-size: 13px;
    color: #374151;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    color: #374151;
  }
`;

