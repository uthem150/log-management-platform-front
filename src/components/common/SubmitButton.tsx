// src/components/common/SubmitButton.tsx
import styled from "@emotion/styled";
import { colors } from "../../styles/theme";

const Button = styled.button<{ isLoading?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: ${props => (props.isLoading ? colors.gray : colors.primary)};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  font-size: 1rem;
  cursor: ${props => (props.isLoading ? "not-allowed" : "pointer")};
  transition: background-color 0.2s;
  width: 100%;

  &:hover {
    background-color: ${props => (props.isLoading ? colors.gray : colors.secondary)};
  }
`;

interface SubmitButtonProps {
  text: string;
  loadingText?: string;
  isLoading?: boolean;
}

const SubmitButton = ({
  text,
  loadingText = "Loading...",
  isLoading = false
}: SubmitButtonProps) => {
  return (
    <Button type="submit" isLoading={isLoading} disabled={isLoading}>
      {isLoading ? loadingText : text}
    </Button>
  );
};

export default SubmitButton;
