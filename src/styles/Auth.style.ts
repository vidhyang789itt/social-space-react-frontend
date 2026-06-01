import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import { lightTheme } from "./theme";

const theme = lightTheme;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
`;

export const AuthWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${theme.body} 0%,
    ${theme.innerBg} 100%
  );
  padding: clamp(1rem, 5vw, 2rem);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: clamp(0.5rem, 3vw, 1rem);
  }
`;

export const AuthCard = styled.div`
  width: 100%;
  max-width: clamp(320px, 90vw, 450px);
  padding: clamp(1.5rem, 5vw, 3rem);
  border-radius: clamp(12px, 3vw, 20px);
  background: ${theme.body};
  border: 1px solid ${theme.cardBorder};
  box-shadow: 0 clamp(10px, 5vw, 25px) clamp(30px, 10vw, 70px) rgba(0, 0, 0, 0.08);
  color: ${theme.textPrimary};
  animation: ${fadeIn} 0.6s ease forwards;

  @media (max-width: 640px) {
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  }
`;

export const AuthTitle = styled.h2`
  text-align: center;
  margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
  font-size: clamp(24px, 6vw, 32px);
  font-weight: 700;
  letter-spacing: -0.5px;
  color: ${theme.textPrimary};
  line-height: 1.2;
`;

export const AuthHeader = styled.div`
  margin-bottom: clamp(1.5rem, 4vw, 2rem);

  h2 {
    font-size: clamp(24px, 6vw, 32px);
    margin-bottom: 0.5rem;
    font-weight: 700;
    color: ${theme.textPrimary};
  }

  p {
    font-size: clamp(13px, 3vw, 15px);
    color: ${theme.textSecondary};
    line-height: 1.4;
  }

  @media (max-width: 640px) {
    margin-bottom: 1.25rem;

    h2 {
      font-size: 24px;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 3vw, 1.5rem);
`;

export const FormSection = styled.div`
  flex: 1;
  background: ${theme.body};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1.5rem, 5vw, 3rem);
  border-left: 1px solid ${theme.cardBorder};

  @media (max-width: 768px) {
    border-left: none;
    border-top: 1px solid ${theme.cardBorder};
    padding: clamp(1rem, 4vw, 2rem);
  }

  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    display: block;
    font-size: clamp(12px, 3vw, 14px);
    color: ${theme.textSecondary};
    font-weight: 500;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: clamp(0.75rem, 2vw, 1rem);
  background: ${theme.cardBg};
  border: 1px solid ${theme.cardBorder};
  border-radius: clamp(8px, 2vw, 12px);
  font-size: clamp(14px, 3vw, 16px);
  color: ${theme.textPrimary};
  transition: all 0.2s ease;
  font-family: inherit;
  box-sizing: border-box;

  &::placeholder {
    color: ${theme.textSecondary};
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    border-color: ${theme.accent};
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.08);
  }

  &:disabled {
    background: ${theme.innerBg};
    cursor: not-allowed;
    opacity: 0.6;
  }

  @media (max-width: 640px) {
    padding: 0.75rem;
    font-size: 16px;
  }
`;

export const Button = styled.button`
  padding: clamp(0.875rem, 2vw, 1rem);
  border-radius: clamp(8px, 2vw, 12px);
  border: none;
  background: linear-gradient(135deg, ${theme.accent} 0%, #7c3aed 100%);
  color: white;
  font-weight: 600;
  font-size: clamp(14px, 3vw, 15px);
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: clamp(0.5rem, 1vw, 0.75rem);
  box-sizing: border-box;
  min-height: 44px;

  &:hover:not(:disabled) {
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    background: ${theme.cardBg};
    color: ${theme.textSecondary};
    cursor: not-allowed;
    opacity: 0.6;
  }

  @media (max-width: 640px) {
    padding: 0.875rem;
    font-size: 14px;
  }
`;

export const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: clamp(1rem, 2vw, 1.5rem);
`;

export const RedirectText = styled.p`
  text-align: center;
  margin-top: clamp(1rem, 3vw, 1.5rem);
  font-size: clamp(12px, 3vw, 14px);
  color: ${theme.textSecondary};
  line-height: 1.5;

  a {
    color: ${theme.accent};
    font-weight: 600;
    text-decoration: none;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }

    &:active {
      opacity: 0.7;
    }
  }

  @media (max-width: 640px) {
    margin-top: 1rem;
  }
