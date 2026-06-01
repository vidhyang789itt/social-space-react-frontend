import { Link } from "react-router-dom";
import {
  AuthWrapper,
  AuthCard,
  AuthTitle,
  Form,
  InputGroup,
  Input,
  Button,
  RedirectText,
} from "../styles/Auth.style";
import ErrorMessage from "../components/common/ErrorState";
import { useLogin } from "../hooks/useLogin";

export const LoginPage = () => {
  const {
    email,
    password,
    loading,
    error,
    handleChange,
    handleLogin,
    clearAuthError,
  } = useLogin();

  return (
    <AuthWrapper>
      <AuthCard>
        <AuthTitle>Welcome Back 👋</AuthTitle>

        <Form onSubmit={handleLogin}>
          {error && <ErrorMessage message={error} onClose={clearAuthError} />}

          <InputGroup>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>

        <RedirectText>
          Don’t have an account? <Link to="/register">Register</Link>
        </RedirectText>
      </AuthCard>
    </AuthWrapper>
  );
};
