import { Link } from "react-router-dom";
import styled from "styled-components";
import type { AppTheme } from "./theme";

export const Wrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }: { theme: AppTheme }) => theme.body};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  text-align: center;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 80px;
  margin: 0;
  font-weight: 700;
  background: linear-gradient(90deg, #8b5cf6, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 60px;
  }

  @media (max-width: 480px) {
    font-size: 48px;
  }
`;

export const Subtitle = styled.p`
  margin-top: 10px;
  font-size: 18px;
  opacity: 0.7;
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const StyledLink = styled(Link)`
  margin-top: 30px;
  padding: 12px 24px;
  border-radius: 14px;
  background: linear-gradient(90deg, #8b5cf6, #7c3aed);
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(139, 92, 246, 0.4);
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;