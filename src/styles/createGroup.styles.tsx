import styled from "styled-components";
import type { AppTheme } from "./theme";

export const MembersStepContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 1.5rem;
  height: 100%;
  min-height: 200px;
  overflow: hidden; /* ✅ Prevent parent scroll */

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    min-height: 450px;
  }

  @media (max-width: 768px) {
    min-height: 400px;
    gap: 0.75rem;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    min-height: 350px;
  }
`;

export const UserListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden; /* ✅ Prevent section scroll */
  min-height: 0; /* ✅ Allow flex child to shrink */

  @media (max-width: 1024px) {
    max-height: 400px;
  }

  @media (max-width: 768px) {
    max-height: 350px;
  }

  @media (max-width: 640px) {
    max-height: 300px;
  }
`;

export const SelectedMembersPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  border-radius: 10px;
  padding: 1rem;
  overflow-y: auto; /* ✅ Independent scroll */
  position: sticky;
  top: 0;
  height: 100%; /* ✅ Fill available height */
  min-height: 0; /* ✅ Allow flex child to shrink */

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }: { theme: AppTheme }) => theme.divider};
    border-radius: 2px;

    &:hover {
      background: ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
    }
  }

  @media (max-width: 1024px) {
    height: auto;
    max-height: 200px;
    position: relative;
    top: unset;
    padding: 0.75rem;
    min-height: 0;
  }

  @media (max-width: 768px) {
    max-height: 180px;
    padding: 0.625rem;
  }

  @media (max-width: 640px) {
    max-height: 150px;
    padding: 0.5rem;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  @media (max-width: 768px) {
    padding: 0.75rem;
  }

  @media (max-width: 640px) {
    padding: 0.5rem;
  }
`;

export const ModalContent = styled.div`
  background: ${({ theme }: { theme: AppTheme }) => theme.body};
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideUp 0.3s ease-out;
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 1200px) {
    max-width: 85vw;
    max-height: 92vh;
  }

  @media (max-width: 1024px) {
    max-width: 90vw;
    max-height: 94vh;
  }

  @media (max-width: 768px) {
    max-width: 95vw;
    max-height: 95vh;
    border-radius: 12px;
  }

  @media (max-width: 640px) {
    max-width: 98vw;
    max-height: 97vh;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 8px;
  }
`;

export const ProgressBar = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  background: ${({ theme }: { theme: AppTheme }) => theme.headerBg};
  flex-shrink: 0;

  @media (max-width: 1024px) {
    padding: 1.25rem;
    gap: 0.375rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 0.3rem;
  }

  @media (max-width: 640px) {
    padding: 0.75rem;
    gap: 0.25rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    gap: 0.2rem;
  }
`;

