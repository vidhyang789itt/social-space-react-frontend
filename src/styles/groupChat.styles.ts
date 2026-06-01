import styled from "styled-components";
import type { AppTheme } from "./theme";

export const Section = styled.div`
  margin-bottom: clamp(1rem, 3vw, 1.5rem);

  h3 {
    font-size: clamp(13px, 3vw, 14px);
    font-weight: 700;
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
    margin: 0 0 clamp(0.75rem, 2vw, 1rem) 0;
    display: flex;
    align-items: center;
    gap: clamp(0.5rem, 2vw, 0.75rem);
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 640px) {
    margin-bottom: 1rem;

    h3 {
      font-size: 13px;
      margin-bottom: 0.75rem;
    }
  }
`;

export const LeaveGroupButton = styled.button`
  width: 100%;
  padding: clamp(0.75rem, 2vw, 0.875rem) clamp(1rem, 3vw, 1.25rem);
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  color: #dc2626;
  border: 1px solid #fecaca;
  border-radius: clamp(6px, 2vw, 8px);
  cursor: pointer;
  font-size: clamp(13px, 3vw, 14px);
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.5rem, 2vw, 0.75rem);
  transition: all 0.2s ease;
  min-height: 44px;

  &:hover:not(:disabled) {
    background: #fee2e2;
    border-color: #fca5a5;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: clamp(16px, 4vw, 18px);
    height: clamp(16px, 4vw, 18px);
  }

  @media (max-width: 640px) {
    padding: 0.75rem 1rem;
    font-size: 13px;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: clamp(1rem, 4vw, 2rem);
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

export const ModalContent = styled.div`
  background: ${({ theme }: { theme: AppTheme }) => theme.body};
  border-radius: clamp(8px, 3vw, 12px);
  width: 100%;
  max-width: clamp(300px, 90vw, 500px);
  max-height: clamp(60vh, 85vh, 90vh);
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  box-shadow: 0 clamp(10px, 5vw, 20px) clamp(30px, 8vw, 60px) rgba(0, 0, 0, 0.15);
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 640px) {
    border-radius: 12px;
  }
