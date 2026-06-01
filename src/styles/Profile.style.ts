import styled from "styled-components";
import { motion } from "framer-motion";

export const ProfilePageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.textPrimary};
  width: 100%;
  transition: background 0.3s ease;

  @media (max-width: 735px) {
    margin: 0;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

export const ModalContainer = styled.div`
  width: min(90%, 420px);
  background: ${({ theme }) => theme.cardBg};
  border-radius: 1.25rem;
  padding: 1.875rem;
  border: 1px solid ${({ theme }) => theme.cardBorder};
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.25rem, 5vw, 1.375rem);
  font-weight: 700;
  color: ${({ theme }) => theme.textPrimary};
`;

export const ModalInput = styled.input`
  background: ${({ theme }) => theme.innerBg};
  border: 1px solid ${({ theme }) => theme.divider};
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  color: ${({ theme }) => theme.textPrimary};
  font-size: clamp(0.875rem, 2vw, 0.9rem);
  outline: none;
  transition: 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 10px ${({ theme }) => theme.accent}66;
  }
`;

export const PurpleButton = styled.button`
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  border: 2px solid ${({ theme }) => theme.accent};
  background: transparent;
  color: ${({ theme }) => theme.textPrimary};
  font-weight: 600;
  font-size: clamp(0.75rem, 2vw, 0.9rem);
  cursor: pointer;
  transition: 0.25s ease;

  &:hover {
    background: ${({ theme }) => theme.accent}26;
    box-shadow: 0 0 12px ${({ theme }) => theme.accent}99;
  }
`;

export const CancelButton = styled.button`
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.divider};
  background: transparent;
  color: ${({ theme }) => theme.textPrimary};
  font-size: clamp(0.75rem, 2vw, 0.9rem);
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.divider};
    color: ${({ theme }) => theme.textPrimary};
  }
`;

export const ProfileCard = styled.div`
  position: relative;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 1.5rem;
  padding: 7.5rem 2.5rem 2.5rem 2.5rem;
  margin-top: -6.25rem;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.cardBorder};
  box-shadow: ${({ theme }) =>
    theme.body === "black"
      ? "0 30px 70px rgba(0,0,0,0.7)"
      : "0 10px 40px rgba(0,0,0,0.1)"};
`;

export const AvatarWrapper = styled.div`
  height: clamp(8rem, 15vw, 10rem);
  width: clamp(8rem, 15vw, 10rem);
  border-radius: 50%;
  background: ${({ theme }) => theme.accent};
  padding: 0.25rem;
  margin-top: calc(clamp(8rem, 15vw, 10rem) * -1);
  position: relative;
  z-index: 2;

  @media (max-width: 735px) {
    margin-top: -3.5rem;
  }
`;

export const Username = styled.h1`
  font-size: clamp(1.75rem, 6vw, 2.5rem);
  font-weight: 800;
  margin: 0;
  color: ${({ theme }) => theme.textPrimary};
`;

export const Handle = styled.span`
  color: ${({ theme }) => theme.textSecondary};
  font-size: clamp(0.8rem, 2vw, 0.9375rem);
  font-family: monospace;
`;

export const TabItem = styled.div<{ active?: boolean }>`
  padding: 1rem clamp(0.75rem, 3vw, 1.5rem);
  font-weight: bold;
  font-size: clamp(0.875rem, 2vw, 0.9375rem);
  color: ${(props) =>
    props.active ? props.theme.textPrimary : props.theme.textSecondary};
  position: relative;
  cursor: pointer;

  ${(props) =>
    props.active &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 2.5rem;
      height: 0.25rem;
      background: ${props.theme.accent};
      border-radius: 0.125rem;
    }
  `}
`;

export const StatsRow = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: clamp(2rem, 8vw, 5rem);
  margin: 1.125rem 0;

  span {
    color: ${({ theme }) => theme.textPrimary};
    font-weight: 800;
    font-size: clamp(0.875rem, 2.5vw, 1rem);
  }

  small {
    color: ${({ theme }) => theme.textSecondary};
    font-weight: 500;
    font-size: clamp(0.75rem, 2vw, 0.875rem);
  }

  @media (max-width: 768px) {
    gap: clamp(1rem, 15vw, 3rem);
    justify-content: center;
  }
`;

