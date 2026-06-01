import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  height: auto;
`

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255,255,255,0.1);
  border-top: 4px solid #8b5cf6;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`

export default function Loader() {
  return (
    <LoaderWrapper >
      <Spinner />
    </LoaderWrapper>
  );
}