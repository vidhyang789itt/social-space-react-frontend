import styled from "styled-components";
import type { AppTheme } from "./theme";

export const ChatContainer = styled.div`
  display: flex;
  height: calc(100vh - 70px);
  background-color: ${({ theme }: { theme: AppTheme }) => theme.body};
  overflow: hidden;
`;

export const MainChatArea = styled.div<{ $showMobile?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }: { theme: AppTheme }) => theme.innerBg};

  @media (max-width: 768px) {
    display: ${(props) => (props.$showMobile ? "flex" : "none")};
  }
`;

export const MessageBubble = styled.div<{ $isMe: boolean }>`
  max-width: clamp(60%, 100%, 70%);
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 1.25rem);
  border-radius: 16px;
  margin-bottom: clamp(0.5rem, 1vw, 0.75rem);
  font-size: clamp(13px, 3vw, 14px);
  line-height: 1.5;
  align-self: ${(props) => (props.$isMe ? "flex-end" : "flex-start")};
  background-color: ${(props) =>
    props.$isMe ? props.theme.accent : props.theme.cardBg};
  color: ${(props) =>
    props.$isMe ? "white" : props.theme.textPrimary};
  border-bottom-right-radius: ${(props) =>
    props.$isMe ? "4px" : "16px"};
  border-bottom-left-radius: ${(props) =>
    props.$isMe ? "16px" : "4px"};
  border: ${(props) =>
    !props.$isMe ? `1px solid ${props.theme.divider}` : "none"};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  word-wrap: break-word;
  white-space: pre-wrap;
`;

export const InputArea = styled.div`
  padding: clamp(1rem, 3vw, 1.25rem);
  background-color: ${({ theme }: { theme: AppTheme }) => theme.headerBg};
  border-top: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  display: flex;
  gap: clamp(0.75rem, 2vw, 1rem);
  align-items: center;
`;

export const ChatHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: clamp(1rem, 3vw, 1.25rem) clamp(1.5rem, 4vw, 1.75rem);
  background-color: ${({ theme }: { theme: AppTheme }) => theme.headerBg};
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};

  .user-info {
    display: flex;
    align-items: center;
    gap: clamp(0.75rem, 2vw, 1rem);

    img {
      width: clamp(36px, 8vw, 48px);
      height: clamp(36px, 8vw, 48px);
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
    }

    .user-details {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }

    .username {
      font-size: clamp(13px, 3vw, 15px);
      font-weight: 600;
      color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .status {
      font-size: clamp(10px, 2vw, 11px);
      color: ${({ theme }: { theme: AppTheme }) => theme.accent};
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }

  @media (max-width: 640px) {
    padding: 0.875rem 1rem;

    .user-info img {
      width: 36px;
      height: 36px;
    }
  }
`;

export const MessageArea = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: clamp(1rem, 3vw, 1.5rem);
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2vw, 1.25rem);
  background-color: ${({ theme }: { theme: AppTheme }) => theme.innerBg};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }: { theme: AppTheme }) => theme.divider};
    border-radius: 3px;

    &:hover {
      background: ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
    }
  }

  @media (max-width: 640px) {
    padding: clamp(0.75rem, 2vw, 1rem);
    gap: 0.875rem;
  }
`;

export const MessageWrapper = styled.div<{ $isMe: boolean }>`
  display: flex;
  flex-direction: column;
  align-self: ${(props) => (props.$isMe ? "flex-end" : "flex-start")};
  max-width: clamp(65%, 100%, 75%);
  gap: clamp(2px, 1vw, 4px);
`;

export const Bubble = styled.div<{ $isMe: boolean }>`
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 1.25rem);
  font-size: clamp(13px, 3vw, 14px);
  line-height: 1.5;
  border-radius: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  word-wrap: break-word;
  white-space: pre-wrap;
  background-color: ${(props) =>
    props.$isMe ? props.theme.accent : props.theme.cardBg};
  color: ${(props) =>
    props.$isMe ? "white" : props.theme.textPrimary};
  border-bottom-right-radius: ${(props) =>
    props.$isMe ? "4px" : "16px"};
  border-bottom-left-radius: ${(props) =>
    props.$isMe ? "16px" : "4px"};
  border: ${(props) =>
    !props.$isMe ? `1px solid ${props.theme.divider}` : "none"};
  transition: all 0.2s ease;
