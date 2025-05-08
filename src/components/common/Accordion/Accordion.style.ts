// components/common/Accordion/Accordion.style.ts

import styled from "@emotion/styled";
import { colors } from "../../../styles/theme";

export const AccordionSection = styled.div`
  margin-bottom: 1.5rem;
  border: 1px solid ${colors.lightGray};
  border-radius: 8px;
  overflow: hidden; // 내부의 열고 닫는 콘텐츠가 튀어나오지 않도록 자름
`;

export const AccordionHeader = styled.div<{ isOpen: boolean }>`
  padding: 1rem;
  background-color: ${props => (props.isOpen ? colors.primary : colors.lightGray)};
  color: ${props => (props.isOpen ? colors.white : colors.text)};
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.2s; // 열릴 때, 색상 전환

  &:hover {
    background-color: ${props => (props.isOpen ? colors.primary : "#e9ecef")};
  }
`;

export const AccordionIcon = styled.span<{ isOpen: boolean }>`
  transition: transform 0.3s;

  /* 열려 있으면 rotate(180deg)로 아이콘이 위를 향하게 (▼ → ▲). */
  transform: ${props => (props.isOpen ? "rotate(180deg)" : "rotate(0)")};
  font-size: 1.2rem;
  display: flex;
  align-items: center;

  // CSS 가상 요소(pseudo-element) 중 하나 - "마치 있는 것처럼" 앞에 콘텐츠 삽입
  &::before {
    content: "▾";
  }
`;

export const AccordionContent = styled.div<{ isOpen: boolean }>`
  padding: ${props => (props.isOpen ? "1rem" : "0")};
  max-height: ${props => (props.isOpen ? "2000px" : "0")};
  overflow: hidden; // 콘텐츠가 튀어나오지 않도록
  transition: all 0.3s;
  opacity: ${props => (props.isOpen ? "1" : "0")};
`;