`;

export const FooterText = styled(RedirectText)`
  margin-top: clamp(1.5rem, 4vw, 2rem);
`;

export const AuthContainer = styled.div`
  display: flex;
  height: 100vh;
  background: ${theme.body};
  color: ${theme.textPrimary};
  overflow: hidden;

  @media (max-width: 1024px) {
    flex-direction: column;
  }

  @media (max-width: 768px) {
    height: auto;
    min-height: 100vh;
  }
`;

export const HeroSection = styled.div`
  flex: 1.2;
  position: relative;
  background: linear-gradient(135deg, ${theme.innerBg} 0%, ${theme.cardBg} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(2rem, 5vw, 4rem);
  min-height: 50vh;

  @media (max-width: 1024px) {
    flex: 1;
    min-height: 40vh;
    padding: clamp(1.5rem, 4vw, 3rem);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.6) 0%,
    rgba(139, 92, 246, 0.08) 100%
  );
  z-index: 1;
`;

export const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 2;
  max-width: clamp(300px, 90vw, 500px);
  animation: ${slideInRight} 0.6s ease forwards;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 3vw, 1.25rem);
  margin-bottom: clamp(1rem, 3vw, 1.5rem);

  img {
    width: clamp(36px, 8vw, 48px);
    height: clamp(36px, 8vw, 48px);
    border-radius: 50%;
    object-fit: cover;
  }

  h1 {
    font-size: clamp(28px, 7vw, 42px);
    font-weight: 900;
    letter-spacing: -1px;
    color: ${theme.textPrimary};
    line-height: 1.1;
  }

  @media (max-width: 640px) {
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
`;

export const Tagline = styled.p`
  font-size: clamp(16px, 4vw, 24px);
  color: ${theme.accent};
  margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 500;
  line-height: 1.3;

  @media (max-width: 640px) {
    margin-bottom: 1.25rem;
  }
`;

export const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.75rem, 3vw, 1.5rem);
`;

export const FeatureItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: clamp(0.75rem, 2vw, 1rem);
  font-size: clamp(13px, 3vw, 16px);
  color: ${theme.textSecondary};
  line-height: 1.5;
  animation: ${pulse} 2s ease-in-out infinite;

  svg {
    width: clamp(20px, 5vw, 24px);
    height: clamp(20px, 5vw, 24px);
    color: ${theme.accent};
    flex-shrink: 0;
    margin-top: 2px;
  }

  @media (max-width: 640px) {
    gap: 0.75rem;
    font-size: 14px;
  }
`;

export const FloatingCircle = styled.div<{
  size: string;
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
  opacity: string;
  delay?: number;
}>`
  position: absolute;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  bottom: ${(props) => props.bottom};
  right: ${(props) => props.right};
  background: linear-gradient(135deg, ${theme.accent}, #7c3aed);
  filter: blur(60px);
  opacity: ${(props) => props.opacity};
  border-radius: 50%;
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${(props) => props.delay || 0}s;
  pointer-events: none;
  z-index: 0;

  @media (max-width: 1024px) {
    filter: blur(50px);
  }

  @media (max-width: 640px) {
    filter: blur(40px);
  }
`;

export const ErrorMessage = styled.span`
  font-size: clamp(12px, 2vw, 13px);
  color: #dc2626;
  margin-top: 0.5rem;
  display: block;
`;

export const SuccessMessage = styled.span`
  font-size: clamp(12px, 2vw, 13px);
  color: #16a34a;
  margin-top: 0.5rem;
  display: block;
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: clamp(1rem, 3vw, 1.5rem) 0;
  gap: 1rem;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${theme.cardBorder};
  }

  span {
    font-size: clamp(12px, 2vw, 13px);
    color: ${theme.textSecondary};
    white-space: nowrap;
  }

  @media (max-width: 640px) {
    margin: 1rem 0;
  }
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid ${theme.cardBorder};
  border-radius: 50%;
  border-top-color: ${theme.accent};
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;