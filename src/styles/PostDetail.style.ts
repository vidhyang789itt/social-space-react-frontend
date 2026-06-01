import styled from "styled-components";
import type { AppTheme } from "./theme";

export const PostWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }: { theme: AppTheme }) => theme.body};
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;
`;

export const PostLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }: { theme: AppTheme }) => theme.body};
`;

export const ContentCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: clamp(600px, 90vw, 900px);
  margin: 0 auto;
  padding: clamp(1rem, 4vw, 2rem);
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: clamp(0.75rem, 3vw, 1.25rem);
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

export const MediaContainer = styled.div`
  width: 100%;
  margin: clamp(1.5rem, 3vw, 2rem) 0;
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2vw, 1.25rem);
`;

export const MediaWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  border-radius: clamp(8px, 2vw, 12px);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};

  @media (max-width: 768px) {
    aspect-ratio: 4 / 3;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    border-radius: 8px;
  }
`;

export const MediaImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
`;

export const MediaVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const MediaNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(1rem, 3vw, 1.5rem);
  width: 100%;
  flex-wrap: wrap;
`;

export const MediaArrowButton = styled.button`
  background: ${({ theme }: { theme: AppTheme }) => theme.accent};
  border: none;
  color: white;
  border-radius: 8px;
  padding: clamp(0.5rem, 1vw, 0.75rem);
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: clamp(18px, 4vw, 24px);
    height: clamp(18px, 4vw, 24px);
  }

  @media (max-width: 640px) {
    padding: 0.5rem;
    min-width: 40px;
  }
`;

export const MediaCounter = styled.div`
  flex: 1;
  text-align: center;
  font-size: clamp(12px, 2vw, 14px);
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  font-weight: 600;
  min-width: 80px;
`;

export const MediaThumbnails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  gap: clamp(0.5rem, 1vw, 0.75rem);
  width: 100%;

  @media (max-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(45px, 1fr));
    gap: 0.5rem;
  }
`;

export const MediaThumbnail = styled.button<{ $isActive?: boolean }>`
  aspect-ratio: 1;
  border-radius: 6px;
  overflow: hidden;
  border: 2px solid
    ${({ theme, $isActive }: { theme: AppTheme; $isActive?: boolean }) =>
      $isActive ? theme.accent : theme.divider};
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
  min-height: 44px;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover:not(:disabled) {
    transform: scale(1.05);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PostHeader = styled.div`
  margin-bottom: clamp(1rem, 2vw, 1.5rem);
  padding-bottom: clamp(1rem, 2vw, 1.25rem);
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
`;

export const PostAuthorSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(0.75rem, 2vw, 1.25rem);
  flex-wrap: wrap;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.875rem;
  }
`;

export const AuthorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 2vw, 1rem);
  flex: 1;
  min-width: 0;
`;

export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.25rem, 1vw, 0.375rem);
  flex: 1;
  min-width: 0;

  .author-name {
    font-size: clamp(13px, 2vw, 15px);
    font-weight: 700;
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
    cursor: pointer;
    transition: all 0.2s ease;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
      color: #8b5cf6;
    }
  }

  .post-time {
    font-size: clamp(11px, 2vw, 12px);
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  }
`;

export const ProfileImageDiv = styled.div`
  width: clamp(40px, 8vw, 50px);
  height: clamp(40px, 8vw, 50px);
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid ${({ theme }: { theme: AppTheme }) => theme.accent};
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 640px) {
    width: 40px;
    height: 40px;
  }
`;

export const ActionButtonsGroup = styled.div`
  display: flex;
  gap: clamp(0.75rem, 2vw, 1rem);
  align-items: center;
  flex-shrink: 0;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    width: 100%;
    margin-top: 0.75rem;
    gap: 0.75rem;
  }
`;

export const EditButton = styled.button`
  padding: clamp(0.625rem, 1vw, 0.75rem) clamp(1rem, 2vw, 1.25rem);
  background: linear-gradient(
    135deg,
    ${({ theme }: { theme: AppTheme }) => theme.accent} 0%,
    #7c3aed 100%
  );
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 700;
  font-size: clamp(12px, 2vw, 14px);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.375rem, 1vw, 0.5rem);
  white-space: nowrap;
  min-height: 44px;

  &:hover:not(:disabled) {
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: clamp(14px, 3vw, 18px);
    height: clamp(14px, 3vw, 18px);
  }

  @media (max-width: 640px) {
    flex: 1;
    padding: 0.625rem 1rem;
  }
`;

