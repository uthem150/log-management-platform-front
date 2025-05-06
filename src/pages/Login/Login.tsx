// src/pages/Login/Login.tsx (React Hook Form 사용 버전)
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { colors } from "../../styles/theme";
import FormInput from "../../components/common/FormInput";
import SubmitButton from "../../components/common/SubmitButton";
import useAuthStore from "../../store/useAuthStore";
import { authApi, LoginRequest } from "../../api/auth";
import GoogleLoginButton from "../../components/auth/GoogleLoginButton";
import GithubLoginButton from "../../components/auth/GithubLoginButton";
import {
  Container,
  ErrorMessage,
  LoginFormData,
  loginSchema,
  SignupLink,
  Title
} from "./Login.style";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      // 실제 API 호출
      const response = await authApi.login(data as LoginRequest);
      login(response.data.user, response.data.token);

      // 로그인 성공 메시지
      alert(t("auth.loginSuccess"));

      // 홈 페이지로 리디렉션
      navigate("/");
    } catch (error) {
      // API 에러 처리
      console.log(error);
      setApiError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Title>{t("common.login")}</Title>

      {apiError && <ErrorMessage>{apiError}</ErrorMessage>}

      {/* 소셜 로그인 버튼 */}
      <GoogleLoginButton />
      {/* <GithubLoginButton /> */}
      {/* 
      <OrDivider>
        <span>OR</span>
      </OrDivider>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="email"
          label={t("auth.email")}
          type="email"
          register={register("email")}
          error={errors.email}
          placeholder="example@email.com"
          autoComplete="email"
        />

        <FormInput
          id="password"
          label={t("auth.password")}
          type="password"
          register={register("password")}
          error={errors.password}
          autoComplete="current-password"
        />

        <ForgotPassword to="/forgot-password">{t("auth.forgotPassword")}</ForgotPassword>

        <SubmitButton text={t("common.login")} loadingText="Logging in..." isLoading={isLoading} />
      </Form> */}

      <SignupLink>
        Don't have an account? <Link to="/signup">{t("common.signup")}</Link>
      </SignupLink>
    </Container>
  );
};

export default Login;
