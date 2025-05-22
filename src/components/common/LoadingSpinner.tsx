// src/components/common/LoadingSpinner.tsx
import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { colors } from "../../styles/theme";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid ${colors.lightGray};
  border-top: 4px solid ${colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  color: ${colors.text};
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const Description = styled.p`
  color: ${colors.gray};
  line-height: 1.5;
  max-width: 400px;
`;

interface LoadingSpinnerProps {
  title: string;
  description: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ title, description }) => {
  return (
    <Container>
      <Spinner />
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Container>
  );
};

export default LoadingSpinner;