export const DeleteButton = styled(EditButton)`
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);

  &:hover:not(:disabled) {
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  }
`;

export const PostTitle = styled.h1`
  font-size: clamp(24px, 5vw, 32px);
  font-weight: 900;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  margin: clamp(1rem, 2vw, 1.5rem) 0 clamp(0.75rem, 1.5vw, 1rem) 0;
  line-height: 1.3;
  word-break: break-word;

  @media (max-width: 640px) {
    font-size: 22px;
    margin: 1rem 0 0.75rem 0;
  }
`;

export const PostContent = styled.div`
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  font-size: clamp(14px, 2vw, 16px);
  font-weight: 500;
  line-height: 1.7;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0 0 clamp(1rem, 2vw, 1.5rem) 0;

  @media (max-width: 640px) {
    font-size: 14px;
    margin: 0 0 1rem 0;
  }
`;

export const InteractionBar = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(1.5rem, 4vw, 2rem);
  padding: clamp(1rem, 2vw, 1.25rem) 0;
  margin: clamp(1rem, 2vw, 1.5rem) 0;
  border-top: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  flex-wrap: wrap;

  @media (max-width: 640px) {
    gap: 1.5rem;
    padding: 0.875rem 0;
    margin: 1rem 0;
  }
`;

export const InteractionItem = styled.button`
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 1vw, 0.75rem);
  cursor: pointer;
  transition: all 0.2s ease;
  background: none;
  border: none;
  padding: clamp(0.5rem, 1vw, 0.75rem);
  min-height: 44px;
  border-radius: 8px;

  &:hover {
    opacity: 0.8;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  svg {
    transition: all 0.2s ease;
    width: clamp(18px, 4vw, 24px);
    height: clamp(18px, 4vw, 24px);
  }

  span {
    font-size: clamp(12px, 2vw, 14px);
    font-weight: 700;
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  }

  @media (max-width: 640px) {
    padding: 0.5rem;
    gap: 0.5rem;

    span {
      font-size: 12px;
    }
  }
`;

export const VerticalDivider = styled.div`
  display: none;
`;

export const BackButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }: { theme: AppTheme }) => theme.accent};
  cursor: pointer;
  font-size: clamp(12px, 2vw, 14px);
  display: flex;
  align-items: center;
  gap: clamp(0.375rem, 1vw, 0.5rem);
  margin-bottom: clamp(1rem, 2vw, 1.25rem);
  font-weight: 700;
  padding: clamp(0.5rem, 1vw, 0.75rem);
  border-radius: 6px;
  transition: all 0.2s ease;
  min-height: 44px;

  &:hover {
    opacity: 0.8;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  svg {
    width: clamp(16px, 3vw, 20px);
    height: clamp(16px, 3vw, 20px);
  }

  @media (max-width: 640px) {
    margin-bottom: 0.875rem;
    font-size: 12px;
  }
`;

export const CommentCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: clamp(600px, 90vw, 900px);
  margin: 0 auto;
  padding: clamp(1rem, 4vw, 2rem);
  background: ${({ theme }: { theme: AppTheme }) => theme.body};
  box-sizing: border-box;
  border-top: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};

  @media (max-width: 768px) {
    padding: clamp(0.75rem, 3vw, 1.25rem);
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

export const CommentHeader = styled.div`
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  padding: 0 0 clamp(1rem, 2vw, 1.25rem) 0;
  margin-bottom: clamp(1rem, 2vw, 1.25rem);
  order: 2;

  h3 {
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
    font-size: clamp(16px, 3vw, 20px);
    font-weight: 700;
    margin: 0;
  }

  @media (max-width: 640px) {
    padding: 0 0 0.875rem 0;
    margin-bottom: 1rem;

    h3 {
      font-size: 16px;
    }
  }
`;

export const ScrollableComments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 0;
  order: 3;
  overflow: visible;
`;

export const CommentButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: clamp(0.75rem, 2vw, 1rem);
  flex-wrap: wrap;

  @media (max-width: 640px) {
    justify-content: stretch;
    gap: 0.75rem;
  }
`;

export const SendButton = styled.button`
  padding: clamp(0.625rem, 1vw, 0.75rem) clamp(1rem, 2vw, 1.25rem);
  background: linear-gradient(
    135deg,
    ${({ theme }: { theme: AppTheme }) => theme.accent},
    #7c3aed
  );
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 700;
  font-size: clamp(12px, 2vw, 14px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.375rem, 1vw, 0.5rem);
  white-space: nowrap;
  transition: all 0.2s ease;
  min-height: 44px;

  &:hover:not(:disabled) {
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: clamp(14px, 3vw, 18px);
    height: clamp(14px, 3vw, 18px);
  }

  @media (max-width: 640px) {
    padding: 0.625rem 1rem;
    font-size: 12px;
  }
`;

export const CommentItem = styled.div`
  padding: clamp(0.875rem, 2vw, 1.125rem) 0;
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  display: flex;
  gap: clamp(0.75rem, 2vw, 1rem);

  &:last-child {
    border-bottom: none;
  }

  .avatar {
    width: clamp(32px, 8vw, 40px);
    height: clamp(32px, 8vw, 40px);
    border-radius: 50%;
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    flex-shrink: 0;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid ${({ theme }: { theme: AppTheme }) => theme.accent};
    transition: all 0.2s ease;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &:hover {
      transform: scale(1.05);
    }
  }

  .content {
    flex: 1;
    min-width: 0;

    .author-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: clamp(0.5rem, 1vw, 1rem);
      margin-bottom: clamp(0.375rem, 1vw, 0.5rem);
      flex-wrap: wrap;

      strong {
        color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
        font-size: clamp(12px, 2vw, 14px);
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          color: #8b5cf6;
        }
      }

      span {
        color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
        font-size: clamp(10px, 1.5vw, 11px);
        white-space: nowrap;
      }
    }

    p {
      font-size: clamp(12px, 2vw, 14px);
      line-height: 1.6;
      color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
      margin: 0 0 clamp(0.625rem, 1vw, 0.875rem) 0;
      word-break: break-word;
    }

    .comment-actions {
      display: flex;
      gap: clamp(0.75rem, 2vw, 1rem);
      align-items: center;
      flex-wrap: wrap;
    }
  }

  @media (max-width: 640px) {
    gap: 0.75rem;

    .content {
      .author-info {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
      }
    }
  }
`;

export const CommentEditButton = styled.button`
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  border: none;
  color: white;
  cursor: pointer;
  font-size: clamp(11px, 1.5vw, 12px);
  font-weight: 700;
  padding: clamp(0.375rem, 1vw, 0.5rem) clamp(0.75rem, 1.5vw, 1rem);
  border-radius: 6px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.25rem, 1vw, 0.375rem);
  min-height: 32px;
  white-space: nowrap;

  &:hover:not(:disabled) {
    box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: clamp(12px, 3vw, 14px);
    height: clamp(12px, 3vw, 14px);
  }

  @media (max-width: 640px) {
    font-size: 11px;
    padding: 0.375rem 0.75rem;
  }
`;

export const CommentDeleteButton = styled(CommentEditButton)`
  background: linear-gradient(135deg, #ef4444, #dc2626);

  &:hover:not(:disabled) {
    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
  }
`;

export const CommentCancelButton = styled.button`
  background: ${({ theme }: { theme: AppTheme }) => theme.divider};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  cursor: pointer;
  font-size: clamp(11px, 1.5vw, 12px);
  font-weight: 700;
  padding: clamp(0.375rem, 1vw, 0.5rem) clamp(0.75rem, 1.5vw, 1rem);
  border-radius: 6px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.25rem, 1vw, 0.375rem);
  min-height: 32px;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    font-size: 11px;
    padding: 0.375rem 0.75rem;
  }
`;

export const CommentSaveButton = styled.button`
  background: linear-gradient(135deg, #10b981, #059669);
  border: none;
  color: white;
  cursor: pointer;
  font-size: clamp(11px, 1.5vw, 12px);
  font-weight: 700;
  padding: clamp(0.375rem, 1vw, 0.5rem) clamp(0.75rem, 1.5vw, 1rem);
  border-radius: 6px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.25rem, 1vw, 0.375rem);
  min-height: 32px;
  white-space: nowrap;

  &:hover:not(:disabled) {
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: clamp(12px, 3vw, 14px);
    height: clamp(12px, 3vw, 14px);
  }

  @media (max-width: 640px) {
    font-size: 11px;
    padding: 0.375rem 0.75rem;
  }
`;

export const CommentEditTextarea = styled.textarea`
  width: 100%;
  padding: clamp(0.75rem, 2vw, 1rem);
  border-radius: 8px;
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.accent};
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  font-size: clamp(13px, 2vw, 14px);
  font-family: inherit;
  resize: none;
  min-height: clamp(70px, 15vh, 100px);
  margin-bottom: clamp(0.75rem, 1vw, 1rem);
  transition: all 0.2s ease;
  box-sizing: border-box;

  &::placeholder {
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }: { theme: AppTheme }) => theme.accent};
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.08);
  }

  @media (max-width: 640px) {
    font-size: 13px;
    padding: 0.75rem;
    min-height: 70px;
  }
`;

export const CommentInputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.75rem, 1vw, 1rem);
  padding-bottom: clamp(1rem, 2vw, 1.5rem);
  margin-bottom: clamp(1rem, 2vw, 1.5rem);
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  order: 1;
  position: relative;

  @media (max-width: 640px) {
    gap: 0.75rem;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
`;

export const CommentInputField = styled.textarea`
  width: 100%;
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  border-radius: 8px;
  padding: clamp(0.875rem, 2vw, 1rem);
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  font-size: clamp(13px, 2vw, 14px);
  resize: none;
  outline: none;
  transition: all 0.2s ease;
  min-height: clamp(80px, 20vh, 120px);
  font-family: inherit;
  box-sizing: border-box;

  &::placeholder {
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    opacity: 0.7;
  }

  &:focus {
    border-color: ${({ theme }: { theme: AppTheme }) => theme.accent};
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.08);
  }

  &:disabled {
    background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
    cursor: not-allowed;
    opacity: 0.6;
  }

  @media (max-width: 640px) {
    min-height: 70px;
    padding: 0.75rem;
    font-size: 13px;
  }