export const PostGridItem = styled(motion.div)`
  position: relative;
  aspect-ratio: 1/1;
  background: ${({ theme }) => theme.innerBg};
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  
  &:hover .overlay {
    opacity: 1;
  }
`;

export const ActionButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.divider};
  color: ${({ theme }) => theme.textPrimary};
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: clamp(0.75rem, 2vw, 0.875rem);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.divider};
  }
`;

export const CoverSection = styled.div`
  position: relative;
  height: 250px;
  width: 100%;
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.divider};

  @media (max-width: 768px) {
    height: 200px;
  }

  @media (max-width: 480px) {
    height: 150px;
  }
`;

export const TabSection = styled.div`
  margin-top: 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.divider};
  display: flex;
`;

export const EditProfileButton = styled.button`
  padding: clamp(0.5rem, 1vw, 0.625rem) clamp(1rem, 3vw, 1.375rem);
  border-radius: 999px;
  border: 2px solid ${({ theme }) => theme.accent};
  background: transparent;
  color: ${({ theme }) => theme.textPrimary};
  font-weight: 600;
  font-size: clamp(0.75rem, 2vw, 0.875rem);
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: ${({ theme }) => theme.accent}1a;
    box-shadow: 0 0 12px ${({ theme }) => theme.accent}66;
    transform: translateY(-2px);
  }

  @media (max-width: 735px) {
    padding: 0.5rem 1rem;
    font-size: 0.8125rem;
  }
`;

export const FloatingButton = styled.button`
  position: fixed;
  bottom: clamp(3rem, 8vh, 3.125rem);
  right: clamp(2rem, 5vw, 3.125rem);
  width: clamp(3.5rem, 10vw, 4.5rem);
  height: clamp(3.5rem, 10vw, 4.5rem);
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.divider};
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.textPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(2rem, 6vw, 3.125rem);
  font-weight: 300;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.accent};
  }

  @media (max-width: 768px) {
    bottom: clamp(4rem, 10vh, 5rem);
  }
`;

export const ModalButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.625rem;
`;

export const CoverBackground = styled.div`
  position: absolute;
  inset: 0;

  background-image: url("/profileBackground.png");
  background-size: contain;
  background-repeat: repeat;
  background-position: center;

  filter: blur(4px) brightness(0.7);
  transform: scale(1.05);
`;

export const ProfileContent = styled.div`
  max-width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 0 clamp(0.75rem, 5vw, 1rem);
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #2f3336;
`;

export const ProfileInfoSection = styled.div`
  margin-top: 1rem;
  margin-left: clamp(0.5rem, 2vw, 0.625rem);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const MainContent = styled.div`
  max-width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  padding: 0 clamp(1rem, 5vw, 2rem);

  @media (max-width: 768px) {
    padding: 0 clamp(0.75rem, 4vw, 1.5rem);
  }
`;

export const EmptyPostPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #71767b;
  padding: 5px;
  text-align: center;
`;

export const ProfileContainer = styled.div`
  max-width: 935px;
  margin: 0 auto;
  padding: 30px 20px;
`;

export const ProfileHeader = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  gap: clamp(2rem, 8vw, 3.125rem);
  margin-bottom: clamp(2rem, 5vw, 2.75rem);
  padding: 0 clamp(1rem, 5vw, 2rem);

  @media (max-width: 735px) {
    flex-direction: column;
    align-items: center;
    gap: 0;
    padding: 0 clamp(0.75rem, 4vw, 1.5rem);
  }
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const AvatarContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  z-index: 10;
`;

export const ChangePhotoButton = styled.button`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);

  padding: 6px 14px;
  border-radius: 999px;
  border: none;

  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);

  color: #ffffff;
  font-size: 12px;
  font-weight: 500;

  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: translateX(-50%) translateY(-2px);
  }

  &:active {
    transform: translateX(-50%) translateY(1px);
  }
