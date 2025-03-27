// src/components/common/Button.tsx
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { colors } from "../../styles/theme";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case "primary":
      return css`
        background-color: ${colors.primary};
        color: ${colors.white};
        &:hover {
          background-color: ${colors.secondary};
        }
      `;
    case "secondary":
      return css`
        background-color: ${colors.secondary};
        color: ${colors.white};
        &:hover {
          background-color: ${colors.primary};
        }
      `;
    case "outline":
      return css`
        background-color: transparent;
        color: ${colors.primary};
        border: 1px solid ${colors.primary};
        &:hover {
          background-color: ${colors.lightGray};
        }
      `;
    case "ghost":
      return css`
        background-color: transparent;
        color: ${colors.primary};
        &:hover {
          background-color: ${colors.lightGray};
        }
      `;
    default:
      return "";
  }
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case "sm":
      return css`
        font-size: 0.875rem;
        padding: 0.25rem 0.5rem;
      `;
    case "md":
      return css`
        font-size: 1rem;
        padding: 0.5rem 1rem;
      `;
    case "lg":
      return css`
        font-size: 1.125rem;
        padding: 0.75rem 1.5rem;
      `;
    default:
      return "";
  }
};

const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  ${({ variant = "primary" }) => getVariantStyles(variant)};
  ${({ size = "md" }) => getSizeStyles(size)};
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default Button;
