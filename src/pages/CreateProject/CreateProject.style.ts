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

  gap: 0.5rem;
  & > :nth-of-type(1) {
    flex: 1;
  }
  & > :nth-of-type(2) {
    flex: 3;
  }
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
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
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

export const FilterCondition = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const FieldSelect = styled.div`
  flex: 3; // 필드 선택 부분
`;

export const OperatorSelect = styled.div`
  flex: 2; // 연산자 선택 부분
`;

export const ValueInput = styled.div`
  flex: 2; // 값 입력 부분
`;

export const ActionButton = styled.div`
  flex: 0.6; // 삭제 버튼 부분
  display: flex;
  justify-content: flex-end;
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

export const Input = styled.input`
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

// 멀티라인 관련 스타일 컴포넌트

export const ExampleBlock = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  border-left: 3px solid ${colors.primary};
`;

export const ExampleTitle = styled.div`
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${colors.text};
`;

export const ExampleContent = styled.div`
  font-family: monospace;
  font-size: 0.85rem;
  background-color: #2d2d2d;
  color: #f8f8f2;
  padding: 0.75rem;
  border-radius: 4px;
  margin: 0.5rem 0;
  white-space: pre-wrap;
`;

export const ExampleLine = styled.div<{ highlight?: boolean; indent?: boolean }>`
  padding: 0.15rem 0;
  ${props =>
    props.highlight &&
    `
    color: #72b01d;
    font-weight: bold;
  `}
  ${props =>
    props.indent &&
    `
    padding-left: 1.5rem;
    color: #cccccc;
  `}
`;

export const ExampleCaption = styled.div`
  font-size: 0.85rem;
  color: ${colors.gray};
  line-height: 1.4;
  margin-top: 0.5rem;
`;

export const HelperText = styled.div`
  font-size: 0.85rem;
  color: ${colors.gray};
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

export const RadioOption = styled.label`
  display: flex;
  align-items: center;
  margin-right: 2rem;
  cursor: pointer;

  span {
    margin-left: 0.5rem;
  }
`;

export const RadioInput = styled.input`
  margin: 0;
  cursor: pointer;
`;

export const DragHandle = styled.div`
  cursor: grab;
  display: inline-flex;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 0.25rem;
  color: ${colors.gray};
  &:hover {
    color: ${colors.text};
  }
`;

export const InfoBox = styled.div`
  background-color: rgba(67, 97, 238, 0.05);
  border-left: 3px solid ${colors.primary};
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
`;

export const InfoTitle = styled.div`
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    color: ${colors.primary};
  }
`;

export const InfoText = styled.p`
  color: ${colors.gray};
  font-size: 0.83rem;
  line-height: 1.5;
  margin: 0;
`;
export const CompactWarningBox = styled.div`
  /* background: ${colors.warningLight}; */
  border: 1px solid ${colors.warningBorder};
  border-radius: 8px;
  margin: 1rem 0;
`;

export const WarningContent = styled.div`
  padding: 0 1rem 1rem 1rem;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
`;

export const WarningText = styled.p`
  color: ${colors.warningText};
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0 0 1rem 0;
`;

export const ExampleRow = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0.75rem 0;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const ExampleItem = styled.div<{ type: "good" | "bad" }>`
  flex: 1;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  background: ${props => (props.type === "good" ? colors.successLight : colors.errorLight)};
  border-left: 3px solid ${props => (props.type === "good" ? colors.success : colors.error)};
`;

export const ExampleLabel = styled.div<{ type: "good" | "bad" }>`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${props => (props.type === "good" ? colors.successText : colors.errorText)};
  margin-bottom: 0.25rem;
`;

export const ExampleCode = styled.code`
  font-family: "SF Mono", "Monaco", "Inconsolata", monospace;
  font-size: 0.8rem;
  color: ${colors.darkGray};
  background: rgba(0, 0, 0, 0.05);
  padding: 0.125rem 0.25rem;
  border-radius: 3px;
`;

export const SolutionText = styled.div`
  background: ${colors.infoLight};
  border-radius: 6px;
  padding: 0.75rem;
  margin-top: 0.75rem;
  border-left: 3px solid ${colors.primary};
`;

export const SolutionTitle = styled.div`
  font-weight: 600;
  color: ${colors.primary};
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
`;

export const SolutionSteps = styled.div`
  font-size: 0.8rem;
  color: ${colors.secondary};
  line-height: 1.4;
`;

export const HighlightCode = styled.code`
  background: ${colors.primary};
  color: ${colors.white};
  padding: 0.125rem 0.375rem;
  border-radius: 3px;
  font-weight: 500;
  font-size: 0.75rem;
`;
