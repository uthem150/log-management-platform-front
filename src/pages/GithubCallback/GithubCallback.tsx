// src/pages/GithubCallback/GithubCallback.tsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authApi } from "../../api/auth";
import useAuthStore from "../../store/useAuthStore";
import { Container, Message, Title } from "./GithubCallback.style";

const GithubCallback = () => {
  const location = useLocation(); // 현재 URL 정보를 가져와 GitHub에서 전달된 인증 코드를 추출
  const navigate = useNavigate(); // 인증 성공/실패 후 다른 페이지로 이동하기 위해 사용
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
        const result = await authApi.githubLogin({ code }); // URL에서 쿼리 파라미터 code를 추출(GitHub이 인증 성공 후 제공하는 인증 코드)
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
