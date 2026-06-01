import styled from "styled-components";
import type { AppTheme } from "./theme";

export const MessageListContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
  background: ${({ theme }: { theme: AppTheme }) => theme.body};
  padding-right: 4px;
  position: relative;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }: { theme: AppTheme }) => theme.divider};
    border-radius: 4px;

    &:hover {
      background: ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
    }
  }
`;

export const MessageItemWrapper = styled.div<{ $isMe: boolean }>`
  display: flex;
  gap: 8px;
  position: relative;
  align-items: flex-start;
  padding: 6px 12px;
  transition: all 0.2s ease;
  margin: 2px 0;
  width: 100%;
  justify-content: ${(props) => (props.$isMe ? "flex-end" : "flex-start")};

  &:hover {
    background-color: rgba(139, 92, 246, 0.03);

    .message-actions {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }
  }

  &:has(.message-actions[data-open="true"]) .message-actions {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }
`;

export const MessageContentWrapper = styled.div<{ $isMe: boolean }>`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  flex-direction: ${(props) => (props.$isMe ? "row-reverse" : "row")};
  width: auto;
  max-width: 600px;
`;

export const MessageContent = styled.div<{ $isMe: boolean }>`
  flex: 0 1 auto;
  min-width: 0;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isMe ? "flex-end" : "flex-start")};
  gap: 4px;

  @media (max-width: 640px) {
    max-width: 300px;
  }
`;

export const SenderName = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #8b5cf6;
  margin-bottom: 4px;
  padding: 0 12px;
`;

export const MessageBubble = styled.div<{ $isMe: boolean }>`
  background-color: ${(props) =>
    props.$isMe ? "#8b5cf6" : "rgba(139, 92, 246, 0.08)"};
  color: ${({ $isMe, theme }: { $isMe: boolean; theme: AppTheme }) =>
    $isMe ? "#ffffff" : theme.textPrimary};
  padding: 10px 14px;
  border-radius: ${(props) =>
    props.$isMe
      ? "18px 18px 6px 18px"
      : "18px 18px 18px 6px"};
  word-wrap: break-word;
  overflow-wrap: break-word;
  line-height: 1.4;
  font-size: 14px;
  box-shadow: ${(props) =>
    props.$isMe
      ? "0 1px 2px rgba(0, 0, 0, 0.05)"
      : "0 1px 2px rgba(0, 0, 0, 0.03)"};
  animation: messageIn 0.2s ease-out;

  @keyframes messageIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 640px) {
    max-width: 280px;
  }
`;

export const DeletedMessageBubble = styled.div<{ $isMe: boolean }>`
  background-color: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  padding: 10px 14px;
  border-radius: ${(props) =>
    props.$isMe
      ? "18px 18px 6px 18px"
      : "18px 18px 18px 6px"};
  word-wrap: break-word;
  overflow-wrap: break-word;
  line-height: 1.4;
  font-size: 14px;
  font-style: italic;
  box-shadow: ${(props) =>
    props.$isMe
      ? "0 1px 2px rgba(0, 0, 0, 0.05)"
      : "0 1px 2px rgba(0, 0, 0, 0.03)"};
  animation: messageIn 0.2s ease-out;
  opacity: 0.7;
  display: flex;
  align-items: center;
  gap: 8px;

  @keyframes messageIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 640px) {
    max-width: 280px;
  }

  svg {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    opacity: 0.5;
  }
`;

export const MessageMetadata = styled.div<{ $isMe: boolean }>`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 0 12px;
  font-size: 11px;
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  flex-direction: ${(props) => (props.$isMe ? "row-reverse" : "row")};
`;

export const Timestamp = styled.span`
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  font-size: 11px;
  white-space: nowrap;
`;

export const ReadByCount = styled.span`
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  font-size: 10px;
  font-weight: 500;
`;

export const FileDownloadButton = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  border-radius: 12px;
  text-decoration: none;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  min-width: 220px;
  transition: all 0.2s ease;
  font-weight: 500;
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};

  &:hover {
    background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
    transform: translateY(-2px);
  }

  svg {
    flex-shrink: 0;
    color: #8b5cf6;
  }
