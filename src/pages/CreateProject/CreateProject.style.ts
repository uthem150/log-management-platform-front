// src/pages/CreateProject/CreateProject.style.ts

import styled from "@emotion/styled";
import { colors } from "../../styles/theme";

export const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const Title = styled.h1`
  color: ${colors.text};
  margin-bottom: 1.5rem;
`;

export const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

export const ErrorMessage = styled.p`
  color: ${colors.error};
  font-size: 0.875rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background-color: rgba(247, 37, 133, 0.1);
  border-radius: 4px;
`;

export const StepIndicator = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

export const Step = styled.div<{ active: boolean; completed: boolean }>`
  padding: 0.5rem 1rem;
  background-color: ${props =>
    props.completed ? colors.success : props.active ? colors.primary : colors.lightGray};
  color: ${props => (props.active || props.completed ? colors.white : colors.text)};
  border-radius: 20px;
  margin-right: 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;

  &:last-child {
    margin-right: 0;
  }
`;

export const StepNumber = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${colors.white};
  color: ${colors.primary};
  margin-right: 0.5rem;
  font-weight: bold;
`;

export const LogTypeSelector = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid ${colors.lightGray};
`;

export const LogTypeButton = styled.button<{ selected: boolean }>`
  flex: 1;
  padding: 0.75rem;
  background-color: ${props => (props.selected ? colors.primary : colors.white)};
  color: ${props => (props.selected ? colors.white : colors.text)};
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => (props.selected ? colors.primary : colors.lightGray)};
  }

  &:not(:last-child) {
    border-right: 1px solid ${colors.lightGray};
  }
`;

export const SectionTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${colors.text};
  display: flex;
  align-items: center;
`;

export const SectionSubtitle = styled.p`
  margin-bottom: 1.5rem;
  color: ${colors.gray};
  font-size: 0.9rem;
`;

export const FieldContainer = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid ${colors.lightGray};
  border-radius: 4px;
`;

export const FieldRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const FieldLabel = styled.div`
  width: 150px;
  font-weight: 500;
`;

export const FieldInputContainer = styled.div`
  flex: 1;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${colors.error};
  cursor: pointer;
  margin-left: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const AddFieldButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: 1px dashed ${colors.lightGray};
  color: ${colors.primary};
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgba(67, 97, 238, 0.05);
  }
`;

export const FilterConditionsContainer = styled.div`
  margin-top: 1.5rem;
`;

export const FilterCondition = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid ${colors.lightGray};
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

export const InputGroup = styled.div`
  flex: 1;
  margin: 0 0.5rem;
`;

export const LogSampleContainer = styled.div`
  margin-bottom: 1.5rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 0.75rem;
  border: 1px solid ${colors.lightGray};
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

export const GptAssistButton = styled.button`
  display: flex;
  align-items: center;
  background-color: ${colors.accent};
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-top: 0.5rem;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #3ba3d0;
  }
`;
