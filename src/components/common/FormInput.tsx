// src/components/common/FormInput.tsx
import React from "react";
import styled from "@emotion/styled";
import { colors } from "../../styles/theme";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

const Container = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${colors.lightGray};
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.15);
  }

  &::placeholder {
    color: ${colors.gray};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${colors.lightGray};
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.15);
  }

  &::placeholder {
    color: ${colors.gray};
  }
`;

const ErrorText = styled.div`
  color: ${colors.error};
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  placeholder?: string;
  autoComplete?: string;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type = "text",
  register,
  error,
  placeholder,
  autoComplete,
  multiline = false,
  rows = 3,
  disabled = false
}) => {
  return (
    <Container>
      <Label htmlFor={id}>{label}</Label>

      {multiline ? (
        <Textarea id={id} rows={rows} placeholder={placeholder} disabled={disabled} {...register} />
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          {...register}
        />
      )}

      {error && <ErrorText>{error.message}</ErrorText>}
    </Container>
  );
};

export default FormInput;
