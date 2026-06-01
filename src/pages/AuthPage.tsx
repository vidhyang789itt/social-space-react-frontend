import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import * as S from "../styles/Auth.style";
import { useLogin } from "../hooks/useLogin";
import { useRegister } from "../hooks/useRegister";
import { Globe, ShieldCheck, Users, Zap } from "lucide-react";
import { useToast } from "../components/notifications/toastContext";
import { useEffect } from "react";

interface AuthPageProps {
  mode: "login" | "register";
}

export const AuthPage = ({ mode }: AuthPageProps) => {
  const isLogin = mode === "login";

  const loginState = useLogin();
  const registerState = useRegister();

  const { showToast } = useToast();

  const state = isLogin ? loginState : registerState;

  useEffect(() => {
    if (state.error) {
      showToast(state.error, "error");
    }
  }, [state.error, showToast]);

  return (
    <S.AuthContainer>
      <S.HeroSection>
        <S.HeroOverlay />
        <S.HeroContent
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <S.LogoWrapper>
            <Globe size={40} color="#8b5cf6" />

            <h1>SocialSpace</h1>
          </S.LogoWrapper>

          <S.Tagline>Connect. Share. Explore.</S.Tagline>

          <S.FeatureList>
            <S.FeatureItem
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Zap size={20} /> Instant Global Connections
            </S.FeatureItem>
            <S.FeatureItem
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Users size={20} /> Vibrant Creator Communities
            </S.FeatureItem>
            <S.FeatureItem
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <ShieldCheck size={20} /> Secure & Private Messaging
            </S.FeatureItem>
          </S.FeatureList>

          <S.FloatingCircle size="300px" top="10%" left="-5%" opacity="0.1" />
          <S.FloatingCircle
            size="200px"
            bottom="5%"
            right="10%"
            opacity="0.05"
          />
        </S.HeroContent>
      </S.HeroSection>

      <S.FormSection>
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <S.AuthHeader>
            <h2>{isLogin ? "Welcome Back" : "Join the Space"}</h2>
            <p>
              {isLogin
                ? "Enter your credentials to continue"
                : "Create your account to start exploring"}
            </p>
          </S.AuthHeader>

          <S.Form
            onSubmit={
              isLogin ? loginState.handleLogin : registerState.handleRegister
            }
          >
            {!isLogin && (
              <S.InputGroup>
                <label>Username</label>
                <S.Input
                  name="username"
                  placeholder="johndoe"
                  value={(registerState as any).username}
                  onChange={registerState.handleChange}
                  required
                />
              </S.InputGroup>
            )}

            <S.InputGroup>
              <label>Email Address</label>
              <S.Input
                name="email"
                type="email"
                placeholder="name@example.com"
                value={state.email}
                onChange={state.handleChange}
                required
              />
            </S.InputGroup>

            <S.InputGroup>
              <label>Password</label>
              <S.Input
                name="password"
                type="password"
                placeholder="••••••••"
                value={state.password}
                onChange={state.handleChange}
                required
              />
            </S.InputGroup>

            <S.SubmitButton type="submit" disabled={state.loading}>
              {state.loading
                ? isLogin
                  ? "Signing in..."
                  : "Creating..."
                : isLogin
                  ? "Sign In"
                  : "Get Started"}
            </S.SubmitButton>
          </S.Form>

          <S.FooterText>
            {isLogin ? "New to SocialSpace?" : "Already have an account?"}{" "}
            <Link to={isLogin ? "/register" : "/login"}>
              {isLogin ? "Create account" : "Login here"}
            </Link>
          </S.FooterText>
        </motion.div>
      </S.FormSection>
    </S.AuthContainer>
  );
};