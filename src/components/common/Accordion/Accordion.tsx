// components/common/Accordion/Accordion.tsx

import { useState } from "react";
import {
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionSection
} from "./Accordion.style";

// 아코디언 컴포넌트
interface AccordionProps {
  title: string; // 아코디언 헤더 제목
  children: React.ReactNode; // 아코디언 내부에 표시할 내용
  defaultOpen?: boolean; // 기본으로 열려있을지 여부 (기본값: true)
}

const Accordion: React.FC<AccordionProps> = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <AccordionSection>
      <AccordionHeader isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {title}
        <AccordionIcon isOpen={isOpen} />
      </AccordionHeader>
      <AccordionContent isOpen={isOpen}>{children}</AccordionContent>
    </AccordionSection>
  );
};

export default Accordion;