`;

export const Timestamp = styled.span<{ $isMe: boolean }>`
  font-size: clamp(10px, 2vw, 11px);
  margin-top: clamp(2px, 1vw, 4px);
  opacity: 0.6;
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  align-self: ${(props) => (props.$isMe ? "flex-end" : "flex-start")};
`;

export const InputContainer = styled.form`
  padding: clamp(1rem, 3vw, 1.25rem);
  background-color: ${({ theme }: { theme: AppTheme }) => theme.headerBg};
  border-top: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 2vw, 1rem);

  input {
    flex: 1;
    padding: clamp(0.75rem, 2vw, 0.875rem) clamp(1rem, 3vw, 1.25rem);
    border-radius: 24px;
    border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
    background-color: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
    font-size: clamp(13px, 3vw, 14px);
    outline: none;
    transition: all 0.2s ease;
    min-height: 44px;

    &::placeholder {
      color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
      opacity: 0.7;
    }

    &:focus {
      border-color: ${({ theme }: { theme: AppTheme }) => theme.accent};
      box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.08);
    }

    @media (max-width: 640px) {
      font-size: 16px;
    }
  }

  button {
    background-color: ${({ theme }: { theme: AppTheme }) => theme.accent};
    color: white;
    border: none;
    width: clamp(40px, 10vw, 44px);
    height: clamp(40px, 10vw, 44px);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
    min-height: 44px;

    &:hover:not(:disabled) {
      box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
    }

    &:active:not(:disabled) {
      transform: scale(0.95);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    svg {
      width: clamp(18px, 4vw, 20px);
      height: clamp(18px, 4vw, 20px);
    }
  }
`;

export const ChatPageWrapper = styled.div`
  display: flex;
  height: calc(100vh - clamp(60px, 10vh, 72px));
  background: ${({ theme }: { theme: AppTheme }) => theme.body};
  overflow: hidden;

  @media (max-width: 768px) {
    height: calc(100vh - 60px - 60px);
  }

  @media (max-width: 480px) {
    height: calc(100vh - 56px - 60px);
  }
`;

export const ListContainer = styled.div<{ $isActive?: boolean }>`
  width: 35%;
  min-width: 300px;
  height: 100%;
  border-right: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  display: flex;
  flex-direction: column;
  background: ${({ theme }: { theme: AppTheme }) => theme.headerBg};
  overflow: hidden;

  @media (max-width: 1024px) {
    width: 30%;
    min-width: 280px;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: unset;
    border-right: none;
    display: ${({ $isActive }) => ($isActive ? "none" : "flex")};
    border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  }

  @media (max-width: 480px) {
    border-bottom: none;
  }
`;

export const WindowContainer = styled.div<{ $isActive?: boolean }>`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${({ theme }: { theme: AppTheme }) => theme.body};

  @media (max-width: 768px) {
    display: ${({ $isActive }) => ($isActive ? "flex" : "none")};
    width: 100%;
  }
`;

export const WindowContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: ${({ theme }: { theme: AppTheme }) => theme.body};
`;

export const SidebarList = styled.div<{ $hideMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${({ theme }: { theme: AppTheme }) => theme.headerBg};
  overflow: hidden;

  @media (max-width: 768px) {
    display: ${({ $hideMobile }) => ($hideMobile ? "none" : "flex")};
  }
`;

export const SidebarHeader = styled.div`
  flex-shrink: 0;
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  padding: clamp(1rem, 3vw, 1.25rem) 0;
`;

export const SearchWrapper = styled.div`
  position: relative;
  padding: 0 clamp(1rem, 3vw, 1.25rem);
  margin-top: clamp(0.75rem, 2vw, 1rem);

  input {
    width: 100%;
    padding: clamp(0.625rem, 1.5vw, 0.75rem) clamp(1rem, 2vw, 1.25rem);
    border-radius: 999px;
    border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
    background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
    font-size: clamp(12px, 2vw, 14px);
    outline: none;
    transition: all 0.2s ease;

    &::placeholder {
      color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
      opacity: 0.6;
    }

    &:focus {
      border-color: ${({ theme }: { theme: AppTheme }) => theme.accent};
      box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.08);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  @media (max-width: 480px) {
    padding: 0 0.75rem;
    margin-top: 0.75rem;
  }
`;

export const ScrollableList = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }: { theme: AppTheme }) => theme.divider};
    border-radius: 3px;

    &:hover {
      background: ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
    }
  }
`;

export const ConversationItem = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: clamp(0.875rem, 2vw, 1rem) clamp(1rem, 2vw, 1.25rem);
  border: none;
  background: ${({ $active, theme }: { $active?: boolean; theme: AppTheme }) =>
    $active ? theme.cardBg : "transparent"};
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  text-align: left;
  min-height: 64px;

  &:hover:not(:disabled) {
    background: ${({ $active, theme }: { $active?: boolean; theme: AppTheme }) =>
      $active ? theme.cardBg : theme.innerBg};
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    min-height: 60px;
  }
`;

export const ConversationContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(0.25rem, 1vw, 0.375rem);
`;

export const MetaSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: clamp(0.25rem, 1vw, 0.5rem);
  flex-shrink: 0;
  margin-left: clamp(0.75rem, 2vw, 1rem);
`;

export const TimeStamp = styled.span`
  font-size: clamp(11px, 2vw, 12px);
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  opacity: 0.7;
  white-space: nowrap;
`;

export const UnreadBadge = styled.span`
  background: ${({ theme }: { theme: AppTheme }) => theme.accent};
  color: white;
  border-radius: 999px;
  padding: clamp(0.25rem, 1vw, 0.375rem) clamp(0.5rem, 1.5vw, 0.75rem);
  font-size: clamp(10px, 2vw, 11px);
  font-weight: 700;
  min-width: 18px;
  text-align: center;
`;

export const EmptyStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: clamp(1rem, 3vw, 1.5rem);
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  padding: clamp(2rem, 5vw, 3rem);
  text-align: center;

  .icon-container {
    font-size: clamp(32px, 8vw, 48px);
    opacity: 0.5;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  h3 {
    margin: 0;
    font-size: clamp(16px, 4vw, 20px);
    font-weight: 700;
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  }

  p {
    margin: 0;
    font-size: clamp(12px, 2vw, 14px);
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    padding: 2rem 1rem;
  }
`;