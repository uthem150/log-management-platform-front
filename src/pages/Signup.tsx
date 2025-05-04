// src/pages/Signup.tsx (React Hook Form 사용 버전)
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { colors } from "../styles/theme";
import FormInput from "../components/common/FormInput";
import SubmitButton from "../components/common/SubmitButton";
import useAuthStore from "../store/useAuthStore";
import { authApi, SignupRequest } from "../api/auth";
import GoogleLoginButton from "../components/auth/GoogleLoginButton";
import GithubLoginButton from "../components/auth/GithubLoginButton";

const Container = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: ${colors.primary};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.p`
  color: ${colors.error};
  font-size: 0.875rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background-color: rgba(247, 37, 133, 0.1);
  border-radius: 4px;
  text-align: center;
`;

const SignupLink = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.875rem;

  a {
    color: ${colors.primary};
    font-weight: 500;
  }
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid ${colors.lightGray};
  }

  span {
    margin: 0 10px;
    color: ${colors.gray};
    font-size: 0.875rem;
  }
`;

// Zod 스키마 정의
const signupSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  });

type SignupFormData = z.infer<typeof signupSchema>;

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      // 실제 API 호출
      const { confirmPassword, ...signupData } = data;
      const response = await authApi.signup(signupData as SignupRequest);

      // 회원가입 후 바로 로그인
      login(response.data.user, response.data.token);

      // 회원가입 성공 메시지
      alert(t("auth.signupSuccess"));

      // 홈 페이지로 리디렉션
      navigate("/");
    } catch (error) {
      // API 에러 처리
      console.log(error);
      setApiError("This email is already registered or there was a server error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Title>{t("common.signup")}</Title>

      {apiError && <ErrorMessage>{apiError}</ErrorMessage>}

      {/* 소셜 로그인 버튼 */}
      <GoogleLoginButton />
      {/* <GithubLoginButton /> */}

      {/* <OrDivider>
        <span>OR</span>
      </OrDivider>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="name"
          label="Name"
          register={register("name")}
          error={errors.name}
          placeholder="John Doe"
          autoComplete="name"
        />
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
          autoComplete="new-password"
        />
        <FormInput
          id="confirmPassword"
          label={t("auth.confirmPassword")}
          type="password"
          register={register("confirmPassword")}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />
        <SubmitButton text={t("common.signup")} loadingText="Signing up..." isLoading={isLoading} />
      </Form> */}

      <SignupLink>
        Already have an account? <Link to="/login">{t("common.login")}</Link>
      </SignupLink>
    </Container>
  );
};

export default Signup;
