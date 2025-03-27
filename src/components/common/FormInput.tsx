// src/components/common/FormInput.tsx
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import styled from "@emotion/styled";
import { colors } from "../../styles/theme";

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${colors.text};
`;

const Input = styled.input<{ hasError?: boolean }>`
  padding: 0.75rem;
  border: 1px solid ${props => (props.hasError ? colors.error : colors.gray)};
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => (props.hasError ? colors.error : colors.primary)};
    box-shadow: 0 0 0 1px ${props => (props.hasError ? colors.error : colors.primary)};
  }
`;

const ErrorMessage = styled.p`
  color: ${colors.error};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

interface FormInputProps {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}

const FormInput = ({
  id,
  label,
  register,
  error,
  type = "text",
  placeholder,
  autoComplete
}: FormInputProps) => {
  return (
    <FormGroup>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        hasError={!!error}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register}
      />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </FormGroup>
  );
};

export default FormInput;