`;

export const ModalHeader = styled.div`
  padding: clamp(1rem, 3vw, 1.25rem);
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  background: ${({ theme }: { theme: AppTheme }) => theme.headerBg};

  h2 {
    margin: 0;
    font-size: clamp(16px, 5vw, 18px);
    font-weight: 700;
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: clamp(0.25rem, 1vw, 0.5rem);
    display: flex;
    align-items: center;
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    border-radius: 6px;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
      color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
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

  @media (max-width: 640px) {
    padding: 1rem;

    h2 {
      font-size: 16px;
    }
  }
`;

export const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: clamp(1rem, 3vw, 1.25rem);
  background: ${({ theme }: { theme: AppTheme }) => theme.body};

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
    padding: 1rem;
  }
`;

export const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  max-height: clamp(200px, 50vh, 400px);
  overflow-y: auto;
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  border-radius: clamp(6px, 2vw, 8px);
  margin-bottom: clamp(1rem, 3vw, 1.25rem);
  background: ${({ theme }: { theme: AppTheme }) => theme.body};

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

export const UserItem = styled.div<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 2vw, 1rem);
  padding: clamp(0.875rem, 2vw, 1rem);
  border-radius: 0;
  cursor: pointer;
  background: ${({ selected, theme }: { selected?: boolean; theme: AppTheme }) =>
    selected ? theme.innerBg : theme.body};
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  transition: all 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  }

  img {
    width: clamp(32px, 8vw, 40px);
    height: clamp(32px, 8vw, 40px);
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
    flex-shrink: 0;
  }

  .user-info {
    flex: 1;
    min-width: 0;

    .name {
      font-weight: 600;
      font-size: clamp(13px, 3vw, 14px);
      color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .username {
      font-size: clamp(11px, 3vw, 12px);
      color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
      margin-top: 2px;
    }
  }

  .checkbox {
    width: clamp(18px, 5vw, 20px);
    height: clamp(18px, 5vw, 20px);
    border-radius: 4px;
    border: 2px solid
      ${({ selected, theme }: { selected?: boolean; theme: AppTheme }) =>
        selected ? theme.accent : theme.cardBorder};
    background: ${({ selected, theme }: { selected?: boolean; theme: AppTheme }) =>
      selected ? theme.accent : "transparent"};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s ease;

    svg {
      color: white;
      width: clamp(10px, 3vw, 12px);
      height: clamp(10px, 3vw, 12px);
    }
  }

  @media (max-width: 640px) {
    padding: 0.875rem;
    gap: 0.75rem;

    .user-info {
      .name {
        font-size: 13px;
      }

      .username {
        font-size: 11px;
      }
    }
  }
`;

export const SelectedUsers = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.5rem, 2vw, 0.75rem);
  margin-bottom: clamp(1rem, 3vw, 1.25rem);
  padding: clamp(0.75rem, 2vw, 1rem);
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  border-radius: clamp(6px, 2vw, 8px);
  min-height: 44px;

  .tag {
    display: flex;
    align-items: center;
    gap: clamp(0.375rem, 1vw, 0.5rem);
    padding: clamp(0.375rem, 1vw, 0.5rem) clamp(0.75rem, 2vw, 1rem);
    background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
    border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
    border-radius: 16px;
    font-size: clamp(11px, 3vw, 12px);
    color: ${({ theme }: { theme: AppTheme }) => theme.accent};
    font-weight: 500;

    button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      color: ${({ theme }: { theme: AppTheme }) => theme.accent};
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 0.8;
      }

      svg {
        width: clamp(12px, 3vw, 14px);
        height: clamp(12px, 3vw, 14px);
      }
    }
  }

  @media (max-width: 640px) {
    padding: 0.75rem;
    gap: 0.5rem;
  }
`;

export const ModalFooter = styled.div`
  padding: clamp(1rem, 3vw, 1.25rem);
  border-top: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  display: flex;
  gap: clamp(0.75rem, 2vw, 1rem);
  justify-content: flex-end;
  flex-shrink: 0;
  background: ${({ theme }: { theme: AppTheme }) => theme.headerBg};

  button {
    padding: clamp(0.75rem, 2vw, 0.875rem) clamp(1rem, 3vw, 1.25rem);
    border-radius: clamp(6px, 2vw, 8px);
    font-size: clamp(13px, 3vw, 14px);
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.2s ease;
    min-height: 44px;

    &.cancel {
      background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
      color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
      border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};

      &:hover:not(:disabled) {
        background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
        border-color: ${({ theme }: { theme: AppTheme }) => theme.divider};
      }

      &:active:not(:disabled) {
        transform: scale(0.98);
      }
    }

    &.create {
      background: ${({ theme }: { theme: AppTheme }) => theme.accent};
      color: white;

      &:hover:not(:disabled) {
        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
      }

      &:active:not(:disabled) {
        transform: scale(0.98);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }

  @media (max-width: 640px) {
    padding: 1rem;
    gap: 0.75rem;
    flex-direction: column-reverse;

    button {
      width: 100%;
      padding: 0.75rem;
    }
  }
`;

export const SearchInput = styled.div`
  position: relative;
  margin-bottom: clamp(1rem, 3vw, 1.25rem);

  input {
    width: 100%;
    padding: clamp(0.625rem, 2vw, 0.75rem) clamp(0.75rem, 2vw, 1rem) clamp(0.625rem, 2vw, 0.75rem) clamp(2rem, 5vw, 2.25rem);
    border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
    border-radius: clamp(6px, 2vw, 8px);
    font-size: clamp(13px, 3vw, 14px);
    outline: none;
    transition: all 0.2s ease;
    background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
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
      background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  svg {
    position: absolute;
    left: clamp(0.75rem, 2vw, 1rem);
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    width: clamp(16px, 4vw, 18px);
    height: clamp(16px, 4vw, 18px);
    pointer-events: none;
  }

  @media (max-width: 640px) {
    margin-bottom: 1rem;
  }
`;

export const UserSelectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  max-height: clamp(150px, 40vh, 300px);
  overflow-y: auto;
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  border-radius: clamp(6px, 2vw, 8px);
  margin-bottom: clamp(1rem, 3vw, 1.25rem);
  background: ${({ theme }: { theme: AppTheme }) => theme.body};

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

export const UserSelectItem = styled.div<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 2vw, 1rem);
  padding: clamp(0.75rem, 2vw, 0.875rem);
  background: ${({ selected, theme }: { selected?: boolean; theme: AppTheme }) =>
    selected ? theme.innerBg : theme.body};
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  cursor: pointer;
  transition: all 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  }

  img {
    width: clamp(28px, 8vw, 32px);
    height: clamp(28px, 8vw, 32px);
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
    flex-shrink: 0;
  }

  .user-info {
    flex: 1;
    min-width: 0;

    .user-name {
      font-weight: 600;
      font-size: clamp(12px, 3vw, 13px);
      color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .user-status {
      font-size: clamp(10px, 2vw, 11px);
      color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
      margin-top: 2px;
    }
  }

  .checkbox {
    width: clamp(18px, 5vw, 20px);
    height: clamp(18px, 5vw, 20px);
    border-radius: 4px;
    border: 2px solid
      ${({ selected, theme }: { selected?: boolean; theme: AppTheme }) =>
        selected ? theme.accent : theme.cardBorder};
    background: ${({ selected, theme }: { selected?: boolean; theme: AppTheme }) =>
      selected ? theme.accent : "transparent"};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s ease;

    svg {
      color: white;
      width: clamp(10px, 3vw, 12px);
      height: clamp(10px, 3vw, 12px);
    }
  }

  @media (max-width: 640px) {
    padding: 0.75rem;
    gap: 0.75rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: clamp(0.75rem, 2vw, 1rem);
  padding-top: clamp(1rem, 3vw, 1.25rem);
  border-top: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};

  button {
    flex: 1;
    padding: clamp(0.75rem, 2vw, 0.875rem) clamp(1rem, 3vw, 1.25rem);
    border-radius: clamp(6px, 2vw, 8px);
    font-size: clamp(13px, 3vw, 14px);
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.2s ease;
    min-height: 44px;

    &.save {
      background: ${({ theme }: { theme: AppTheme }) => theme.accent};
      color: white;

      &:hover:not(:disabled) {
        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
      }

      &:active:not(:disabled) {
        transform: scale(0.98);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    &.secondary {
      background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
      color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
      border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};

      &:hover:not(:disabled) {
        background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
        border-color: ${({ theme }: { theme: AppTheme }) => theme.divider};
      }

      &:active:not(:disabled) {
        transform: scale(0.98);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }

  @media (max-width: 640px) {
    gap: 0.75rem;
    padding-top: 1rem;

    button {
      padding: 0.75rem 1rem;
    }
  }
`;

export const NoUsersMessage = styled.div`
  padding: clamp(1rem, 3vw, 1.5rem);
  text-align: center;
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  font-size: clamp(13px, 3vw, 14px);
  line-height: 1.6;
`;

export const GroupImageContainer = styled.div`
  position: relative;
  width: clamp(80px, 20vw, 120px);
  height: clamp(80px, 20vw, 120px);
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  border-radius: clamp(8px, 2vw, 12px);
  overflow: hidden;
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border: 2px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};

  img {
    width: 100%;
    height: 100%;
    border-radius: clamp(8px, 2vw, 12px);
    object-fit: cover;
    transition: transform 0.2s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  @media (max-width: 640px) {
    width: 100px;
    height: 100px;
    margin-bottom: 1rem;
  }
`;

export const ImageUploadButton = styled.button`
  position: absolute;
  bottom: clamp(-4px, 1vw, 0px);
  right: clamp(-4px, 1vw, 0px);
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  border: 3px solid ${({ theme }: { theme: AppTheme }) => theme.body};
  color: white;
  border-radius: 50%;
  width: clamp(36px, 10vw, 44px);
  height: clamp(36px, 10vw, 44px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
    transform: scale(1.05);
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

  @media (max-width: 640px) {
    width: 40px;
    height: 40px;
  }
`;

export const InputGroup = styled.div`
  margin-bottom: clamp(1rem, 3vw, 1.25rem);

  label {
    display: block;
    font-size: clamp(13px, 3vw, 14px);
    font-weight: 600;
    margin-bottom: clamp(0.5rem, 1vw, 0.75rem);
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};

    span {
      color: #dc2626;
    }
  }

  input {
    width: 100%;
    padding: clamp(0.75rem, 2vw, 0.875rem) clamp(0.75rem, 2vw, 1rem);
    border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
    border-radius: clamp(6px, 2vw, 8px);
    font-size: clamp(13px, 3vw, 14px);
    outline: none;
    transition: all 0.2s ease;
    background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
    box-sizing: border-box;
    font-family: inherit;

    &::placeholder {
      color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
      opacity: 0.7;
    }

    &:focus {
      border-color: ${({ theme }: { theme: AppTheme }) => theme.accent};
      box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.08);
    }

    &:disabled {
      background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  small {
    display: block;
    font-size: clamp(11px, 2vw, 12px);
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    margin-top: clamp(0.25rem, 1vw, 0.5rem);
  }

  @media (max-width: 640px) {
    margin-bottom: 1rem;
  }
`;

export const SaveButton = styled.button`
  width: 100%;
  padding: clamp(0.75rem, 2vw, 0.875rem) clamp(1rem, 3vw, 1.25rem);
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  border: none;
  border-radius: clamp(6px, 2vw, 8px);
  font-size: clamp(13px, 3vw, 14px);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: clamp(1rem, 3vw, 1.25rem);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.5rem, 2vw, 0.75rem);
  min-height: 44px;

  &:hover:not(:disabled) {
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: clamp(14px, 3vw, 16px);
    height: clamp(14px, 3vw, 16px);
  }

  @media (max-width: 640px) {
    padding: 0.75rem 1rem;
    margin-bottom: 1rem;
  }
`;

export const DeleteGroupButton = styled.button`
  width: 100%;
  padding: clamp(0.75rem, 2vw, 0.875rem) clamp(1rem, 3vw, 1.25rem);
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border: none;
  border-radius: clamp(6px, 2vw, 8px);
  font-size: clamp(13px, 3vw, 14px);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.15);
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.5rem, 2vw, 0.75rem);
  min-height: 44px;

  &:hover:not(:disabled) {
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: clamp(14px, 3vw, 16px);
    height: clamp(14px, 3vw, 16px);
  }

  @media (max-width: 640px) {
    padding: 0.75rem 1rem;
  }
`;