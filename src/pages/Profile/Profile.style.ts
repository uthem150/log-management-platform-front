// src/pages/Profile/Profile.style.ts

import { z } from "zod";
import styled from "@emotion/styled";
import { colors } from "../../styles/theme";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const Title = styled.h1`
  color: ${colors.primary};
  margin-bottom: 2rem;
`;

export const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

export const CardTitle = styled.h2`
  color: ${colors.text};
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${colors.lightGray};
  margin-bottom: 2rem;
`;

export const Tab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  background-color: ${props => (props.active ? colors.primary : "transparent")};
  color: ${props => (props.active ? colors.white : colors.text)};
  border: none;
  cursor: pointer;
  font-weight: 500;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => (props.active ? colors.primary : colors.lightGray)};
  }
`;

export const SuccessMessage = styled.p`
  color: ${colors.success};
  background-color: rgba(114, 176, 29, 0.1);
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

export const ErrorMessage = styled.p`
  color: ${colors.error};
  background-color: rgba(247, 37, 133, 0.1);
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().optional()
});

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password must be at least 6 characters"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string()
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  });
