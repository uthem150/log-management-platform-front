// src/components/common/Button.tsx
import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { colors } from "../../styles/theme";

// 버튼 타입 정의
type ButtonVariant = "primary" | "secondary" | "success" | "danger" | "warning";
type ButtonSize = "sm" | "md" | "lg";

// 버튼 스타일 설정
const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case "primary":
      return css`
        background-color: ${colors.primary};
        color: white;

        &:hover:not(:disabled) {
          background-color: ${colors.secondary};
        }
      `;
    case "secondary":
      return css`
        background-color: ${colors.lightGray};
        color: ${colors.text};

        &:hover:not(:disabled) {
          background-color: ${colors.gray};
          color: white;
        }
      `;
    case "success":
      return css`
        background-color: ${colors.success};
        color: white;

        &:hover:not(:disabled) {
          background-color: #5a9018;
        }
      `;
    case "danger":
      return css`
        background-color: ${colors.error};
        color: white;

        &:hover:not(:disabled) {
          background-color: #d61d74;
        }
      `;
    case "warning":
      return css`
        background-color: ${colors.warning};
        color: ${colors.text};

        &:hover:not(:disabled) {
          background-color: #e0a701;
        }
      `;
    default:
      return css`
        background-color: ${colors.primary};
        color: white;

        &:hover:not(:disabled) {
          background-color: ${colors.secondary};
        }
      `;
  }
};

// 버튼 크기 설정
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
        font-size: 1.1rem;
      `;
    default:
      return css`
        padding: 0.5rem 1rem;
        font-size: 1rem;
      `;
  }
};

const ButtonElement = styled.button<{
  variant: ButtonVariant;
  size: ButtonSize;
  fullWidth: boolean;
  isLoading: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  gap: 0.5rem;

  /* 버튼 스타일 적용 */
  ${props => getVariantStyles(props.variant)}

  /* 버튼 크기 적용 */
  ${props => getSizeStyles(props.size)}
  
  /* 너비 설정 */
  width: ${props => (props.fullWidth ? "100%" : "auto")};

  /* 비활성화 상태 */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* 로딩 중 상태 */
  ${props =>
    props.isLoading &&
    css`
      position: relative;
      color: transparent;
      pointer-events: none;

      &::after {
        content: "";
        position: absolute;
        width: 1rem;
        height: 1rem;
        border: 2px solid;
        border-radius: 50%;
        border-color: transparent currentColor currentColor currentColor;
        animation: spin 0.8s linear infinite;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `}
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  loadingText,
  icon,
  ...props
}) => {
  return (
    <ButtonElement
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      isLoading={isLoading}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {icon && !isLoading && <span>{icon}</span>}
      {isLoading && loadingText ? loadingText : children}
    </ButtonElement>
  );
};

export default Button;
