import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.textPrimary};
    transition: background 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6, .logo-text {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 700;
    letter-spacing: -0.02em; 
  }

  code, pre {
    font-family: 'JetBrains Mono', monospace;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.body};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.divider};
    border-radius: 10px;
    border: 2px solid ${({ theme }) => theme.body};
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.accent};
  }
`;