`;

export const ScrollableInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: clamp(1rem, 2vw, 1.5rem) 0;
  max-height: calc(100vh - 200px);
  scroll-behavior: smooth;
  background: ${({ theme }: { theme: AppTheme }) => theme.body};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
    border-radius: 10px;
    transition: all 0.2s ease;

    &:hover {
      background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%);
    }
  }

  scrollbar-color: #8b5cf6 ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  scrollbar-width: thin;

  @media (max-width: 768px) {
    padding: clamp(0.75rem, 2vw, 1.25rem) 0;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 0;
    max-height: calc(100vh - 180px);
  }
`;

export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(1rem, 2vw, 1.5rem);
  padding: clamp(0.875rem, 1.5vw, 1.25rem) 0;
  margin-bottom: clamp(1rem, 2vw, 1.5rem);
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  flex-wrap: wrap;

  > div:first-child {
    display: flex;
    align-items: center;
    gap: clamp(0.75rem, 2vw, 1rem);
    flex: 1;
    min-width: 0;
  }

  h4 {
    font-size: clamp(13px, 2.5vw, 15px);
    font-weight: 700;
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
    margin: 0;
    cursor: pointer;
    transition: all 0.2s ease;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
      color: #8b5cf6;
    }
  }

  small {
    display: block;
    font-size: clamp(11px, 1.5vw, 12px);
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    margin-top: clamp(0.25rem, 0.5vw, 0.375rem);
  }

  @media (max-width: 640px) {
    padding: 0.75rem 0;
    margin-bottom: 1rem;
    gap: 0.875rem;

    h4 {
      font-size: 13px;
    }

    small {
      font-size: 11px;
    }
  }
`;