// src/components/auth/GoogleLoginButton.tsx
import { useGoogleLogin } from "@react-oauth/google";
import styled from "@emotion/styled";
import { useState } from "react";
import { authApi } from "../../api/auth";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: white;
  color: #757575;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 1rem;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const GoogleIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 10px;
`;

const GoogleLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async response => {
      setIsLoading(true);
      try {
        // 백엔드 서버로 액세스 토큰 전송
        const result = await authApi.googleLogin({
          token: response.access_token
        });

        // 사용자 정보와 JWT 토큰 저장
        login(result.data.user, result.data.token);

        // 홈페이지로 리디렉션
        navigate("/");
      } catch (error) {
        console.error("Google login failed:", error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: error => {
      console.error("Google login error:", error);
    }
  });

  return (
    <GoogleButton onClick={() => handleGoogleLogin()} disabled={isLoading}>
      <GoogleIcon
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google logo"
      />
      {isLoading ? "Loading..." : "Continue with Google"}
    </GoogleButton>
  );
};

export default GoogleLoginButton;
