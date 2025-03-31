// src/pages/GithubCallback.tsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authApi } from "../api/auth";
import useAuthStore from "../store/useAuthStore";
import styled from "@emotion/styled";
import { colors } from "../styles/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  color: ${colors.primary};
  margin-bottom: 1rem;
`;

const Message = styled.p`
  color: ${colors.text};
  margin-bottom: 2rem;
`;

const GithubCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);

  useEffect(() => {
    const handleGithubCallback = async () => {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get("code");

      if (!code) {
        navigate("/login");
        return;
      }

      try {
        const result = await authApi.githubLogin({ code });
        login(result.data.user, result.data.token);
        navigate("/");
      } catch (error) {
        console.error("GitHub login failed:", error);
        navigate("/login", { state: { error: "GitHub login failed" } });
      }
    };

    handleGithubCallback();
  }, [location, navigate, login]);

  return (
    <Container>
      <Title>GitHub Login</Title>
      <Message>Processing your GitHub login...</Message>
    </Container>
  );
};

export default GithubCallback;
