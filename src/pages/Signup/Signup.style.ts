// src/pages/Signup/Signup.style.ts

import { z } from "zod";
import styled from "@emotion/styled";
import { colors } from "../../styles/theme";

export const Container = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: ${colors.primary};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ErrorMessage = styled.p`
  color: ${colors.error};
  font-size: 0.875rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background-color: rgba(247, 37, 133, 0.1);
  border-radius: 4px;
  text-align: center;
`;

export const SignupLink = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.875rem;

  a {
    color: ${colors.primary};
    font-weight: 500;
  }
`;

export const OrDivider = styled.div`
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
export const signupSchema = z
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

export type SignupFormData = z.infer<typeof signupSchema>;
