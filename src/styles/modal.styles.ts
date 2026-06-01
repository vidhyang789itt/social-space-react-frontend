import styled from "styled-components";
import { motion } from "framer-motion";

export const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: ${({ theme }) =>
    theme.body === "black" ? "rgba(0, 0, 0, 0.85)" : "rgba(15, 23, 42, 0.4)"};
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled(motion.div)`
  width: 92%;
  max-width: 820px;
  max-height: 85vh;
  overflow-y: auto;

  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 24px;
  padding: 32px;

  box-shadow: ${({ theme }) =>
    theme.body === "black"
      ? "0 25px 70px rgba(0, 0, 0, 0.8)"
      : "0 20px 50px rgba(0, 0, 0, 0.1)"};

  position: relative;
  transition:
    background 0.3s ease,
    border-color 0.3s ease;

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.divider} transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.divider};
    border-radius: 10px;
    transition: background 0.2s;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.accent};
  }
`;