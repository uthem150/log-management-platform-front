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

const slideUpMobile = keyframes`
  from {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const ToastContainer = styled.div<{ visible: boolean }>`
  position: fixed;
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

  opacity: ${props => (props.visible ? 1 : 0)};
  transition:
    opacity 0.3s,
    transform 0.3s;

  /* 데스크톱: 우측 하단 */
  @media (min-width: 769px) {
    bottom: 30px;
    right: 30px;
    min-width: 400px;
    min-height: 100px;
    animation: ${slideUp} 0.3s ease-out;
    transform: ${props => (props.visible ? "translateY(0)" : "translateY(100%)")};
  }

  /* 모바일: 하단 가운데 */
  @media (max-width: 768px) {
    bottom: 20px;
    left: 50%;
    transform: ${props => (props.visible ? "translate(-50%, 0)" : "translate(-50%, 100%)")};
    animation: ${slideUpMobile} 0.3s ease-out;
    width: calc(100% - 2rem);
    max-width: 400px;
    min-height: 80px;
  }

  /* 작은 모바일 화면 */
  @media (max-width: 480px) {
    bottom: 16px;
    width: calc(100% - 1rem);
    padding: 0.875rem 1rem;
    min-height: 70px;
  }
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${colors.lightGray};
  border-top: 2px solid ${colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 18px;
    height: 18px;
  }
`;

const Content = styled.div`
  flex: 1;
  min-width: 0; /* flex item이 줄어들 수 있도록 */
`;

const Title = styled.div`
  font-weight: 500;
  color: ${colors.text};
  margin-bottom: 0.25rem;

  @media (max-width: 480px) {
    font-size: 0.95rem;
    margin-bottom: 0.125rem;
  }
`;

const Description = styled.div`
  font-size: 0.85rem;
  color: ${colors.gray};
  line-height: 1.4;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${colors.gray};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;

  /* 모바일 터치 최적화 */
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background-color: ${colors.lightGray};
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 480px) {
    width: 24px;
    height: 24px;
    font-size: 12px;
    padding: 0.125rem;
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
