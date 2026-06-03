import { Link } from "react-router-dom";
import styled from "styled-components";
import type { AppTheme } from "./theme";

export const LandingContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }: { theme: AppTheme }) => theme.body};
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

export const HeroSection = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 60px 20px;
  position: relative;
  z-index: 1;
`;

export const Title = styled.h1`
  font-size: 64px;
  font-weight: 800;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #8b5cf6, #3b82f6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

export const Subtitle = styled.p`
  font-size: 20px;
  max-width: 600px;
  margin: 0 auto 40px auto;
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const PrimaryButton = styled(Link)`
  padding: 14px 32px;
  border-radius: 30px;
  background: linear-gradient(90deg, #8b5cf6, #7c3aed);
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.6);
  }
`;

export const SecondaryButton = styled(Link)`
  padding: 14px 32px;
  border-radius: 30px;
  background: transparent;
  border: 2px solid ${({ theme }: { theme: AppTheme }) => theme.accent};
  color: ${({ theme }: { theme: AppTheme }) => theme.accent};
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(139, 92, 246, 0.1);
  }
`;

export const FeaturesSection = styled.section`
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  z-index: 1;
`;

export const FeatureCard = styled.div`
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  border-radius: 20px;
  padding: 30px;
  text-align: left;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const FeatureIcon = styled.div`
  font-size: 32px;
  color: ${({ theme }: { theme: AppTheme }) => theme.accent};
  margin-bottom: 20px;
`;

export const FeatureTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 15px;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
`;

export const FeatureDesc = styled.p`
  font-size: 16px;
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  line-height: 1.5;
`;

export const BackgroundBlob = styled.div<{ color: string; size: string; top: string; left: string }>`
  position: absolute;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  background: ${(props) => props.color};
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  z-index: 0;
  pointer-events: none;
`;

export const StatsSection = styled.section`
  padding: 60px 20px;
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  z-index: 1;
`;

export const StatCard = styled.div`
  text-align: center;
  min-width: 150px;
`;

export const StatNumber = styled.h2`
  font-size: 48px;
  font-weight: 800;
  margin: 0 0 10px 0;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const StatLabel = styled.p`
  font-size: 16px;
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
`;

export const CtaSection = styled.section`
  padding: 100px 20px;
  text-align: center;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CtaTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 30px;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
`;