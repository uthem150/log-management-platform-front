// components/common/Accordion/Accordion.style.ts

import styled from "@emotion/styled";
import { colors } from "../../../styles/theme";

export const AccordionSection = styled.div<{ noMargin?: boolean }>`
  margin-bottom: ${props => (props.noMargin ? "0" : "1.5rem")};
  border: 1px solid ${colors.lightGray};
  border-radius: 8px;
  overflow: hidden; // 내부의 열고 닫는 콘텐츠가 튀어나오지 않도록 자름
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const AccordionHeader = styled.div<{ isOpen: boolean }>`
  padding: 0.75rem 1rem;
  background-color: ${props => (props.isOpen ? "rgba(67, 97, 238, 0.05)" : "white")};
  color: ${colors.text};
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.2s;
  border-bottom: ${props => (props.isOpen ? `1px solid ${colors.lightGray}` : "none")};

  &:hover {
    background-color: ${props => (props.isOpen ? "rgba(67, 97, 238, 0.1)" : "rgba(0, 0, 0, 0.02)")};
  }
`;

export const AccordionIcon = styled.span<{ isOpen: boolean }>`
  transition: transform 0.3s;

  /* 열려 있으면 rotate(180deg)로 아이콘이 위를 향하게 (▼ → ▲). */
  transform: ${props => (props.isOpen ? "rotate(180deg)" : "rotate(0)")};
  display: flex;
  align-items: center;
  color: ${colors.gray};

  &::before {
    content: "▾";
    font-size: 1rem;
  }
`;

export const AccordionContent = styled.div<{ isOpen: boolean }>`
  padding: ${props => (props.isOpen ? "1rem" : "0")};
  max-height: ${props => (props.isOpen ? "2000px" : "0")};
  overflow: hidden; // 콘텐츠가 튀어나오지 않도록
  transition:
    max-height 0.3s ease-in-out,
    opacity 0.2s ease-in-out,
    padding 0.2s;

  opacity: ${props => (props.isOpen ? "1" : "0")};
`;
