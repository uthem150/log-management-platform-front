// src/components/auth/GoogleLoginButton.tsx
import { useGoogleLogin } from "@react-oauth/google";
import styled from "@emotion/styled";
import { useState } from "react";
import { authApi } from "../../api/auth";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

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
        console.log("Google login success, access_token:", response.access_token);

        // 1. OAuth 토큰으로 백엔드 인증
        const authResult = await authApi.googleLogin(response.access_token);
        console.log("OAuth response:", authResult.data);

        // 2. 토큰 추출
        const { access: accessToken, refresh: refreshToken } = authResult.data.data;

        console.log("Extracted tokens:", { accessToken, refreshToken });

        if (!accessToken) {
          throw new Error("No access token received from backend");
        }

        // 3. localStorage에 저장
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);

        // 더미 사용자 정보
        const userInfo = {
          id: "unknown",
          email: "user@example.com",
          name: "User"
        };

        // 5. Zustand store에 저장
        login(userInfo, accessToken);

        // 6. 홈페이지로 리디렉션
        navigate("/");
      } catch (err) {
        const error = err as AxiosError;
        console.error("Google login failed:", error);

        if (error.response) {
          console.error("Error status:", error.response.status);
          console.error("Error data:", error.response.data);
        }
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