`;

export const FileName = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const FileNameText = styled.div`
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
`;

export const FileSize = styled.div`
  font-size: 12px;
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
`;

export const ActionSection = styled.div`
  display: flex;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: all 0.2s ease;
  flex-shrink: 0;
  min-width: 36px;
  min-height: 36px;
  justify-content: center;

  &.message-actions[data-open="true"] {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  &.message-actions {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  text-align: center;
  padding: 20px;
  flex-direction: column;
  gap: 12px;
`;

export const EmptyStateTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  margin-bottom: 8px;
`;

export const EmptyStateDescription = styled.div`
  font-size: 14px;
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 8px;
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  font-size: 12px;
`;

export const MediaContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 8px;
  margin-bottom: 8px;
  max-width: 400px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    max-width: 280px;
  }
`;

export const MediaItem = styled.div`
  border-radius: 12px;
  overflow: hidden;
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  img {
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  video {
    object-fit: cover;
  }
`;

export const StickyDateBadge = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    180deg,
    ${({ theme }: { theme: AppTheme }) => theme.body} 0%,
    ${({ theme }: { theme: AppTheme }) => theme.body} 100%
  );
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  z-index: 20;
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const StickyDateLabel = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  white-space: nowrap;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  padding: 8px 0;

  &::before {
    content: "";
    position: absolute;
    left: -16px;
    width: 8px;
    height: 8px;
    background: linear-gradient(
      135deg,
      ${({ theme }: { theme: AppTheme }) => theme.textSecondary} 0%,
      ${({ theme }: { theme: AppTheme }) => theme.divider} 100%
    );
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }

  &::after {
    content: "";
    position: absolute;
    right: -16px;
    width: 8px;
    height: 8px;
    background: linear-gradient(
      135deg,
      ${({ theme }: { theme: AppTheme }) => theme.textSecondary} 0%,
      ${({ theme }: { theme: AppTheme }) => theme.divider} 100%
    );
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite 0.3s;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.2);
    }
  }

  @media (max-width: 640px) {
    font-size: 10px;
    gap: 8px;

    &::before,
    &::after {
      display: none;
    }
  }
`;

export const ImageModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

export const CloseButton = styled.button<{ isHovered?: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #8b5cf6;
  border: none;
  color: white;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 1001;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);

  &:hover {
    background: #7c3aed;
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(139, 92, 246, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 90vw;
  max-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageElement = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 12px;
`;

export const NavButton = styled.button<{
  isDisabled: boolean;
  position: "left" | "right";
}>`
  position: fixed;
  ${(props) => (props.position === "left" ? "left: 20px;" : "right: 20px;")}
  top: 50%;
  transform: translateY(-50%);
  background: ${(props) =>
    props.isDisabled ? "rgba(139, 92, 246, 0.3)" : "#8b5cf6"};
  border: none;
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  box-shadow: ${(props) =>
    props.isDisabled
      ? "0 4px 12px rgba(139, 92, 246, 0.2)"
      : "0 4px 12px rgba(139, 92, 246, 0.3)"};
  z-index: 1002;

  &:hover:not(:disabled) {
    background: #7c3aed;
    box-shadow: 0 6px 16px rgba(139, 92, 246, 0.4);
  }

  &:disabled {
    opacity: 0.5;
  }

  &:active:not(:disabled) {
    transform: translateY(-50%) scale(0.95);
  }
`;

export const CounterDisplay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  padding: 10px 20px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  pointer-events: none;
  z-index: 1003;
`;

export const ThumbnailStripContainer = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 12px 12px 0 0;
  overflow-x: auto;
  max-width: 100%;
  backdrop-filter: blur(10px);
  scroll-behavior: smooth;

  /* ✅ Custom scrollbar styling */
  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(139, 92, 246, 0.1);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(139, 92, 246, 0.5);
    border-radius: 10px;

    &:hover {
      background: rgba(139, 92, 246, 0.7);
    }
  }
`;

export const ThumbnailButton = styled.button<{ isActive: boolean }>`
  min-width: 60px;
  width: 60px;
  height: 60px;
  border-radius: 8px;
  border: ${(props) =>
    props.isActive
      ? "3px solid #8b5cf6"
      : "2px solid rgba(139, 92, 246, 0.3)"};
  background: transparent;
  padding: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
  flex-shrink: 0;

  &:hover {
    ${(props) =>
      !props.isActive &&
      `
      border-color: rgba(139, 92, 246, 0.6);
      transform: scale(1.05);
    `}
  }

  &:active {
    transform: scale(0.98);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: ${(props) => (props.isActive ? 1 : 0.6)};
    transition: opacity 0.2s ease;
  }
`;

export const ModalContent = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const BottomControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export const ReplyPreviewBox = styled.div<{ $isMe: boolean }>`
  display: flex;
  gap: 8px;
  padding: 8px 12px;
  background: ${({ $isMe }) => ($isMe ? "rgba(139, 92, 246, 0.1)" : "rgba(226, 232, 240, 0.5)")};
  border-left: 3px solid ${({ $isMe }) => ($isMe ? "#8b5cf6" : "#94a3b8")};
  border-radius: 6px;
  margin-bottom: 8px;
  font-size: 12px;

  .reply-sender {
    font-weight: 600;
    color: #8b5cf6;
  }

  .reply-content {
    color: #6b7280;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
  }
`;