`;

export const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(1rem, 3vw, 1.25rem);
  margin-bottom: 1.25rem;
  
  h2 {
    font-size: clamp(1.5rem, 5vw, 1.75rem);
    font-weight: 300;
  }
`;

export const BioSection = styled.div`
  font-size: clamp(0.8rem, 2vw, 0.875rem);
  line-height: 1.5;
`;

export const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PostOverlay = styled.div.attrs({ className: "overlay" })`
  position: absolute;
  inset: 0;
  color: white;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: 0.2s;
`;

export const EmptyPost = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 10px;
  text-align: center;
`;

export const ProfileCardBackground = styled.div`
  position: absolute;
  inset: 0;

  background-image: url("https://images.unsplash.com/photo-1492724441997-5dc865305da7");
  background-size: cover;
  background-position: center;

  filter: blur(10px) brightness(0.7);
  transform: scale(1.15);

  z-index: 0;
`;

export const ProfileCardOverlay = styled.div`
  position: absolute;
  inset: 0;

  background: linear-gradient(
    to bottom,
    rgba(15, 23, 42, 0.4),
    rgba(15, 23, 42, 0.85)
  );

  z-index: 1;
`;

export const ProfileCardContent = styled.div`
  position: relative;
  z-index: 2;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const TabDivider = styled.div`
  margin-top: 60px;
  border-top: 1px solid ${({ theme }) => theme.divider};
  display: flex;
  justify-content: center;
`;

export const PostsSection = styled.div`
  margin-top: 60px;
`;

export const EmptyState = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.textSecondary};
`;

export const FollowButton = styled.button<{ $isFollowing: boolean }>`
  padding: clamp(0.5rem, 1vw, 0.625rem) clamp(1rem, 3vw, 1.25rem);
  border-radius: 999px;
  font-weight: 600;
  font-size: clamp(0.75rem, 2vw, 0.875rem);
  cursor: pointer;
  transition: all 0.25s ease;

  border: 2px solid ${({ theme }) => theme.accent};

  color: ${({ $isFollowing, theme }) =>
    $isFollowing ? "white" : theme.accent};

  background: ${({ $isFollowing, theme }) =>
    $isFollowing ? theme.accent : "transparent"};

  box-shadow: ${({ $isFollowing, theme }) =>
    $isFollowing ? `0 0 18px ${theme.accent}4d` : "none"};

  &:hover {
    transform: translateY(-2px);

    background: ${({ $isFollowing, theme }) =>
      $isFollowing
        ? theme.accent === "#8b5cf6"
          ? "#7c3aed"
          : theme.accent
        : `${theme.accent}26`};

    color: ${({ $isFollowing, theme }) =>
      $isFollowing ? "white" : theme.accent};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const EditForm = styled.div`
  background: linear-gradient(135deg, #f8f9ff 0%, #e6e9ff 100%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 300px;
  margin: 20px auto 0 auto;
`;

export const StyledInput = styled.input`
  padding: 10px 14px;
  border-radius: 8px;
  background: white;
  border: 1px solid #374151;
  color: white;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #6366f1;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 10px;
`;

export const PasswordSection = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #374151;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PasswordLabel = styled.label`
  color: white;
  font-size: 0.8rem;
  text-align: left;
`;

export const ActionButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 15px;
  flex-wrap: wrap;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 735px) {
    width: 100%;
    justify-content: center;
  }
`;

export const ChangePasswordButton = styled(EditProfileButton)``;

export const HeaderRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  gap: clamp(1rem, 3vw, 2rem);

  @media (max-width: 735px) {
    flex-direction: column;
    margin: 0;
  }
`;

export const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 30px;
  margin-bottom: 60px;
  padding-bottom: 40px;

  @media (max-width: 735px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-bottom: 80px;
    padding-bottom: 30px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 100px;
    padding-bottom: 20px;
  }
`;

export const PostsFooter = styled.div`
  height: 40px;
  width: 100%;
  margin-top: 20px;

  @media (max-width: 735px) {
    height: 20px;
    margin-bottom: 40px;
  }

  @media (max-width: 768px) {
    margin-bottom: 60px;
  }
`;
