// components/common/Accordion/Accordion.tsx
import { useState } from "react";
import {
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionSection
} from "./Accordion.style";

// 아이콘 타입 정의
type IconType = "info" | "settings" | "fields" | "filter" | "multiline" | "sample" | undefined;

// 아코디언 컴포넌트 속성
interface AccordionProps {
  title: string; // 아코디언 헤더 제목
  children: React.ReactNode; // 아코디언 내부에 표시할 내용
  defaultOpen?: boolean; // 기본으로 열려있을지 여부 (기본값: true)
  icon?: IconType; // 아이콘 타입 (선택 사항)
}

// 간단한 아이콘 컴포넌트 (실제로는 적절한 아이콘 라이브러리 사용 권장)
const getIcon = (type?: IconType) => {
  switch (type) {
    case "info":
      return "ℹ️";
    case "settings":
      return "⚙️";
    case "fields":
      return "📋";
    case "filter":
      return "🔍";
    case "multiline":
      return "📝";
    case "sample":
      return "📊";
    default:
      return null;
  }
};

const Accordion: React.FC<AccordionProps> = ({ title, children, defaultOpen = true, icon }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <AccordionSection>
      <AccordionHeader isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {icon && <span style={{ marginRight: "8px" }}>{getIcon(icon)}</span>}
        {title}
        <AccordionIcon isOpen={isOpen} />
      </AccordionHeader>
      <AccordionContent isOpen={isOpen}>{children}</AccordionContent>
    </AccordionSection>
  );
};

export default Accordion;
