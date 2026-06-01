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
import { useRegister } from "../hooks/useRegister";

export const RegisterPage = () => {
  const {
    username,
    email,
    password,
    loading,
    error,
    handleChange,
    handleRegister,
    clearAuthError,
  } = useRegister();

  return (
    <AuthWrapper>
      <AuthCard>
        <AuthTitle>Create Account ✨</AuthTitle>

        <Form onSubmit={handleRegister}>
          {error && <ErrorMessage message={error} onClose={clearAuthError} />}

          <InputGroup>
            <Input
              name="username"
              placeholder="Enter username"
              value={username}
              onChange={handleChange}
              required
            />
          </InputGroup>

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
              placeholder="Create password"
              value={password}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </Button>
        </Form>

        <RedirectText>
          Already have an account? <Link to="/login">Login</Link>
        </RedirectText>
      </AuthCard>
    </AuthWrapper>
  );
};