export const ProgressStep = styled.div<{ $active: boolean; $completed: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  cursor: pointer;

  .step-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: ${(props) =>
      props.$active ? "#8b5cf6" : props.$completed ? "#10b981" : "#9ca3af"};
    text-transform: uppercase;
    letter-spacing: 0.5px;

    .number {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 700;
      background: ${(props) =>
        props.$active
          ? "#8b5cf6"
          : props.$completed
            ? "#10b981"
            : "#e5e7eb"};
      color: ${(props) =>
        props.$active || props.$completed ? "white" : "#6b7280"};
      flex-shrink: 0;

      svg {
        width: 14px;
        height: 14px;
      }
    }
  }

  .step-bar {
    height: 3px;
    border-radius: 2px;
    background: ${(props) =>
      props.$active ? "#8b5cf6" : props.$completed ? "#10b981" : "#e5e7eb"};
    transition: all 0.3s ease;
  }

  &:hover .step-indicator {
    color: ${(props) =>
      props.$active ? "#8b5cf6" : props.$completed ? "#10b981" : "#6b7280"};
  }

  @media (max-width: 640px) {
    gap: 0.25rem;

    .step-indicator {
      font-size: 0.65rem;
      gap: 0.3rem;

      .number {
        width: 20px;
        height: 20px;
        font-size: 0.65rem;

        svg {
          width: 12px;
          height: 12px;
        }
      }
    }
  }

  @media (max-width: 480px) {
    gap: 0.2rem;

    .step-indicator {
      font-size: 0.6rem;
      gap: 0.2rem;

      .number {
        width: 18px;
        height: 18px;
        font-size: 0.6rem;
      }
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  flex-shrink: 0;
  background: ${({ theme }: { theme: AppTheme }) => theme.headerBg};

  h2 {
    margin: 0;
    font-size: 1.375rem;
    font-weight: 700;
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    .step-title {
      font-size: 1.375rem;
      color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
    }

    .step-desc {
      font-size: 0.875rem;
      font-weight: 500;
      color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    }
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    transition: all 0.2s;
    flex-shrink: 0;

    &:hover {
      background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
      color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  @media (max-width: 1024px) {
    padding: 1.25rem;

    h2 {
      .step-title {
        font-size: 1.25rem;
      }

      .step-desc {
        font-size: 0.8rem;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;

    h2 {
      font-size: 1.125rem;
      gap: 0.2rem;

      .step-title {
        font-size: 1.125rem;
      }

      .step-desc {
        font-size: 0.75rem;
      }
    }

    button {
      padding: 0.4rem;

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }

  @media (max-width: 640px) {
    padding: 0.75rem;

    h2 {
      font-size: 1rem;

      .step-title {
        font-size: 1rem;
      }

      .step-desc {
        font-size: 0.7rem;
      }
    }

    button {
      padding: 0.3rem;

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 0.5rem;

    h2 {
      font-size: 0.9rem;
      gap: 0.15rem;

      .step-title {
        font-size: 0.9rem;
      }

      .step-desc {
        font-size: 0.65rem;
      }
    }

    button {
      padding: 0.25rem;

      svg {
        width: 14px;
        height: 14px;
      }
    }
  }
`;

export const ModalBody = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow: hidden; /* ✅ No scroll on body */
  min-height: 0; /* ✅ Allow flex children to shrink */
  background: ${({ theme }: { theme: AppTheme }) => theme.body};

  @media (max-width: 1024px) {
    padding: 1.5rem;
    gap: 1.25rem;
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    gap: 1rem;
  }

  @media (max-width: 640px) {
    padding: 1rem;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    gap: 0.5rem;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }: { theme: AppTheme }) => theme.divider};
    border-radius: 3px;

    &:hover {
      background: ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
    }
  }
`;

export const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: fadeIn 0.3s ease-out;
  height: 100%;
  overflow: hidden; /* ✅ Prevent step content scroll */
  min-height: 0; /* ✅ Allow flex children to shrink */

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

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

  @media (max-width: 1024px) {
    gap: 1.25rem;
  }

  @media (max-width: 768px) {
    gap: 1rem;
  }

  @media (max-width: 640px) {
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

export const SelectedCountHeader = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  position: sticky;
  top: 0;
  background: ${({ theme }: { theme: AppTheme }) => theme.body};
  z-index: 10;
  flex-shrink: 0;

  .count {
    background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 12px;
    font-size: 0.7rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding-bottom: 0.375rem;

    .count {
      padding: 0.15rem 0.4rem;
      font-size: 0.65rem;
    }
  }

  @media (max-width: 640px) {
    font-size: 0.75rem;

    .count {
      padding: 0.1rem 0.35rem;
      font-size: 0.6rem;
    }
  }
`;

export const SelectedMemberBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: ${({ theme }: { theme: AppTheme }) => theme.body};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  border-radius: 6px;
  animation: slideIn 0.2s ease-out;
  flex-shrink: 0;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
  }

  .name {
    font-size: 0.8rem;
    font-weight: 500;
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
  }

  .remove-btn {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #ef4444;
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s;

    &:hover {
      background: #dc2626;
      transform: scale(1.1);
    }
  }

  &:hover {
    background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
    border-color: ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  }

  @media (max-width: 768px) {
    padding: 0.375rem;
    gap: 0.375rem;

    img {
      width: 24px;
      height: 24px;
    }

    .name {
      font-size: 0.75rem;
    }

    .remove-btn {
      width: 16px;
      height: 16px;
    }
  }

  @media (max-width: 640px) {
    padding: 0.3rem;
    gap: 0.3rem;

    img {
      width: 22px;
      height: 22px;
    }

    .name {
      font-size: 0.7rem;
    }

    .remove-btn {
      width: 14px;
      height: 14px;
    }
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  label {
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .required {
      color: #ef4444;
    }
  }

  input {
    width: 100%;
    padding: 0.875rem 1rem;
    border: 2px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
    border-radius: 10px;
    font-size: 1rem;
    outline: none;
    transition: all 0.2s;
    font-family: inherit;
    background: ${({ theme }: { theme: AppTheme }) => theme.body};
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};

    &:focus {
      border-color: #8b5cf6;
      box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
    }

    &:disabled {
      background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
      cursor: not-allowed;
      color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    }

    &::placeholder {
      color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    }
  }

  .char-count {
    font-size: 0.75rem;
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    text-align: right;
  }

  @media (max-width: 768px) {
    gap: 0.5rem;

    label {
      font-size: 0.8rem;
    }

    input {
      padding: 0.75rem 0.875rem;
      font-size: 0.95rem;
    }

    .char-count {
      font-size: 0.7rem;
    }
  }

  @media (max-width: 640px) {
    gap: 0.4rem;

    label {
      font-size: 0.75rem;
    }

    input {
      padding: 0.65rem 0.75rem;
      font-size: 0.9rem;
    }

    .char-count {
      font-size: 0.65rem;
    }
  }

  @media (max-width: 480px) {
    gap: 0.3rem;

    label {
      font-size: 0.7rem;
    }

    input {
      padding: 0.6rem 0.65rem;
      font-size: 0.85rem;
    }

    .char-count {
      font-size: 0.6rem;
    }
  }
`;

export const ImageUploadBox = styled.div<{ $isDragActive?: boolean }>`
  border: 2px dashed ${({ $isDragActive, theme }: { $isDragActive?: boolean; theme: AppTheme }) =>
    $isDragActive ? "#8b5cf6" : theme.divider};
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ $isDragActive, theme }: { $isDragActive?: boolean; theme: AppTheme }) =>
    $isDragActive ? "rgba(139, 92, 246, 0.05)" : theme.innerBg};

  &:hover {
    border-color: #8b5cf6;
    background: rgba(139, 92, 246, 0.05);
  }

  input {
    display: none;
  }

  .upload-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};

    svg {
      color: #8b5cf6;
      width: 2.5rem;
      height: 2.5rem;
    }

    .text {
      font-size: 0.875rem;
      font-weight: 500;
    }

    .hint {
      font-size: 0.75rem;
      color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    }
  }

  @media (max-width: 768px) {
    padding: 1.5rem;

    .upload-content {
      gap: 0.5rem;

      svg {
        width: 2rem;
        height: 2rem;
      }

      .text {
        font-size: 0.8rem;
      }

      .hint {
        font-size: 0.7rem;
      }
    }
  }

  @media (max-width: 640px) {
    padding: 1.25rem;

    .upload-content {
      gap: 0.4rem;

      svg {
        width: 1.75rem;
        height: 1.75rem;
      }

      .text {
        font-size: 0.75rem;
      }

      .hint {
        font-size: 0.65rem;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 1rem;

    .upload-content {
      gap: 0.3rem;

      svg {
        width: 1.5rem;
        height: 1.5rem;
      }

      .text {
        font-size: 0.7rem;
      }

      .hint {
        font-size: 0.6rem;
      }
    }
  }
`;

export const ReviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto; /* ✅ Allow review section to scroll internally */
  padding-right: 0.5rem;
  
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }: { theme: AppTheme }) => theme.divider};
    border-radius: 2px;

    &:hover {
      background: ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
    }
  }

  @media (max-width: 768px) {
    gap: 1.25rem;
  }

  @media (max-width: 640px) {
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

export const ReviewCard = styled.div`
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  padding: 1rem;
  border-radius: 10px;
  flex-shrink: 0;
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};

  .label {
    font-size: 0.875rem;
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    margin-bottom: 0.25rem;
  }

  .content {
    font-size: 1.125rem;
    font-weight: 600;
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  }

  &.with-grid {
    .label {
      margin-bottom: 0.75rem;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
      gap: 0.75rem;

      .member {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;

        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid ${({ theme }: { theme: AppTheme }) => theme.accent};
        }

        .member-name {
          font-size: 0.7rem;
          font-weight: 500;
          color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 0.875rem;

    .label {
      font-size: 0.8rem;
      margin-bottom: 0.2rem;
    }

    .content {
      font-size: 1rem;
    }

    &.with-grid {
      .label {
        margin-bottom: 0.6rem;
      }

      .grid {
        grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
        gap: 0.6rem;

        .member img {
          width: 40px;
          height: 40px;
        }

        .member .member-name {
          font-size: 0.65rem;
        }
      }
    }
  }

  @media (max-width: 640px) {
    padding: 0.75rem;

    .label {
      font-size: 0.75rem;
      margin-bottom: 0.15rem;
    }

    .content {
      font-size: 0.95rem;
    }

    &.with-grid {
      .label {
        margin-bottom: 0.5rem;
      }

      .grid {
        grid-template-columns: repeat(auto-fill, minmax(45px, 1fr));
        gap: 0.5rem;

        .member img {
          width: 35px;
          height: 35px;
        }

        .member .member-name {
          font-size: 0.6rem;
        }
      }
    }
  }

  @media (max-width: 480px) {
    padding: 0.6rem;

    .label {
      font-size: 0.7rem;
    }

    .content {
      font-size: 0.9rem;
    }

    &.with-grid {
      .label {
        margin-bottom: 0.4rem;
      }

      .grid {
        grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
        gap: 0.4rem;

        .member img {
          width: 30px;
          height: 30px;
        }

        .member .member-name {
          font-size: 0.55rem;
        }
      }
    }
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 1.5rem;
  border-top: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  flex-shrink: 0;
  background: ${({ theme }: { theme: AppTheme }) => theme.headerBg};

  button {
    flex: 1;
    padding: 0.875rem 1rem;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-family: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &.back {
      background: ${({ theme }: { theme: AppTheme }) => theme.body};
      color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
      border: 2px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};

      &:hover:not(:disabled) {
        background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
        border-color: ${({ theme }: { theme: AppTheme }) => theme.divider};
        transform: translateX(-2px);
      }

      &:active:not(:disabled) {
        transform: translateX(0);
      }
    }

    &.next {
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      color: white;
      box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(139, 92, 246, 0.4);
      }

      &:active:not(:disabled) {
        transform: translateY(0);
      }
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  @media (max-width: 1024px) {
    padding: 1.25rem;
    gap: 0.625rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 0.5rem;

    button {
      padding: 0.75rem 0.875rem;
      font-size: 0.95rem;

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }

  @media (max-width: 640px) {
    padding: 0.75rem;
    gap: 0.4rem;

    button {
      padding: 0.65rem 0.75rem;
      font-size: 0.85rem;

      svg {
        width: 14px;
        height: 14px;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    gap: 0.3rem;

    button {
      padding: 0.55rem 0.6rem;
      font-size: 0.75rem;
      gap: 0.3rem;

      svg {
        width: 12px;
        height: 12px;
      }
    }
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  text-align: center;
  min-height: 200px;

  svg {
    width: 3rem;
    height: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  .title {
    font-weight: 600;
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    margin-bottom: 0.5rem;
  }

  .description {
    font-size: 0.875rem;
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    min-height: 150px;

    svg {
      width: 2.5rem;
      height: 2.5rem;
      margin-bottom: 0.75rem;
    }

    .title {
      font-size: 0.95rem;
      margin-bottom: 0.4rem;
    }

    .description {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 640px) {
    padding: 1.25rem 0.75rem;
    min-height: 120px;

    svg {
      width: 2rem;
      height: 2rem;
      margin-bottom: 0.5rem;
    }

    .title {
      font-size: 0.85rem;
      margin-bottom: 0.3rem;
    }

    .description {
      font-size: 0.75rem;
    }
  }

  @media (max-width: 480px) {
    padding: 1rem 0.5rem;
    min-height: 100px;

    svg {
      width: 1.75rem;
      height: 1.75rem;
      margin-bottom: 0.4rem;
    }

    .title {
      font-size: 0.75rem;
      margin-bottom: 0.2rem;
    }

    .description {
      font-size: 0.65rem;
    }
  }
`;