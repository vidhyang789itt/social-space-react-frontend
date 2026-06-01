import {
  Wrapper,
  Title,
  Subtitle,
  StyledLink,
} from "../../styles/PageNotFound";

export default function NotFound() {
  return (
    <Wrapper>
      <Title>404</Title>
      <Subtitle>Oops! The page you are looking for does not exist.</Subtitle>
      <StyledLink to="/login">Go to Login</StyledLink>
    </Wrapper>
  );
}
