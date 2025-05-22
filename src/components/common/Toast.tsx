// src/components/common/Toast.tsx
import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { colors } from "../../styles/theme";

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const ToastContainer = styled.div<{ visible: boolean }>`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: white;

  /* 외곽 그라데이션 + 내부 흰색 배경을 두 개의 background로 겹침 */
  background-image:
    linear-gradient(white, white), linear-gradient(90deg, ${colors.primary}, ${colors.accent});
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;
  border: 2px solid transparent;
  border-radius: 8px;

  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  z-index: 1000;
  min-width: 400px;
  min-height: 100px;
  animation: ${slideUp} 0.3s ease-out;
  opacity: ${props => (props.visible ? 1 : 0)};
  transform: ${props => (props.visible ? "translateY(0)" : "translateY(100%)")};
  transition:
    opacity 0.3s,
    transform 0.3s;
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${colors.lightGray};
  border-top: 2px solid ${colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.div`
  font-weight: 500;
  color: ${colors.text};
  margin-bottom: 0.25rem;
`;

const Description = styled.div`
  font-size: 0.85rem;
  color: ${colors.gray};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${colors.gray};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;

  &:hover {
    background-color: ${colors.lightGray};
  }
`;

interface ToastProps {
  visible: boolean;
  title: string;
  description: string;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({ visible, title, description, onClose }) => {
  if (!visible) return null;

  return (
    <ToastContainer visible={visible}>
      <Spinner />
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
      {onClose && <CloseButton onClick={onClose}>✕</CloseButton>}
    </ToastContainer>
  );
};

export default Toast;
